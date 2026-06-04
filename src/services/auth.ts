/**
 * 用户认证与加入申请服务
 */

import { api } from './api';

export interface LoginRequest {
  account: string;
  password: string;
}

export interface RegisterRequest {
  account: string;
  password: string;
  nickname: string;
}

export interface UserInfo {
  id: string;
  nickname: string;
  account: string;
  avatar?: string;
  role: string;
  steamId?: string;
  createdAt: string;
}

export interface JoinApplication {
  id: string;
  name: string;
  age: number;
  steamId: string;
  hours: number;
  role: string;
  experience: string;
  contact: string;
  status: 'pending' | 'interviewing' | 'approved' | 'rejected';
  createdAt: string;
}

export const authService = {
  /** 登录 */
  login: (data: LoginRequest) =>
    api.post<{ token: string; user: UserInfo }>('/auth/login', data),

  /** 注册 */
  register: (data: RegisterRequest) =>
    api.post<{ token: string; user: UserInfo }>('/auth/register', data),

  /** 获取当前用户信息 */
  getProfile: () => api.get<UserInfo>('/auth/profile'),

  /** 提交加入申请 */
  submitJoin: (data: Omit<JoinApplication, 'id' | 'status' | 'createdAt'>) =>
    api.post<JoinApplication>('/recruitment/apply', data),

  /** 查询申请进度 */
  getMyApplication: () => api.get<JoinApplication>('/recruitment/my-application'),
};
