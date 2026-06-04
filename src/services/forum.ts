/**
 * 论坛服务
 * 提供帖子列表、发布、评论、互动功能
 */

import { api } from './api';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  isPinned: boolean;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  parentId?: string;
  likes: number;
  createdAt: string;
}

export interface PostListParams {
  page?: number;
  pageSize?: number;
  category?: string;
  sort?: 'latest' | 'hot' | 'trending';
}

export const forumService = {
  /** 获取帖子列表 */
  getPosts: (params?: PostListParams) =>
    api.get<{ list: Post[]; total: number }>('/forum/posts', { retry: 1 }),

  /** 获取帖子详情 */
  getPost: (id: string) => api.get<Post>(`/forum/posts/${id}`),

  /** 发布新帖 */
  createPost: (data: { title: string; content: string; category: string }) =>
    api.post<Post>('/forum/posts', data),

  /** 获取评论列表 */
  getComments: (postId: string) =>
    api.get<Comment[]>(`/forum/posts/${postId}/comments`),

  /** 发表评论 */
  createComment: (postId: string, content: string, parentId?: string) =>
    api.post<Comment>(`/forum/posts/${postId}/comments`, { content, parentId }),

  /** 点赞/取消点赞 */
  toggleLike: (postId: string) =>
    api.post<{ liked: boolean; likes: number }>(`/forum/posts/${postId}/like`),
};
