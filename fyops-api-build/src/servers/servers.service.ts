import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RconService } from '../rcon/rcon.service';
import { CreateServerDto, UpdateServerDto } from './dto';

@Injectable()
export class ServersService {
  constructor(
    private prisma: PrismaService,
    private rcon: RconService,
  ) {}

  async findAll(userId: string) {
    return this.prisma.server.findMany({
      where: { ownerId: userId },
      include: {
        group: true,
        _count: {
          select: {
            bans: { where: { isActive: true } },
            vipMembers: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const server = await this.prisma.server.findFirst({
      where: { id, ownerId: userId },
      include: {
        group: true,
        _count: {
          select: {
            bans: { where: { isActive: true } },
            vipMembers: true,
          },
        },
      },
    });

    if (!server) {
      throw new NotFoundException('服务器不存在');
    }

    return server;
  }

  async create(dto: CreateServerDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { servers: true },
        },
      },
    });

    const maxServers = this.getMaxServersByTier(user.subscriptionTier);
    if (user._count.servers >= maxServers) {
      throw new ForbiddenException(`免费版最多只能添加 ${maxServers} 台服务器，请升级订阅`);
    }

    return this.prisma.server.create({
      data: {
        ...dto,
        ownerId: userId,
        status: 'offline',
      },
    });
  }

  async update(id: string, dto: UpdateServerDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.server.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    this.rcon.disconnect(id).catch(() => {});

    return this.prisma.server.delete({
      where: { id },
    });
  }

  async refreshStatus(id: string, userId: string) {
    const server = await this.findOne(id, userId);

    try {
      if (!this.rcon.isConnected(id)) {
        await this.rcon.connect(id, server.host, server.rconPort, server.rconPassword);
      }

      const info = await this.rcon.getServerInfo(id);
      const players = await this.rcon.getPlayerList(id);

      const updated = await this.prisma.server.update({
        where: { id },
        data: {
          status: 'online',
          currentPlayers: players.length,
          currentMap: info?.MapName || info?.map || server.currentMap,
          currentLayer: info?.LayerName || info?.layer || server.currentLayer,
          gameMode: info?.GameMode || info?.gameMode || server.gameMode,
          lastSeenAt: new Date(),
        },
      });

      return { ...updated, onlinePlayers: players };
    } catch {
      await this.prisma.server.update({
        where: { id },
        data: { status: 'offline' },
      });

      return { ...server, status: 'offline' };
    }
  }

  async getPlayers(id: string, userId: string) {
    const server = await this.findOne(id, userId);

    try {
      if (!this.rcon.isConnected(id)) {
        await this.rcon.connect(id, server.host, server.rconPort, server.rconPassword);
      }

      return this.rcon.getPlayerList(id);
    } catch {
      return [];
    }
  }

  async executeRcon(id: string, command: string, userId: string) {
    const server = await this.findOne(id, userId);

    try {
      if (!this.rcon.isConnected(id)) {
        await this.rcon.connect(id, server.host, server.rconPort, server.rconPassword);
      }

      const result = await this.rcon.execute(id, command);

      await this.prisma.auditLog.create({
        data: {
          userId,
          serverId: id,
          action: 'rcon_command',
          targetType: 'command',
          targetId: id,
          details: JSON.stringify({ command, result: result?.substring(0, 500) }),
        },
      });

      return { command, result, timestamp: new Date().toISOString() };
    } catch (error) {
      return { command, error: error.message, timestamp: new Date().toISOString() };
    }
  }

  private getMaxServersByTier(tier: string): number {
    switch (tier) {
      case 'enterprise':
        return 100;
      case 'pro':
        return 20;
      case 'free':
      default:
        return 3;
    }
  }
}
