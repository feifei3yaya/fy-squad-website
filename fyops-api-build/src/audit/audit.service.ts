import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  /**
   * 查询审计日志，支持按用户、服务器、操作类型筛选
   */
  async findAll(userId: string, filters?: { userId?: string; serverId?: string; action?: string }) {
    const where: any = {
      // 只返回当前用户相关的审计日志
      OR: [
        { userId },
        { server: { ownerId: userId } },
      ],
    };

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    if (filters?.serverId) {
      where.serverId = filters.serverId;
    }

    if (filters?.action) {
      where.action = { contains: filters.action, mode: 'insensitive' };
    }

    return this.prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: { id: true, username: true },
        },
        server: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  /**
   * 创建审计日志
   */
  async create(data: {
    userId?: string;
    serverId?: string;
    action: string;
    targetType?: string;
    targetId?: string;
    details?: any;
    ipAddress?: string;
  }) {
    return this.prisma.auditLog.create({
      data,
    });
  }
}
