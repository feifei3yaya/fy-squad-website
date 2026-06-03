import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        subscriptionTier: true,
        subscriptionExpiresAt: true,
        createdAt: true,
      },
    });
  }

  /**
   * 获取仪表盘统计数据
   */
  async getStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            servers: true,
            serverGroups: true,
          },
        },
      },
    });

    // 服务器总数
    const totalServers = user._count.servers;

    // 在线服务器数
    const onlineServers = await this.prisma.server.count({
      where: { ownerId: userId, status: 'online' },
    });

    // 在线玩家总数
    const onlinePlayers = await this.prisma.server.aggregate({
      where: { ownerId: userId, status: 'online' },
      _sum: { currentPlayers: true },
    });

    // 活跃封禁数
    const activeBans = await this.prisma.ban.count({
      where: {
        server: { ownerId: userId },
        isActive: true,
      },
    });

    // VIP成员总数
    const totalVipMembers = await this.prisma.vipMember.count({
      where: {
        server: { ownerId: userId },
      },
    });

    // 活跃VIP成员数（未过期）
    const activeVipMembers = await this.prisma.vipMember.count({
      where: {
        server: { ownerId: userId },
        expiresAt: { gt: new Date() },
      },
    });

    // 服务器分组数
    const totalGroups = user._count.serverGroups;

    return {
      servers: totalServers,
      onlineServers,
      onlinePlayers: onlinePlayers._sum.currentPlayers || 0,
      activeBans,
      totalVipMembers,
      activeVipMembers,
      serverGroups: totalGroups,
      maxServers: this.getMaxServersByTier(user.subscriptionTier),
      subscriptionTier: user.subscriptionTier,
      subscriptionExpiresAt: user.subscriptionExpiresAt,
    };
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
