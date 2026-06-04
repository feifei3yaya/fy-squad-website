import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, Trash2, Ban, MessageSquareWarning } from 'lucide-react';

// 模拟的论坛帖子/举报数据
const mockForumTasks = [
  { id: 'FR-8890', type: 'post', title: '服务器卡顿严重，退钱！', author: 'AngryGamer', reason: '可能包含过激言论 (AI风控拦截)', status: 'flagged', time: '5分钟前' },
  { id: 'FR-8889', type: 'comment', title: 'Re: 新手求助怎么开坦克', author: 'Troll_King', reason: '被多名用户举报辱骂', status: 'reported', time: '半小时前' },
  { id: 'FR-8888', type: 'post', title: '【广告】加群领免费CDK', author: 'AdBot_001', reason: '涉嫌引流广告', status: 'deleted', time: '2小时前' },
];

export function AdminForum() {
  const [activeTab, setActiveTab] = useState('flagged');

  const filteredTasks = mockForumTasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab || (activeTab === 'flagged' && task.status === 'reported');
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">论坛治理中心</h2>
          <p className="text-sm text-fy-steel/60 mt-1">处理违规内容、风控拦截告警与用户举报，维护社区秩序。</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-fy-edge/30 text-fy-steel hover:bg-fy-amber/10 hover:text-fy-amber">
            全局违禁词配置
          </Button>
          <Button className="bg-fy-red hover:bg-fy-red/90 text-white font-bold">
            <ShieldAlert className="w-4 h-4 mr-2" />
            一键开启防御模式
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-fy-steel flex items-center gap-2">
              <MessageSquareWarning className="w-4 h-4 text-fy-amber" />
              待处理举报
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-fy-steel flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-fy-orange-hc" />
              AI 风控拦截
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
          </CardContent>
        </Card>
        <Card className="bg-fy-panel border-fy-edge/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-fy-steel flex items-center gap-2">
              <Ban className="w-4 h-4 text-fy-red-hc" />
              今日封禁用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flagged" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20">
          <TabsTrigger value="flagged" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">待处理风控/举报</TabsTrigger>
          <TabsTrigger value="deleted" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">回收站</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">全站审查流水</TabsTrigger>
        </TabsList>

        <Card className="mt-4 bg-fy-panel border-fy-edge/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">高危内容预警列表</CardTitle>
            <CardDescription className="text-fy-steel/60">系统自动拦截的敏感内容或被多名用户举报的帖子。</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                <TableRow className="border-fy-edge/20 hover:bg-transparent">
                  <TableHead className="text-fy-steel">类型</TableHead>
                  <TableHead className="text-fy-steel">内容摘要</TableHead>
                  <TableHead className="text-fy-steel">发布人</TableHead>
                  <TableHead className="text-fy-steel">预警原因</TableHead>
                  <TableHead className="text-fy-steel">时间</TableHead>
                  <TableHead className="text-right text-fy-steel">快捷处置</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <Badge variant="outline" className="text-fy-steel/80 border-fy-edge/30">
                        {task.type === 'post' ? '主题帖' : '评论'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-white max-w-[300px] truncate" title={task.title}>
                      {task.title}
                    </TableCell>
                    <TableCell className="text-fy-steel/80">{task.author}</TableCell>
                    <TableCell>
                      <span className="text-fy-orange-hc text-xs">{task.reason}</span>
                    </TableCell>
                    <TableCell className="text-fy-steel/60">{task.time}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {task.status !== 'deleted' && (
                          <>
                            <Button variant="ghost" size="sm" className="h-8 text-fy-steel hover:text-white hover:bg-white/10">
                              放行
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-fy-red-hc hover:text-white hover:bg-fy-red">
                              <Trash2 className="h-3 w-3 mr-1" />
                              删帖
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-fy-red-hc hover:text-white hover:bg-fy-red">
                              <Ban className="h-3 w-3 mr-1" />
                              封号
                            </Button>
                          </>
                        )}
                        {task.status === 'deleted' && (
                          <Button variant="ghost" size="sm" className="h-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10">
                            恢复
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12 text-fy-steel/40">
                暂无需要处理的预警内容
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
