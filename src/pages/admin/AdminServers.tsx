import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Server, Cpu, HardDrive, Activity, Wifi, Shield, Database, RefreshCw,
  AlertTriangle, CheckCircle2, Clock, Download, Zap, Globe, Users,
} from 'lucide-react';

// 模拟服务器节点数据
const mockNodes = [
  {
    id: 'FY-GAME-01',
    name: '主力游戏服 #1',
    ip: '103.45.67.89:7787',
    location: '上海',
    status: 'online',
    cpu: 62,
    memory: 58,
    players: '48/80',
    tps: 19.2,
    uptime: '14天 6小时',
    ping: 32,
  },
  {
    id: 'FY-GAME-02',
    name: '主力游戏服 #2',
    ip: '103.45.67.90:7787',
    location: '广州',
    status: 'online',
    cpu: 45,
    memory: 42,
    players: '35/80',
    tps: 19.8,
    uptime: '14天 6小时',
    ping: 48,
  },
  {
    id: 'FY-TRAIN-01',
    name: '训练服 (新兵训练)',
    ip: '103.45.67.91:7787',
    location: '上海',
    status: 'online',
    cpu: 28,
    memory: 35,
    players: '12/40',
    tps: 20.0,
    uptime: '7天 3小时',
    ping: 35,
  },
  {
    id: 'FY-MOD-01',
    name: '模组测试服',
    ip: '103.45.67.92:7787',
    location: '上海',
    status: 'offline',
    cpu: 0,
    memory: 0,
    players: '0/40',
    tps: 0,
    uptime: '已停止',
    ping: '-',
  },
];

// 模拟备份记录
const mockBackups = [
  { id: 'BAK-042', type: '全量备份', size: '2.4 GB', createdAt: '今天 03:00', status: 'success', node: '主数据库' },
  { id: 'BAK-041', type: '增量备份', size: '156 MB', createdAt: '今天 07:00', status: 'success', node: '主数据库' },
  { id: 'BAK-040', type: '增量备份', size: '142 MB', createdAt: '今天 11:00', status: 'success', node: '主数据库' },
  { id: 'BAK-039', type: '全量备份', size: '2.3 GB', createdAt: '昨天 03:00', status: 'success', node: '主数据库' },
];

// 安全事件模拟
const mockSecurityEvents = [
  { id: 'SEC-015', type: '入侵检测', level: 'low', description: '来自海外 IP 的异常端口扫描已自动封禁', time: '2小时前' },
  { id: 'SEC-014', type: 'WAF 拦截', level: 'medium', description: 'SQL 注入攻击被 Web 应用防火墙成功拦截', time: '5小时前' },
  { id: 'SEC-013', type: 'DDoS 防护', level: 'high', description: '峰值 8Gbps 的 UDP Flood 攻击已被清洗', time: '2天前' },
];

export function AdminServers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">服务器监控中心</h2>
          <p className="text-sm text-fy-steel/60 mt-1">实时掌控所有游戏服务器状态、资源指标与安全态势。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新状态
          </Button>
          <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold">
            <Server className="w-4 h-4 mr-2" />
            部署新节点
          </Button>
        </div>
      </div>

      {/* 全局 KPI */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">在线节点</CardTitle>
            <Server className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3 / 4</div>
            <p className="text-xs text-fy-steel/60 mt-1">1 个节点已离线</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">总在线玩家</CardTitle>
            <Users className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">95 / 240</div>
            <p className="text-xs text-emerald-500 mt-1">负载率 39.6%</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">平均 TPS</CardTitle>
            <Activity className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">19.7</div>
            <p className="text-xs text-fy-steel/60 mt-1">基准值 20.0</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">安全态势</CardTitle>
            <Shield className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">正常</div>
            <p className="text-xs text-fy-steel/60 mt-1">近 24h 拦截 128 次攻击</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nodes">
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20">
          <TabsTrigger value="nodes" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">节点管理</TabsTrigger>
          <TabsTrigger value="backup" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">数据备份</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">安全日志</TabsTrigger>
        </TabsList>

        {/* 节点管理 */}
        <TabsContent value="nodes">
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {mockNodes.map((node) => (
              <Card key={node.id} className={`border ${node.status === 'online' ? 'bg-fy-panel border-fy-edge/20' : 'bg-fy-dark/30 border-fy-edge/10 opacity-70'}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      {node.name}
                      {node.status === 'online' ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          在线
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-fy-red-hc font-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-fy-red" />
                          离线
                        </span>
                      )}
                    </CardTitle>
                    <Badge variant="outline" className="text-fy-steel/60 border-fy-edge/30 text-[10px] font-mono">
                      {node.location}
                    </Badge>
                  </div>
                  <CardDescription className="text-fy-steel/60 font-mono text-xs">{node.ip}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">处理器</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.cpu}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">内存</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.memory}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">玩家</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.players}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">帧率</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.tps}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">延迟</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.ping}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-fy-steel/60" />
                      <span className="text-xs text-fy-steel/60">运行</span>
                      <span className="text-xs font-mono text-white ml-auto">{node.uptime}</span>
                    </div>
                  </div>
                  {node.status === 'online' && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-fy-edge/10">
                      <Button variant="outline" size="sm" className="flex-1 border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs h-7">
                        重启服务
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs h-7">
                        RCON 控制台
                      </Button>
                    </div>
                  )}
                  {node.status === 'offline' && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-fy-edge/10">
                      <Button variant="outline" size="sm" className="flex-1 border-fy-amber/30 text-fy-amber hover:bg-fy-amber/10 text-xs h-7">
                        启动节点
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 数据备份 */}
        <TabsContent value="backup">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">备份管理</CardTitle>
                  <CardDescription className="text-fy-steel/60">数据库全量/增量备份记录，支持一键恢复与异地归档。</CardDescription>
                </div>
                <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold text-xs">
                  <Database className="w-4 h-4 mr-2" />
                  立即全量备份
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                  <TableRow className="border-fy-edge/20 hover:bg-transparent">
                    <TableHead className="text-fy-steel">备份编号</TableHead>
                    <TableHead className="text-fy-steel">类型</TableHead>
                    <TableHead className="text-fy-steel">大小</TableHead>
                    <TableHead className="text-fy-steel">目标节点</TableHead>
                    <TableHead className="text-fy-steel">创建时间</TableHead>
                    <TableHead className="text-fy-steel">状态</TableHead>
                    <TableHead className="text-right text-fy-steel">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBackups.map((bak) => (
                    <TableRow key={bak.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-mono text-fy-steel/80 text-xs">{bak.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={bak.type === '全量备份' ? 'text-fy-amber border-fy-amber/30' : 'text-fy-steel/80 border-fy-edge/30'}>
                          {bak.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-fy-steel/80">{bak.size}</TableCell>
                      <TableCell className="text-fy-steel/80">{bak.node}</TableCell>
                      <TableCell className="text-fy-steel/60 text-xs">{bak.createdAt}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/20 text-emerald-500">
                          <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                          成功
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-7 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10 text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            下载
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-fy-steel hover:text-emerald-500 hover:bg-emerald-500/10 text-xs">
                            恢复
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全日志 */}
        <TabsContent value="security">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">安全事件日志</CardTitle>
                  <CardDescription className="text-fy-steel/60">WAF、入侵检测、DDoS 防护等安全系统的实时告警记录。</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs">
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    防火墙规则
                  </Button>
                  <Button variant="outline" size="sm" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs">
                    导出日志
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSecurityEvents.map((evt) => (
                <div key={evt.id} className="flex items-start gap-4 p-3 rounded-md border border-fy-edge/10 bg-fy-dark/20">
                  <div className="mt-0.5">
                    {evt.level === 'high' ? (
                      <AlertTriangle className="w-5 h-5 text-fy-red-hc" />
                    ) : evt.level === 'medium' ? (
                      <AlertTriangle className="w-5 h-5 text-fy-orange-hc" />
                    ) : (
                      <Shield className="w-5 h-5 text-fy-steel/60" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{evt.type}</span>
                      <Badge className={
                        evt.level === 'high' ? 'bg-fy-red/20 text-fy-red-hc text-[10px]' :
                        evt.level === 'medium' ? 'bg-fy-orange/20 text-fy-orange-hc text-[10px]' :
                        'bg-fy-steel/20 text-fy-steel text-[10px]'
                      }>
                        {evt.level === 'high' ? '高危' : evt.level === 'medium' ? '中危' : '低危'}
                      </Badge>
                    </div>
                    <p className="text-xs text-fy-steel/60">{evt.description}</p>
                    <p className="text-[10px] text-fy-steel/40 mt-1">{evt.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10 text-xs shrink-0">
                    详情
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
