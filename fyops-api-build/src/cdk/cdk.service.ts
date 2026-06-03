import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCdkDto, RedeemCdkDto } from './dto';
import * as crypto from 'crypto';

@Injectable()
export class CdkService {
  constructor(private prisma: PrismaService) {}

  /**
   * 查询CDK列表，只返回当前用户创建的CDK
   */
  async findAll(userId: string) {
    return this.prisma.cdkCode.findMany({
      where: { createdBy: userId },
      include: {
        _count: {
          select: { cdkRedeems: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 创建CDK兑换码
   */
  async create(dto: CreateCdkDto, userId: string) {
    // 生成唯一兑换码
    const code = this.generateCode();

    return this.prisma.cdkCode.create({
      data: {
        code,
        tier: dto.tier,
        durationDays: dto.durationDays,
        maxUses: dto.maxUses || 1,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
        createdBy: userId,
      },
    });
  }

  /**
   * 批量创建CDK兑换码
   */
  async createBatch(dto: CreateCdkDto, count: number, userId: string) {
    const codes: string[] = [];
    const data = [];

    for (let i = 0; i < count; i++) {
      const code = this.generateCode();
      codes.push(code);
      data.push({
        code,
        tier: dto.tier,
        durationDays: dto.durationDays,
        maxUses: dto.maxUses || 1,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
        createdBy: userId,
      });
    }

    await this.prisma.cdkCode.createMany({ data });

    return { codes, count };
  }

  /**
   * 兑换CDK
   */
  async redeem(dto: RedeemCdkDto) {
    // 查找CDK码
    const cdk = await this.prisma.cdkCode.findUnique({
      where: { code: dto.code },
    });

    if (!cdk) {
      throw new NotFoundException('兑换码不存在');
    }

    // 检查是否过期
    if (cdk.expiresAt && new Date() > cdk.expiresAt) {
      throw new BadRequestException('兑换码已过期');
    }

    // 检查使用次数
    if (cdk.usedCount >= cdk.maxUses) {
      throw new BadRequestException('兑换码已达最大使用次数');
    }

    // 查找或创建玩家
    let player = await this.prisma.player.findUnique({
      where: { steamId: dto.steamId },
    });

    if (!player) {
      player = await this.prisma.player.create({
        data: { steamId: dto.steamId },
      });
    }

    // 检查是否已兑换过同一CDK
    const existingRedeem = await this.prisma.cdkRedeem.findFirst({
      where: {
        cdkId: cdk.id,
        playerId: player.id,
      },
    });

    if (existingRedeem) {
      throw new BadRequestException('您已兑换过此兑换码');
    }

    // 如果指定了服务器，创建VIP记录
    if (dto.serverId) {
      const server = await this.prisma.server.findUnique({
        where: { id: dto.serverId },
      });

      if (!server) {
        throw new NotFoundException('服务器不存在');
      }

      // 计算VIP到期时间
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + cdk.durationDays);

      // 创建或更新VIP记录
      const existingVip = await this.prisma.vipMember.findFirst({
        where: {
          playerId: player.id,
          serverId: dto.serverId,
        },
      });

      if (existingVip) {
        // 如果已有VIP，延长到期时间
        const currentExpiry = new Date(existingVip.expiresAt);
        const newExpiry = currentExpiry > new Date() ? currentExpiry : new Date();
        newExpiry.setDate(newExpiry.getDate() + cdk.durationDays);

        await this.prisma.vipMember.update({
          where: { id: existingVip.id },
          data: { expiresAt: newExpiry, tier: cdk.tier },
        });
      } else {
        await this.prisma.vipMember.create({
          data: {
            playerId: player.id,
            serverId: dto.serverId,
            tier: cdk.tier,
            expiresAt,
          },
        });
      }
    }

    // 使用事务：更新CDK使用次数 + 创建兑换记录
    return this.prisma.$transaction(async (tx) => {
      // 更新CDK使用次数
      await tx.cdkCode.update({
        where: { id: cdk.id },
        data: { usedCount: { increment: 1 } },
      });

      // 创建兑换记录
      const redeem = await tx.cdkRedeem.create({
        data: {
          cdkId: cdk.id,
          playerId: player.id,
          steamId: dto.steamId,
        },
      });

      return {
        success: true,
        tier: cdk.tier,
        durationDays: cdk.durationDays,
        redeemedAt: redeem.redeemedAt,
      };
    });
  }

  /**
   * 删除CDK
   */
  async remove(id: string, userId: string) {
    const cdk = await this.prisma.cdkCode.findFirst({
      where: { id, createdBy: userId },
    });

    if (!cdk) {
      throw new NotFoundException('兑换码不存在');
    }

    return this.prisma.cdkCode.delete({
      where: { id },
    });
  }

  /**
   * 生成随机兑换码
   */
  private generateCode(): string {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
  }
}
