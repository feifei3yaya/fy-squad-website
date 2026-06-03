import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';

interface RconConnection {
  socket: net.Socket;
  authenticated: boolean;
  queue: Map<number, { resolve: Function; reject: Function }>;
  packetId: number;
}

@Injectable()
export class RconService {
  private readonly logger = new Logger(RconService.name);
  private connections: Map<string, RconConnection> = new Map();

  async connect(serverId: string, host: string, port: number, password: string): Promise<boolean> {
    try {
      if (this.connections.has(serverId)) {
        await this.disconnect(serverId);
      }

      const socket = new net.Socket();
      const conn: RconConnection = {
        socket,
        authenticated: false,
        queue: new Map(),
        packetId: 0,
      };

      await new Promise<void>((resolve, reject) => {
        socket.connect(port, host, () => {
          this.logger.log(`RCON连接到 ${host}:${port}`);
          resolve();
        });

        socket.on('error', (err) => {
          this.logger.error(`RCON连接错误: ${err.message}`);
          reject(err);
        });

        socket.on('close', () => {
          this.logger.log(`RCON连接关闭: ${serverId}`);
          this.connections.delete(serverId);
        });

        socket.on('data', (data) => {
          this.handleResponse(serverId, data);
        });
      });

      this.connections.set(serverId, conn);

      // 认证
      await this.sendCommand(serverId, password, 3); // 3 = SERVERDATA_AUTH
      conn.authenticated = true;

      return true;
    } catch (error) {
      this.logger.error(`RCON连接失败: ${error.message}`);
      return false;
    }
  }

  isConnected(serverId: string): boolean {
    const conn = this.connections.get(serverId);
    return !!conn && conn.authenticated;
  }

  async disconnect(serverId: string): Promise<void> {
    const conn = this.connections.get(serverId);
    if (conn) {
      conn.socket.destroy();
      this.connections.delete(serverId);
    }
  }

  async execute(serverId: string, command: string): Promise<string> {
    const conn = this.connections.get(serverId);
    if (!conn || !conn.authenticated) {
      throw new Error('RCON未连接或未认证');
    }

    return this.sendCommand(serverId, command, 2); // 2 = SERVERDATA_EXECCOMMAND
  }

  async getServerInfo(serverId: string): Promise<any> {
    try {
      const response = await this.execute(serverId, 'ShowServerInfo');
      return this.parseServerInfo(response);
    } catch (error) {
      this.logger.error(`获取服务器信息失败: ${error.message}`);
      return null;
    }
  }

  async getPlayerList(serverId: string): Promise<any[]> {
    try {
      const response = await this.execute(serverId, 'ListPlayers');
      return this.parsePlayerList(response);
    } catch (error) {
      this.logger.error(`获取玩家列表失败: ${error.message}`);
      return [];
    }
  }

  async kickPlayer(serverId: string, steamId: string, reason: string): Promise<boolean> {
    try {
      await this.execute(serverId, `AdminKick ${steamId} ${reason}`);
      return true;
    } catch (error) {
      this.logger.error(`踢出玩家失败: ${error.message}`);
      return false;
    }
  }

  async banPlayer(serverId: string, steamId: string, duration: string, reason: string): Promise<boolean> {
    try {
      await this.execute(serverId, `AdminBan ${steamId} ${duration} ${reason}`);
      return true;
    } catch (error) {
      this.logger.error(`封禁玩家失败: ${error.message}`);
      return false;
    }
  }

  async broadcast(serverId: string, message: string): Promise<boolean> {
    try {
      await this.execute(serverId, `AdminBroadcast ${message}`);
      return true;
    } catch (error) {
      this.logger.error(`广播消息失败: ${error.message}`);
      return false;
    }
  }

  async changeMap(serverId: string, mapName: string): Promise<boolean> {
    try {
      await this.execute(serverId, `AdminChangeMap ${mapName}`);
      return true;
    } catch (error) {
      this.logger.error(`更换地图失败: ${error.message}`);
      return false;
    }
  }

  private sendCommand(serverId: string, command: string, type: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const conn = this.connections.get(serverId);
      if (!conn) {
        reject(new Error('连接不存在'));
        return;
      }

      const id = ++conn.packetId;
      const buffer = this.buildPacket(id, type, command);

      conn.queue.set(id, { resolve, reject });

      conn.socket.write(buffer);

      // 超时处理
      setTimeout(() => {
        if (conn.queue.has(id)) {
          conn.queue.delete(id);
          reject(new Error('RCON命令超时'));
        }
      }, 5000);
    });
  }

  private buildPacket(id: number, type: number, body: string): Buffer {
    const bodyBuffer = Buffer.from(body, 'utf8');
    const size = 10 + bodyBuffer.length;
    const buffer = Buffer.alloc(4 + size);

    buffer.writeInt32LE(size, 0);
    buffer.writeInt32LE(id, 4);
    buffer.writeInt32LE(type, 8);
    bodyBuffer.copy(buffer, 12);
    buffer.writeInt32LE(0, 12 + bodyBuffer.length);

    return buffer;
  }

  private handleResponse(serverId: string, data: Buffer): void {
    const conn = this.connections.get(serverId);
    if (!conn) return;

    // 简化处理，实际应该解析完整的RCON响应
    const id = data.readInt32LE(4);
    const callback = conn.queue.get(id);
    if (callback) {
      const bodyLength = data.readInt32LE(0) - 10;
      const body = data.toString('utf8', 12, 12 + bodyLength);
      callback.resolve(body);
      conn.queue.delete(id);
    }
  }

  private parseServerInfo(response: string): any {
    try {
      // Squad服务器返回的是JSON格式
      return JSON.parse(response);
    } catch {
      return { raw: response };
    }
  }

  private parsePlayerList(response: string): any[] {
    const players: any[] = [];
    const lines = response.split('\n');
    
    for (const line of lines) {
      const match = line.match(/(\d+)\s+\|\s+(\d+)\s+\|\s+(\S+)\s+\|\s+(.+)/);
      if (match) {
        players.push({
          id: parseInt(match[1]),
          steamId: match[3],
          username: match[4].trim(),
        });
      }
    }

    return players;
  }
}
