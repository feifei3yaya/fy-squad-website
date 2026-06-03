import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Type } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;

    if (!userId) {
      throw new ForbiddenException('未登录');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionTier: true, subscriptionExpiresAt: true },
    });

    if (!user) {
      throw new ForbiddenException('用户不存在');
    }

    // 检查订阅是否过期
    if (user.subscriptionExpiresAt && user.subscriptionExpiresAt < new Date()) {
      // 过期后降级为免费版
      await this.prisma.user.update({
        where: { id: userId },
        data: { subscriptionTier: 'free' },
      });
      user.subscriptionTier = 'free';
    }

    // 将订阅信息附加到请求对象
    request.user.subscriptionTier = user.subscriptionTier;

    return true;
  }
}

/**
 * 创建订阅等级守卫类
 */
function createTierGuard(minTier: 'free' | 'pro' | 'enterprise'): Type<CanActivate> {
  @Injectable()
  class TierGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId = request.user?.userId;

      if (!userId) {
        throw new ForbiddenException('未登录');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { subscriptionTier: true, subscriptionExpiresAt: true },
      });

      if (!user) {
        throw new ForbiddenException('用户不存在');
      }

      // 检查订阅是否过期
      if (user.subscriptionExpiresAt && user.subscriptionExpiresAt < new Date()) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { subscriptionTier: 'free' },
        });
        user.subscriptionTier = 'free';
      }

      const tierLevels = { free: 0, pro: 1, enterprise: 2 };
      const userLevel = tierLevels[user.subscriptionTier] ?? 0;
      const requiredLevel = tierLevels[minTier];

      if (userLevel < requiredLevel) {
        throw new ForbiddenException(
          `此功能需要${minTier === 'pro' ? '专业版' : '企业版'}订阅，请升级您的套餐`
        );
      }

      request.user.subscriptionTier = user.subscriptionTier;
      return true;
    }
  }

  return TierGuard;
}

/**
 * 检查用户订阅等级是否满足要求的守卫工厂函数
 */
export function RequireSubscription(minTier: 'free' | 'pro' | 'enterprise') {
  return createTierGuard(minTier);
}
