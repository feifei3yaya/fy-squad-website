import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, CheckCircle2, XCircle, Eye, MessageSquare, Clock, ArrowRight } from 'lucide-react';

// 模拟申请数据
const mockApplications = [
  {
    id: 'APP-1201',
    name: '李明',
    age: 22,
    steamId: '76561198000000010',
    hours: 850,
    role: '步枪兵',
    experience: '有 200 小时 HLL 经验，FPS 老玩家',
    status: 'pending',
    appliedAt: '2小时前',
    contact: 'QQ: 1234567890',
  },
  {
    id: 'APP-1200',
    name: '王刚',
    age: 28,
    steamId: '76561198000000011',
    hours: 2300,
    role: '队长',
    experience: '前战队指挥，带队经验丰富',
    status: 'interviewing',
    appliedAt: '昨天',
    contact: 'YY: 987654321',
  },
  {
    id: 'APP-1199',
    name: '张伟',
    age: 19,
    steamId: '76561198000000012',
    hours: 120,
    role: '医疗兵',
    experience: '新人玩家，愿意学习',
    status: 'approved',
    appliedAt: '3天前',
    contact: 'QQ: 5678901234',
  },
  {
    id: 'APP-1198',
    name: '赵强',
    age: 25,
    steamId: '76561198000000013',
    hours: 45,
    role: '狙击手',
    experience: '无相关经验',
    status: 'rejected',
    appliedAt: '5天前',
    contact: 'QQ: 3456789012',
  },
];

// 状态配置
const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: '待处理', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20' },
  interviewing: { label: '面试中', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
  approved: { label: '已通过', color: 'text-emerald-500', bgColor: 'bg-emerald-500/20' },
  rejected: { label: '已婉拒', color: 'text-red-500', bgColor: 'bg-red-500/20' },
};

// 状态流转规则
const validTransitions: Record<string, string[]> = {
  pending: ['interviewing', 'rejected'],
  interviewing: ['approved', 'rejected'],
  approved: [],
  rejected: [],
};

export function AdminRecruitment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">招募处理中心</h2>
          <p className="text-sm text-fy-steel/60 mt-1">管理战队加入申请，推动候选人从申请到入队的全流程流转。</p>
        </div>
        <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold">
          <UserPlus className="w-4 h-4 mr-2" />
          开放新一轮招募
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">本月申请总数</CardTitle>
            <UserPlus className="w-4 h-4 text-fy-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-emerald-500 mt-1">↑ 较上月增加 40%</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">待处理申请</CardTitle>
            <Clock className="w-4 h-4 text-fy-orange-hc" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-fy-steel/60 mt-1">平均处理时长 4.2 小时</p>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-fy-steel">本月通过率</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">35%</div>
            <p className="text-xs text-fy-steel/60 mt-1">10 人通过 / 28 人申请</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">全部申请</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">待处理 (1)</TabsTrigger>
          <TabsTrigger value="interviewing" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">面试中 (1)</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">已通过</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">已婉拒</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <RecruitmentTable applications={mockApplications} />
        </TabsContent>
        <TabsContent value="pending">
          <RecruitmentTable applications={mockApplications.filter(a => a.status === 'pending')} />
        </TabsContent>
        <TabsContent value="interviewing">
          <RecruitmentTable applications={mockApplications.filter(a => a.status === 'interviewing')} />
        </TabsContent>
        <TabsContent value="approved">
          <RecruitmentTable applications={mockApplications.filter(a => a.status === 'approved')} />
        </TabsContent>
        <TabsContent value="rejected">
          <RecruitmentTable applications={mockApplications.filter(a => a.status === 'rejected')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// 申请人详情弹窗
function ApplicantDetail({ app }: { app: typeof mockApplications[0] }) {
  const sc = statusConfig[app.status];
  return (
    <DialogContent className="bg-fy-panel border-fy-edge/30 text-fy-silver max-w-lg">
      <DialogHeader>
        <DialogTitle className="text-white flex items-center gap-2">
          {app.name}
          <Badge className={`${sc.bgColor} ${sc.color}`}>{sc.label}</Badge>
        </DialogTitle>
        <DialogDescription className="text-fy-steel/60">申请编号: {app.id}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-fy-steel/60">年龄</span>
            <p className="text-white">{app.age} 岁</p>
          </div>
          <div>
            <span className="text-xs text-fy-steel/60">游戏时长</span>
            <p className="text-white">{app.hours} 小时</p>
          </div>
          <div>
            <span className="text-xs text-fy-steel/60">意向兵种</span>
            <p className="text-white">{app.role}</p>
          </div>
          <div>
            <span className="text-xs text-fy-steel/60">联系方式</span>
            <p className="text-white text-sm">{app.contact}</p>
          </div>
        </div>
        <div>
          <span className="text-xs text-fy-steel/60">Steam ID</span>
          <p className="text-white font-mono text-sm">{app.steamId}</p>
        </div>
        <div>
          <span className="text-xs text-fy-steel/60">个人简述</span>
          <p className="text-white text-sm bg-fy-dark/50 p-3 rounded-md border border-fy-edge/10 mt-1">{app.experience}</p>
        </div>
        <div>
          <span className="text-xs text-fy-steel/60">申请时间</span>
          <p className="text-fy-steel/80 text-sm">{app.appliedAt}</p>
        </div>
      </div>
    </DialogContent>
  );
}

// 招募数据表格
function RecruitmentTable({ applications }: { applications: typeof mockApplications }) {
  return (
    <Card className="mt-4 bg-fy-panel border-fy-edge/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">申请人列表</CardTitle>
        <CardDescription className="text-fy-steel/60">点击申请人可查看详细资料，执行状态流转操作。</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="border-fy-edge/20 hover:bg-transparent">
            <TableRow className="border-fy-edge/20 hover:bg-transparent">
              <TableHead className="text-fy-steel">编号</TableHead>
              <TableHead className="text-fy-steel">姓名</TableHead>
              <TableHead className="text-fy-steel">Steam 时长</TableHead>
              <TableHead className="text-fy-steel">意向兵种</TableHead>
              <TableHead className="text-fy-steel">状态</TableHead>
              <TableHead className="text-fy-steel">申请时间</TableHead>
              <TableHead className="text-right text-fy-steel">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow className="border-fy-edge/10">
                <TableCell colSpan={7} className="text-center py-12 text-fy-steel/40">
                  暂无相关申请数据
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => {
                const sc = statusConfig[app.status];
                const transitions = validTransitions[app.status] || [];
                return (
                  <TableRow key={app.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-mono text-fy-steel/80 text-xs">{app.id}</TableCell>
                    <TableCell className="font-medium text-white">{app.name}</TableCell>
                    <TableCell className="text-fy-steel/80">{app.hours}h</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-fy-steel/80 border-fy-edge/30">{app.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${sc.bgColor} ${sc.color}`}>{sc.label}</Badge>
                    </TableCell>
                    <TableCell className="text-fy-steel/60 text-xs">{app.appliedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* 查看详情 */}
                        <Dialog>
                          <DialogTrigger className="inline-flex">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10" title="查看详情">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <ApplicantDetail app={app} />
                        </Dialog>

                        {/* 状态流转操作 */}
                        {transitions.includes('interviewing') && (
                          <Button variant="ghost" size="sm" className="h-8 text-blue-500 hover:text-white hover:bg-blue-500/20">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            邀约面试
                          </Button>
                        )}
                        {transitions.includes('approved') && (
                          <Button variant="ghost" size="sm" className="h-8 text-emerald-500 hover:text-white hover:bg-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            通过
                          </Button>
                        )}
                        {transitions.includes('rejected') && (
                          <Button variant="ghost" size="sm" className="h-8 text-fy-red-hc hover:text-white hover:bg-fy-red/20">
                            <XCircle className="h-3 w-3 mr-1" />
                            婉拒
                          </Button>
                        )}

                        {/* 已完结状态 */}
                        {transitions.length === 0 && app.status === 'approved' && (
                          <Button variant="ghost" size="sm" className="h-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            发送入队引导
                          </Button>
                        )}
                        {transitions.length === 0 && app.status === 'rejected' && (
                          <span className="text-fy-steel/30 text-xs px-2">已归档</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
