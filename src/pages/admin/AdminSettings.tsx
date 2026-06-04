import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield, Users, Settings2, FileText, Key, Bell, Globe, Database,
  Save, Plus, Trash2, Edit3, CheckCircle2, XCircle, Clock, Eye,
} from 'lucide-react';

// 模拟角色数据
const mockRoles = [
  { id: 1, name: '超级管理员', code: 'super_admin', members: 2, permissions: '全部权限', updatedAt: '2026-05-20' },
  { id: 2, name: '社区运营', code: 'community_ops', members: 5, permissions: '百科 / 论坛管理', updatedAt: '2026-06-01' },
  { id: 3, name: '财务专员', code: 'finance', members: 1, permissions: '赞助订单只读', updatedAt: '2026-05-15' },
  { id: 4, name: '人事专员', code: 'hr', members: 2, permissions: '招募处理', updatedAt: '2026-05-28' },
];

// 模拟审计日志
const mockAuditLogs = [
  { id: 'LOG-1023', user: 'SuperAdmin', action: '角色修改', target: '财务专员权限提升', ip: '192.168.1.100', time: '10分钟前' },
  { id: 'LOG-1022', user: 'Admin_Li', action: '百科审核', target: 'WIK-1020 通过审核', ip: '192.168.1.101', time: '25分钟前' },
  { id: 'LOG-1021', user: 'Admin_Wang', action: '用户封禁', target: 'UID:8842 永久封禁', ip: '192.168.1.102', time: '1小时前' },
  { id: 'LOG-1020', user: 'System', action: '备份完成', target: '全量备份 BAK-042', ip: '127.0.0.1', time: '3小时前' },
  { id: 'LOG-1019', user: 'SuperAdmin', action: '系统配置', target: '开启注册验证码', ip: '192.168.1.100', time: '昨天' },
];

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">系统设置</h2>
          <p className="text-sm text-fy-steel/60 mt-1">管理角色权限、安全策略、系统参数与审计日志。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber">
            <Save className="w-4 h-4 mr-2" />
            保存配置
          </Button>
        </div>
      </div>

      <Tabs defaultValue="roles">
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="roles" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber text-xs">
            <Shield className="w-3.5 h-3.5 mr-1.5" />
            角色权限
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber text-xs">
            <Key className="w-3.5 h-3.5 mr-1.5" />
            安全策略
          </TabsTrigger>
          <TabsTrigger value="config" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber text-xs">
            <Settings2 className="w-3.5 h-3.5 mr-1.5" />
            系统参数
          </TabsTrigger>
          <TabsTrigger value="audit" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber text-xs">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            审计日志
          </TabsTrigger>
        </TabsList>

        {/* 角色权限管理 */}
        <TabsContent value="roles">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-lg">角色与权限管理</CardTitle>
                <CardDescription className="text-fy-steel/60">配置 RBAC 角色及对应的菜单/按钮/数据级权限。</CardDescription>
              </div>
              <Button size="sm" className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                新建角色
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                  <TableRow className="border-fy-edge/20 hover:bg-transparent">
                    <TableHead className="text-fy-steel">角色</TableHead>
                    <TableHead className="text-fy-steel">标识码</TableHead>
                    <TableHead className="text-fy-steel">成员数</TableHead>
                    <TableHead className="text-fy-steel">权限范围</TableHead>
                    <TableHead className="text-fy-steel">更新时间</TableHead>
                    <TableHead className="text-right text-fy-steel">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRoles.map((role) => (
                    <TableRow key={role.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-fy-amber/60" />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-fy-steel/60 text-xs">{role.code}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-fy-steel/80 border-fy-edge/30">
                          <Users className="w-3 h-3 mr-1" />
                          {role.members}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-fy-steel/80 text-sm">{role.permissions}</TableCell>
                      <TableCell className="text-fy-steel/60 text-xs">{role.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-7 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10 text-xs">
                            <Edit3 className="w-3 h-3 mr-1" />
                            编辑
                          </Button>
                          {role.code !== 'super_admin' && (
                            <Button variant="ghost" size="sm" className="h-7 text-fy-red-hc hover:text-white hover:bg-fy-red/20 text-xs">
                              <Trash2 className="w-3 h-3 mr-1" />
                              删除
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全策略 */}
        <TabsContent value="security">
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="bg-fy-panel border-fy-edge/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-fy-amber" />
                  登录安全
                </CardTitle>
                <CardDescription className="text-fy-steel/60">多因素认证与登录策略配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">管理员 2FA 强制开启</span>
                    <p className="text-xs text-fy-steel/60">超管及核心角色必须使用二次验证</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">登录失败锁定</span>
                    <p className="text-xs text-fy-steel/60">连续 5 次失败锁定 15 分钟</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">异地登录告警</span>
                    <p className="text-xs text-fy-steel/60">IP 地理位置骤变时发送通知</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-fy-silver">会话超时</span>
                    <p className="text-xs text-fy-steel/60">30 分钟无操作自动登出</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">15 分钟</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-fy-panel border-fy-edge/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-fy-amber" />
                  接口防护与通知
                </CardTitle>
                <CardDescription className="text-fy-steel/60">频率限制、CSRF 与告警通知配置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">全站 API 限流</span>
                    <p className="text-xs text-fy-steel/60">读: 50次/s, 写: 5次/s</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">CSRF 防护</span>
                    <p className="text-xs text-fy-steel/60">跨站请求伪造 Token 校验</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-fy-edge/10">
                  <div>
                    <span className="text-sm text-fy-silver">内容安全审核</span>
                    <p className="text-xs text-fy-steel/60">腾讯云内容安全 API 对接</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已启用</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm text-fy-silver">DDoS 高防</span>
                    <p className="text-xs text-fy-steel/60">腾讯云 Anti-DDoS 基础防护</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-500">已接入</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 系统参数 */}
        <TabsContent value="config">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">全局系统参数</CardTitle>
              <CardDescription className="text-fy-steel/60">网站基础配置、SEO 与第三方服务集成。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">网站标题</Label>
                  <Input defaultValue="肥鸭战队社区官网 — FY Squad" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">SEO 关键词</Label>
                  <Input defaultValue="Squad, 战术小队, 肥鸭战队, 华人战队" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">新用户默认角色</Label>
                  <Input defaultValue="注册用户" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">论坛发帖间隔 (秒)</Label>
                  <Input defaultValue="60" type="number" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">Steam API Key</Label>
                  <Input defaultValue="****************************************" type="password" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-fy-steel text-xs">微信支付商户号</Label>
                  <Input defaultValue="1234567890" className="bg-fy-dark border-fy-edge/30 text-fy-silver text-sm" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-fy-edge/10">
                <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  保存参数
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 审计日志 */}
        <TabsContent value="audit">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-lg">操作审计日志</CardTitle>
                <CardDescription className="text-fy-steel/60">所有后台操作的不可篡改留存记录，满足合规审查要求。</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs">
                  导出日志
                </Button>
                <Button variant="outline" size="sm" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs">
                  <Database className="w-3.5 h-3.5 mr-1" />
                  归档历史
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                  <TableRow className="border-fy-edge/20 hover:bg-transparent">
                    <TableHead className="text-fy-steel">日志 ID</TableHead>
                    <TableHead className="text-fy-steel">操作人</TableHead>
                    <TableHead className="text-fy-steel">操作类型</TableHead>
                    <TableHead className="text-fy-steel">操作对象</TableHead>
                    <TableHead className="text-fy-steel">来源 IP</TableHead>
                    <TableHead className="text-fy-steel">时间</TableHead>
                    <TableHead className="text-right text-fy-steel">详情</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-mono text-fy-steel/80 text-xs">{log.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.user === 'System' ? (
                            <Database className="w-3.5 h-3.5 text-fy-steel/60" />
                          ) : (
                            <Users className="w-3.5 h-3.5 text-fy-steel/60" />
                          )}
                          <span className="text-white text-sm">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-fy-steel/80 border-fy-edge/30 text-xs">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-fy-steel/80 text-sm max-w-[200px] truncate" title={log.target}>
                        {log.target}
                      </TableCell>
                      <TableCell className="font-mono text-fy-steel/60 text-xs">{log.ip}</TableCell>
                      <TableCell className="text-fy-steel/60 text-xs">{log.time}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
