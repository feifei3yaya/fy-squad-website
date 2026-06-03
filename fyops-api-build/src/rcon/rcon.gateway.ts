import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { RconService } from './rcon.service';
import { PrismaService } from '../prisma/prisma.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/rcon',
})
export class RconGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RconGateway.name);
  private serverRooms: Map<string, Set<string>> = new Map();

  constructor(
    private rconService: RconService,
    private prisma: PrismaService,
  ) {}

  async handleConnection(client: AuthenticatedSocket) {
    const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      this.logger.warn(`WebSocket连接拒绝: 无token - ${client.id}`);
      client.disconnect();
      return;
    }

    try {
      const { default: jwt } = await import('jsonwebtoken');
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'fyops-secret-key') as any;
      client.userId = payload.sub;
      client.username = payload.username;
      this.logger.log(`WebSocket连接: ${client.username} (${client.id})`);
    } catch {
      this.logger.warn(`WebSocket连接拒绝: token无效 - ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.serverRooms.forEach((clients, serverId) => {
        clients.delete(client.id);
        if (clients.size === 0) {
          this.serverRooms.delete(serverId);
        }
      });
      this.logger.log(`WebSocket断开: ${client.username} (${client.id})`);
    }
  }

  @SubscribeMessage('join-server')
  async handleJoinServer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { serverId: string },
  ) {
    if (!client.userId) return;

    const server = await this.prisma.server.findFirst({
      where: { id: data.serverId, ownerId: client.userId },
    });

    if (!server) {
      client.emit('error', { message: '服务器不存在或无权限' });
      return;
    }

    const room = `server:${data.serverId}`;
    client.join(room);

    if (!this.serverRooms.has(data.serverId)) {
      this.serverRooms.set(data.serverId, new Set());
    }
    this.serverRooms.get(data.serverId)!.add(client.id);

    client.emit('joined', { serverId: data.serverId });

    try {
      const isConnected = this.rconService.isConnected(data.serverId);
      if (!isConnected) {
        await this.rconService.connect(data.serverId, server.host, server.rconPort, server.rconPassword);
      }

      const info = await this.rconService.getServerInfo(data.serverId);
      const players = await this.rconService.getPlayerList(data.serverId);

      client.emit('server-info', { serverId: data.serverId, info });
      client.emit('player-list', { serverId: data.serverId, players });
    } catch (error) {
      client.emit('error', { message: `连接RCON失败: ${error.message}` });
    }
  }

  @SubscribeMessage('leave-server')
  handleLeaveServer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { serverId: string },
  ) {
    const room = `server:${data.serverId}`;
    client.leave(room);

    const clients = this.serverRooms.get(data.serverId);
    if (clients) {
      clients.delete(client.id);
      if (clients.size === 0) {
        this.serverRooms.delete(data.serverId);
        this.rconService.disconnect(data.serverId).catch(() => {});
      }
    }

    client.emit('left', { serverId: data.serverId });
  }

  @SubscribeMessage('execute-command')
  async handleExecuteCommand(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { serverId: string; command: string },
  ) {
    if (!client.userId) return;

    try {
      const server = await this.prisma.server.findFirst({
        where: { id: data.serverId, ownerId: client.userId },
      });

      if (!server) {
        client.emit('error', { message: '服务器不存在或无权限' });
        return;
      }

      const isConnected = this.rconService.isConnected(data.serverId);
      if (!isConnected) {
        await this.rconService.connect(data.serverId, server.host, server.rconPort, server.rconPassword);
      }

      const result = await this.rconService.execute(data.serverId, data.command);

      client.emit('command-result', {
        serverId: data.serverId,
        command: data.command,
        result,
        timestamp: new Date().toISOString(),
      });

      await this.prisma.auditLog.create({
        data: {
          userId: client.userId,
          serverId: data.serverId,
          action: 'rcon_command',
          targetType: 'command',
          targetId: data.serverId,
          details: JSON.stringify({ command: data.command, result: result?.substring(0, 500) }),
        },
      });
    } catch (error) {
      client.emit('command-error', {
        serverId: data.serverId,
        command: data.command,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  @SubscribeMessage('refresh-status')
  async handleRefreshStatus(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { serverId: string },
  ) {
    if (!client.userId) return;

    try {
      const server = await this.prisma.server.findFirst({
        where: { id: data.serverId, ownerId: client.userId },
      });

      if (!server) return;

      const isConnected = this.rconService.isConnected(data.serverId);
      if (!isConnected) {
        await this.rconService.connect(data.serverId, server.host, server.rconPort, server.rconPassword);
      }

      const info = await this.rconService.getServerInfo(data.serverId);
      const players = await this.rconService.getPlayerList(data.serverId);

      client.emit('server-info', { serverId: data.serverId, info });
      client.emit('player-list', { serverId: data.serverId, players });
    } catch (error) {
      client.emit('error', { message: `刷新状态失败: ${error.message}` });
    }
  }

  broadcastToServer(serverId: string, event: string, data: any) {
    this.server.to(`server:${serverId}`).emit(event, data);
  }
}
