import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVipDto, UpdateVipDto } from './dto';

@Injectable()
export class VipService {
  constructor(private prisma: PrismaService) {}

  /**
   * 查询VIP列表，只返回当前用户拥有的服务器下的VIP
   */
  async findAll(userId: string, serverId?: string) {
    const where: any = {
      server: { ownerId: userId },
    };

    if (serverId) {
      where.serverId = serverId;
    }

    return this.prisma.vipMember.findMany({
      where,
      include: {
        player: {
          select: { id: true, username: true, steamId: true },
        },
        server: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 查询单个VIP详情
   */
  async findOne(id: string, userId: string) {
    const vip = await this.prisma.vipMember.findFirst({
      where: { id, server: { ownerId: userId } },
      include: {
        player: true,
        server: true,
      },
    });

    if (!vip) {
      throw new NotFoundException('VIP记录不存在');
    }

    return vip;
  }

  /**
   * 添加VIP成员
   */
  async create(dto: CreateVipDto, userId: string) {
    // 验证服务器属于当前用户
    const server = await this.prisma.server.findFirst({
      where: { id: dto.serverId, ownerId: userId },
    });

    if (!server) {
      throw new NotFoundException('服务器不存在');
    }

    // 验证玩家存在
    const player = await this.prisma.player.findUnique({
      where: { id: dto.playerId },
    });

    if (!player) {
      throw new NotFoundException('玩家不存在');
    }

    // 检查是否已存在该服务器的VIP记录
    const existing = await this.prisma.vipMember.findFirst({
      where: {
        playerId: dto.playerId,
        serverId: dto.serverId,
      },
    });

    if (existing) {
      throw new ConflictException('该玩家在此服务器已有VIP记录');
    }

    return this.prisma.vipMember.create({
      data: {
        playerId: dto.playerId,
        serverId: dto.serverId,
        tier: dto.tier || 'vip',
        expiresAt: new Date(dto.expiresAt),
        createdBy: userId,
      },
    });
  }

  /**
   * 更新VIP信息
   */
  async update(id: string, dto: UpdateVipDto, userId: string) {
    await this.findOne(id, userId);

    const data: any = {};
    if (dto.tier !== undefined) data.tier = dto.tier;
    if (dto.expiresAt !== undefined) data.expiresAt = new Date(dto.expiresAt);

    return this.prisma.vipMember.update({
      where: { id },
      data,
    });
  }

  /**
   * 删除VIP记录
   */
  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.vipMember.delete({
      where: { id },
    });
  }
}
