import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RconService } from '../rcon/rcon.service';

@Injectable()
export class PlayersService {
  constructor(
    private prisma: PrismaService,
    private rcon: RconService,
  ) {}

  async findAll(search: string, serverId: string, userId: string) {
    const where: any = {};

    if (search) {
      where.OR = [
        { username: { contains: search, mode: 'insensitive' } },
        { steamId: { contains: search } },
      ];
    }

    if (serverId) {
      where.playerSessions = {
        some: { serverId },
      };
    }

    return this.prisma.player.findMany({
      where,
      include: {
        _count: {
          select: {
            bans: { where: { isActive: true } },
          },
        },
      },
      orderBy: { lastSeenAt: 'desc' },
      take: 100,
    });
  }

  async findOne(id: string, userId: string) {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        bans: {
          include: { server: true },
          orderBy: { bannedAt: 'desc' },
        },
        playerSessions: {
          include: { server: true },
          orderBy: { joinedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!player) {
      throw new NotFoundException('玩家不存在');
    }

    return player;
  }

  async banPlayer(
    playerId: string,
    body: { reason: string; duration?: string; serverId: string },
    userId: string,
  ) {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new NotFoundException('玩家不存在');
    }

    const server = await this.prisma.server.findFirst({
      where: { id: body.serverId, ownerId: userId },
    });

    if (!server) {
      throw new NotFoundException('服务器不存在');
    }

    // 执行RCON封禁
    const duration = body.duration || '0'; // 0 = 永久
    await this.rcon.banPlayer(server.id, player.steamId, duration, body.reason);

    // 记录到数据库
    return this.prisma.ban.create({
      data: {
        serverId: server.id,
        playerId: player.id,
        steamId: player.steamId,
        eosId: player.eosId,
        username: player.username,
        reason: body.reason,
        bannedBy: userId,
        expiresAt: body.duration ? this.calculateExpiry(body.duration) : null,
      },
    });
  }

  async kickPlayer(
    playerId: string,
    body: { reason: string; serverId: string },
    userId: string,
  ) {
    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new NotFoundException('玩家不存在');
    }

    const server = await this.prisma.server.findFirst({
      where: { id: body.serverId, ownerId: userId },
    });

    if (!server) {
      throw new NotFoundException('服务器不存在');
    }

    // 执行RCON踢出
    await this.rcon.kickPlayer(server.id, player.steamId, body.reason);

    return { success: true };
  }

  private calculateExpiry(duration: string): Date {
    const now = new Date();
    const match = duration.match(/(\d+)([hdwm])/);
    
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 'h':
        now.setHours(now.getHours() + value);
        break;
      case 'd':
        now.setDate(now.getDate() + value);
        break;
      case 'w':
        now.setDate(now.getDate() + value * 7);
        break;
      case 'm':
        now.setMonth(now.getMonth() + value);
        break;
    }

    return now;
  }
}
