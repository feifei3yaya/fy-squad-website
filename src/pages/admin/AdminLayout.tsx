import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserInfo } from '@/services/auth';

/** 从 localStorage 读取用户信息 */
function getStoredUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) as UserInfo : null;
  } catch {
    return null;
  }
}

/** 检查是否有管理员权限 */
function isAdminUser(user: UserInfo | null): boolean {
  if (!user) return false;
  // 允许的角色：admin / super_admin / root
  const adminRoles = ['admin', 'super_admin', 'root'];
  return adminRoles.includes(user.role);
}

/** 加载过渡 */
function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#0c1015] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-fy-amber/30 border-t-fy-amber rounded-full animate-spin" />
        <span className="font-hud text-xs text-fy-steel/50 tracking-widest">验证身份中...</span>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthState('unauthenticated');
      return;
    }

    const user = getStoredUser();
    if (!user || !isAdminUser(user)) {
      // 有 token 但不是管理员 → 检查是不是通过 mock 方式
      setAuthState('unauthenticated');
      return;
    }

    setAuthState('authenticated');
  }, []);

  if (authState === 'loading') {
    return <AuthLoading />;
  }

  if (authState === 'unauthenticated') {
    // 未登录/非管理员 → 重定向到后台模拟登录页
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-[#0c1015] text-fy-silver font-sans selection:bg-fy-amber/20">
        {/* 左侧边栏 */}
        <AdminSidebar />

        {/* 右侧主内容区 */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
          {/* 顶栏 */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-fy-edge/10 bg-fy-panel/80 backdrop-blur-md px-4 sm:px-6">
            <SidebarTrigger className="text-fy-steel hover:text-fy-amber transition-colors" />
            <Separator orientation="vertical" className="h-6 bg-fy-edge/20" />

            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-fy-steel">工作台</span>
                <Badge variant="outline" className="bg-fy-amber/10 text-fy-amber border-fy-amber/20 font-mono text-[10px] tracking-wider rounded-sm">
                  v1.0.0
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-[10px] text-fy-steel/60 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  <span>系统运行正常</span>
                </div>
              </div>
            </div>
          </header>

          {/* 路由子页面注入点 */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            <div className="mx-auto max-w-7xl w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
