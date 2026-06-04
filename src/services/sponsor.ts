/**
 * 赞助服务
 * 处理赞助订单创建、支付、权益查询
 */

import { api } from './api';

export interface SponsorTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  isPopular?: boolean;
}

export interface SponsorOrder {
  id: string;
  tierName: string;
  amount: number;
  channel: string;
  status: 'paid' | 'pending' | 'refunded';
  paidAt: string;
}

export interface SponsorRanking {
  name: string;
  amount: number;
  tier: string;
  createdAt: string;
}

export const sponsorService = {
  /** 获取赞助档位 */
  getTiers: () => api.get<SponsorTier[]>('/sponsor/tiers'),

  /** 创建赞助订单 */
  createOrder: (tierId: string, channel: string) =>
    api.post<{ orderId: string; payUrl: string }>('/sponsor/orders', { tierId, channel }),

  /** 查询订单状态 */
  getOrder: (orderId: string) => api.get<SponsorOrder>(`/sponsor/orders/${orderId}`),

  /** 获取赞助排行榜 */
  getRankings: () => api.get<SponsorRanking[]>('/sponsor/rankings'),

  /** 获取我的赞助记录 */
  getMyOrders: () => api.get<SponsorOrder[]>('/sponsor/my-orders'),
};
