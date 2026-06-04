import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, ServerCrash, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">控制台大屏</h2>
        <p className="text-sm text-fy-steel/60 mt-1">欢迎回来，指挥官。这是今天的社区运行概览。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI Cards */}
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">今日新增申请</CardTitle>
            <Users className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12</div>
            <p className="text-xs text-emerald-500 mt-1">↑ 较昨日增加 20%</p>
          </CardContent>
        </Card>

        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">待审百科词条</CardTitle>
            <FileText className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-fy-steel/60 mt-1">3 个高优审核任务</p>
          </CardContent>
        </Card>

        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">服务器告警</CardTitle>
            <ServerCrash className="w-4 h-4 text-fy-red-hc" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-emerald-500 mt-1">所有节点运行正常</p>
          </CardContent>
        </Card>

        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">本月赞助金额</CardTitle>
            <DollarSign className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">¥1,250</div>
            <p className="text-xs text-fy-steel/60 mt-1">目标达成率 62%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-fy-panel border-fy-edge/20">
          <CardHeader>
            <CardTitle className="text-white">流量趋势</CardTitle>
            <CardDescription className="text-fy-steel/60">近 7 天社区访问与活跃数据</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-fy-edge/10">
            {/* TODO: 引入 Recharts 绘制折线图 */}
            <span className="text-fy-steel/40 text-sm">图表组件加载中...</span>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-fy-panel border-fy-edge/20">
          <CardHeader>
            <CardTitle className="text-white">最新动态</CardTitle>
            <CardDescription className="text-fy-steel/60">系统审计日志与用户行为</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-fy-amber/50" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-fy-silver">用户 [ID:8821] 提交了新的加入申请</p>
                    <p className="text-xs text-fy-steel/50">10 分钟前</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
