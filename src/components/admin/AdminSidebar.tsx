import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Server,
  DollarSign,
  UserPlus,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// 导航菜单配置
const items = [
  { title: '控制台大屏', url: '/admin', icon: LayoutDashboard },
  { title: '百科审核', url: '/admin/wiki', icon: BookOpen },
  { title: '论坛管理', url: '/admin/forum', icon: MessageSquare },
  { title: '服务器监控', url: '/admin/servers', icon: Server },
  { title: '赞助财务', url: '/admin/sponsors', icon: DollarSign },
  { title: '招募处理', url: '/admin/recruitment', icon: UserPlus },
  { title: '系统设置', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-fy-edge/20 bg-fy-panel">
      <SidebarHeader className="border-b border-fy-edge/10 p-4">
        <Link to="/admin" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-fy-amber/20 border border-fy-amber/30 text-fy-amber">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-hud font-bold tracking-widest text-fy-silver text-sm group-hover:text-fy-amber transition-colors">TOC ADMIN</span>
            <span className="text-[10px] text-fy-steel/60">战术指挥中心</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-fy-steel/50">核心业务管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url || (item.url !== '/admin' && location.pathname.startsWith(item.url))}
                    className="hover:bg-fy-amber/10 hover:text-fy-amber data-[active=true]:bg-fy-amber/15 data-[active=true]:text-fy-amber data-[active=true]:font-medium transition-colors"
                  >
                    <Link to={item.url} className="flex items-center gap-2 w-full">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-fy-edge/10 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full focus:outline-none">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-md transition-colors w-full text-left">
              <Avatar className="w-8 h-8 border border-fy-amber/30">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-sm font-medium text-fy-silver truncate">SuperAdmin</span>
                <span className="text-[10px] text-fy-steel/60 truncate">admin@fy-squad.cn</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-fy-panel border-fy-edge/30 text-fy-silver">
            <DropdownMenuItem className="cursor-pointer hover:bg-fy-amber/10 hover:text-fy-amber focus:bg-fy-amber/10 focus:text-fy-amber">
              <Settings className="w-4 h-4 mr-2" />
              <span>个人设置</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-fy-red-hc hover:bg-fy-red/10 focus:bg-fy-red/10 focus:text-fy-red-hc">
              <LogOut className="w-4 h-4 mr-2" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
