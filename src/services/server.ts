/**
 * 服务器状态服务
 * 提供游戏服务器实时状态查询与历史数据
 */

import { api } from './api';

export interface ServerNode {
  id: string;
  name: string;
  ip: string;
  port: number;
  location: string;
  status: 'online' | 'offline';
  players: number;
  maxPlayers: number;
  map: string;
  layer: string;
  tps: number;
  cpu: number;
  memory: number;
  uptime: string;
}

export interface ServerStats {
  totalPlayers: number;
  totalCapacity: number;
  avgTps: number;
  nodes: ServerNode[];
}

export const serverService = {
  /** 获取所有服务器实时状态 */
  getNodes: () => api.get<ServerNode[]>('/servers/nodes', { retry: 1 }),

  /** 获取服务器概览统计 */
  getStats: () => api.get<ServerStats>('/servers/stats'),

  /** 获取指定节点详情 */
  getNode: (id: string) => api.get<ServerNode>(`/servers/nodes/${id}`),
};
