/**
 * 百科服务
 * 提供词条检索、版本管理、纠错反馈
 */

import { api } from './api';

export interface WikiEntry {
  id: string;
  title: string;
  category: string;
  content: string;
  summary: string;
  author: string;
  version: number;
  tags: string[];
  relatedEntries: string[];
  updatedAt: string;
}

export interface WikiVersion {
  version: number;
  author: string;
  summary: string;
  createdAt: string;
}

export const wikiService = {
  /** 获取百科词条列表 */
  getEntries: (category?: string) =>
    api.get<WikiEntry[]>('/wiki/entries', { retry: 1 }),

  /** 获取词条详情 */
  getEntry: (id: string) => api.get<WikiEntry>(`/wiki/entries/${id}`),

  /** 搜索词条 */
  searchEntries: (q: string) =>
    api.get<WikiEntry[]>(`/wiki/search?q=${encodeURIComponent(q)}`),

  /** 获取词条版本历史 */
  getVersions: (entryId: string) =>
    api.get<WikiVersion[]>(`/wiki/entries/${entryId}/versions`),

  /** 提交纠错 */
  submitCorrection: (entryId: string, content: string) =>
    api.post(`/wiki/entries/${entryId}/corrections`, { content }),
};
