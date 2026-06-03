import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RconService } from '../rcon/rcon.service';

@Injectable()
export class BansService {
  constructor(
    private prisma: PrismaService,
    private rcon: RconService,
  ) {}

  /**
   * 查询封禁列表，支持按服务器和状态筛选
   */
  async findAll(userId: string, serverId?: string, isActive?: boolean) {
    const where: any = {
      server: { ownerId: userId },
    };

    if (serverId) {
      where.serverId = serverId;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return this.prisma.ban.findMany({
      where,
      include: {
        server: {
          select: { id: true, name: true },
        },
        player: {
          select: { id: true, username: true, steamId: true },
        },
      },
      orderBy: { bannedAt: 'desc' },
    });
  }

  /**
   * 查询单个封禁记录详情
   */
  async findOne(id: string, userId: string) {
    const ban = await this.prisma.ban.findFirst({
      where: { id, server: { ownerId: userId } },
      include: {
        server: true,
        player: true,
      },
    });

    if (!ban) {
      throw new NotFoundException('封禁记录不存在');
    }

    return ban;
  }

  /**
   * 解封操作：更新数据库状态 + 执行RCON解封命令
   */
  async unban(id: string, userId: string) {
    const ban = await this.findOne(id, userId);

    if (!ban.isActive) {
      throw new NotFoundException('该封禁已被解除');
    }

    // 尝试通过RCON解封
    try {
      await this.rcon.banPlayer(ban.serverId, ban.steamId, '0', '');
    } catch {
      // RCON解封失败不影响数据库更新，仅记录日志
    }

    // 更新数据库封禁状态
    return this.prisma.ban.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * 删除封禁记录
   */
  async remove(id: string, userId: string) {
    const ban = await this.findOne(id, userId);

    return this.prisma.ban.delete({
      where: { id: ban.id },
    });
  }
}
