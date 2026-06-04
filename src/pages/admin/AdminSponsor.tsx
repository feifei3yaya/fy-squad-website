import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Users, Clock, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

// 模拟赞助订单数据
const mockOrders = [
  { id: 'ORD-5501', user: 'Player_Chen', tier: '高级赞助', amount: 100, status: 'paid', channel: '微信支付', paidAt: '10分钟前', gameId: '76561198000000001' },
  { id: 'ORD-5500', user: 'Squad_Leader', tier: '初级赞助', amount: 30, status: 'paid', channel: '支付宝', paidAt: '1小时前', gameId: '76561198000000002' },
  { id: 'ORD-5499', user: 'Tank_Master', tier: '高级赞助', amount: 100, status: 'pending', channel: '微信支付', paidAt: '3小时前', gameId: '76561198000000003' },
  { id: 'ORD-5498', user: 'New_Recruit', tier: '初级赞助', amount: 30, status: 'refunded', channel: '支付宝', paidAt: '昨天', gameId: '76561198000000004' },
];

// 模拟赞助档位配置
const mockTiers = [
  { name: '初级赞助', amount: 30, perks: '游戏内白名单 / 官网赞助者 Badge', count: 45 },
  { name: '高级赞助', amount: 100, perks: '白名单 + 队列优先 / VIP 专属频道 / 官网金色 Badge', count: 22 },
  { name: '定制赞助', amount: '自定义', perks: '定制游戏内皮肤 / 专属命名载具 / 管理组直接对接', count: 3 },
];

export function AdminSponsor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">赞助财务管理</h2>
          <p className="text-sm text-fy-steel/60 mt-1">管理赞助订单、对账流水与权益发放，保障资金透明可追溯。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber">
            <Download className="w-4 h-4 mr-2" />
            导出对账单
          </Button>
          <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold">
            配置赞助档位
          </Button>
        </div>
      </div>

      {/* KPI 卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">本月赞助总额</CardTitle>
            <DollarSign className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">¥4,560</div>
            <p className="text-xs text-emerald-500 mt-1">↑ 较上月增长 18%</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">赞助总人数</CardTitle>
            <Users className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">70</div>
            <p className="text-xs text-fy-steel/60 mt-1">活跃赞助者 62 人</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">待处理订单</CardTitle>
            <Clock className="w-4 h-4 text-fy-orange-hc" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1</div>
            <p className="text-xs text-fy-steel/60 mt-1">需手动补发权益</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">目标达成率</CardTitle>
            <TrendingUp className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">57%</div>
            <div className="w-full bg-fy-surface rounded-full h-1.5 mt-2">
              <div className="bg-fy-amber h-1.5 rounded-full" style={{ width: '57%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20">
          <TabsTrigger value="orders" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">订单流水</TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">赞助档位</TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">财务对账</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">赞助订单流水</CardTitle>
              <CardDescription className="text-fy-steel/60">所有赞助订单明细，支持手动补发游戏权益。</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                  <TableRow className="border-fy-edge/20 hover:bg-transparent">
                    <TableHead className="text-fy-steel">订单号</TableHead>
                    <TableHead className="text-fy-steel">赞助人</TableHead>
                    <TableHead className="text-fy-steel">档位</TableHead>
                    <TableHead className="text-fy-steel">金额</TableHead>
                    <TableHead className="text-fy-steel">渠道</TableHead>
                    <TableHead className="text-fy-steel">状态</TableHead>
                    <TableHead className="text-fy-steel">支付时间</TableHead>
                    <TableHead className="text-right text-fy-steel">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                      <TableCell className="font-mono text-fy-steel/80 text-xs">{order.id}</TableCell>
                      <TableCell className="font-medium text-white">{order.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={order.tier === '高级赞助' ? 'text-fy-amber border-fy-amber/30' : 'text-fy-steel/80 border-fy-edge/30'}>
                          {order.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-mono">¥{order.amount}</TableCell>
                      <TableCell className="text-fy-steel/80">{order.channel}</TableCell>
                      <TableCell>
                        {order.status === 'paid' && <Badge className="bg-emerald-500/20 text-emerald-500">已支付</Badge>}
                        {order.status === 'pending' && <Badge className="bg-yellow-500/20 text-yellow-500">待确认</Badge>}
                        {order.status === 'refunded' && <Badge className="bg-red-500/20 text-red-500">已退款</Badge>}
                      </TableCell>
                      <TableCell className="text-fy-steel/60 text-xs">{order.paidAt}</TableCell>
                      <TableCell className="text-right">
                        {order.status === 'pending' && (
                          <Button variant="ghost" size="sm" className="h-8 text-fy-amber hover:text-white hover:bg-fy-amber/20">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            补发权益
                          </Button>
                        )}
                        {order.status === 'paid' && (
                          <Button variant="ghost" size="sm" className="h-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            权益已发放
                          </Button>
                        )}
                        {order.status === 'refunded' && (
                          <span className="text-fy-steel/40 text-xs">已完结</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">赞助档位配置</CardTitle>
              <CardDescription className="text-fy-steel/60">管理当前开放的所有赞助档位及对应权益。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockTiers.map((tier, i) => (
                  <Card key={i} className={`border-fy-edge/20 ${tier.name === '高级赞助' ? 'bg-fy-amber/5 border-fy-amber/20' : 'bg-fy-dark/30'}`}>
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        {tier.name}
                        {tier.name === '高级赞助' && <Badge className="bg-fy-amber/20 text-fy-amber text-[10px]">推荐</Badge>}
                      </CardTitle>
                      <CardDescription className="text-2xl font-bold text-fy-amber font-mono">
                        {typeof tier.amount === 'number' ? `¥${tier.amount}` : tier.amount}
                        <span className="text-xs text-fy-steel/60 font-normal ml-1">/月</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-fy-steel/60">{tier.perks}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-fy-edge/10">
                        <span className="text-xs text-fy-steel/60">当前订阅</span>
                        <span className="text-sm font-bold text-white">{tier.count} 人</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2 border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber text-xs">
                        编辑档位
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card className="mt-4 bg-fy-panel border-fy-edge/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">财务对账报表</CardTitle>
              <CardDescription className="text-fy-steel/60">按月导出赞助收入明细，用于财务核账与合规审计。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <DollarSign className="w-12 h-12 text-fy-steel/20 mb-4" />
              <p className="text-fy-steel/40 text-sm mb-4">选择日期范围后生成对账报表</p>
              <Button variant="outline" className="border-fy-amber/30 text-fy-amber hover:bg-fy-amber/10">
                <Download className="w-4 h-4 mr-2" />
                导出本月报表
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
