/**
 * 通用数据获取 Hook
 * 支持加载态、错误处理、轮询刷新
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiError } from '../services/api';

interface UseDataOptions {
  /** 轮询间隔（毫秒），设为 0 则只加载一次 */
  pollInterval?: number;
  /** 是否在组件挂载时自动加载 */
  autoFetch?: boolean;
}

interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  options: UseDataOptions = {}
): UseDataResult<T> {
  const { pollInterval = 0, autoFetch = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('数据加载失败');
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!autoFetch) return;
    fetchData();

    if (pollInterval > 0) {
      timerRef.current = setInterval(fetchData, pollInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoFetch, fetchData, pollInterval]);

  return { data, loading, error, refresh: fetchData };
}
