/**
 * 肥鸭战队官网 API 服务层
 * 
 * 统一封装所有后端接口调用，支持：
 * - 请求/响应拦截
 * - JWT 自动注入
 * - 统一错误处理
 * - 请求重试
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.fy-squad.cn/v1';

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  traceId: string;
}

class ApiError extends Error {
  code: number;
  traceId: string;
  constructor(code: number, message: string, traceId: string) {
    super(message);
    this.code = code;
    this.traceId = traceId;
  }
}

function getToken(): string | null {
  return localStorage.getItem('token') || localStorage.getItem('fy_token');
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts?: { retry?: number; timeout?: number }
): Promise<T> {
  const controller = new AbortController();
  const timeout = opts?.timeout ?? 15000;
  const timer = setTimeout(() => controller.abort(), timeout);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const json: ApiResponse<T> = await res.json();

    if (json.code !== 200) {
      throw new ApiError(json.code, json.message || '请求失败', json.traceId);
    }

    return json.data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(408, '请求超时，请检查网络连接', '');
    }
    // 自动重试逻辑
    if (opts?.retry && opts.retry > 0) {
      return request<T>(method, path, body, { ...opts, retry: opts.retry - 1 });
    }
    throw new ApiError(0, '网络异常，无法连接到服务器', '');
  } finally {
    clearTimeout(timer);
  }
}

// ─── 导出方法 ───

export const api = {
  get: <T>(path: string, opts?: { retry?: number }) =>
    request<T>('GET', path, undefined, opts),

  post: <T>(path: string, body?: unknown, opts?: { retry?: number }) =>
    request<T>('POST', path, body, opts),

  put: <T>(path: string, body?: unknown) =>
    request<T>('PUT', path, body),

  delete: <T>(path: string) =>
    request<T>('DELETE', path),
};

export { ApiError };
export type { ApiResponse };
