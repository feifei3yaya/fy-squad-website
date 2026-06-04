import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, Eye, History } from 'lucide-react';

// 模拟的百科审核数据
const mockWikiTasks = [
  { id: 'WK-1021', title: 'M4A1 卡宾枪', category: 'Weapons', author: 'User_9921', status: 'pending', submittedAt: '10分钟前', diff: '+ 增加了后坐力衰减数据' },
  { id: 'WK-1020', title: 'BTR-82A 装甲车', category: 'Vehicles', author: 'Veteran_01', status: 'pending', submittedAt: '1小时前', diff: '+ 修正了装甲厚度描述' },
  { id: 'WK-1019', title: '突击模式 (AAS)', category: 'Modes', author: 'Rookie_22', status: 'rejected', submittedAt: '3小时前', diff: '- 删除了错误规则说明' },
  { id: 'WK-1018', title: '医疗兵指南', category: 'Classes', author: 'Medic_God', status: 'approved', submittedAt: '昨天', diff: '+ 新增复活机制详解' },
];

export function AdminWiki() {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredTasks = mockWikiTasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">百科审核中心</h2>
          <p className="text-sm text-fy-steel/60 mt-1">管理、审核和回溯社区百科的所有词条变更。</p>
        </div>
        <Button className="bg-fy-amber hover:bg-fy-amber/90 text-fy-dark font-bold">
          + 新建官方词条
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-fy-panel/50 border border-fy-edge/20">
          <TabsTrigger value="pending" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">待审核 (2)</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">已通过</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">已打回</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-fy-amber/20 data-[state=active]:text-fy-amber">全部记录</TabsTrigger>
        </TabsList>

        <Card className="mt-4 bg-fy-panel border-fy-edge/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">词条变更申请</CardTitle>
            <CardDescription className="text-fy-steel/60">点击查看 Diff 差异以决定是否合入主线版本。</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="border-fy-edge/20 hover:bg-transparent">
                <TableRow className="border-fy-edge/20 hover:bg-transparent">
                  <TableHead className="text-fy-steel">任务 ID</TableHead>
                  <TableHead className="text-fy-steel">词条名称</TableHead>
                  <TableHead className="text-fy-steel">分类</TableHead>
                  <TableHead className="text-fy-steel">提交人</TableHead>
                  <TableHead className="text-fy-steel">状态</TableHead>
                  <TableHead className="text-fy-steel">提交时间</TableHead>
                  <TableHead className="text-right text-fy-steel">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="border-fy-edge/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-mono text-fy-steel/80">{task.id}</TableCell>
                    <TableCell className="font-medium text-white">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-fy-steel/80 border-fy-edge/30">
                        {task.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-fy-steel/80">{task.author}</TableCell>
                    <TableCell>
                      {task.status === 'pending' && <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">待审核</Badge>}
                      {task.status === 'approved' && <Badge className="bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30">已通过</Badge>}
                      {task.status === 'rejected' && <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">已打回</Badge>}
                    </TableCell>
                    <TableCell className="text-fy-steel/60">{task.submittedAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10" title="查看差异 (Diff)">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {task.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10" title="通过">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10" title="打回">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {task.status !== 'pending' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-fy-steel hover:text-fy-amber hover:bg-fy-amber/10" title="版本历史">
                            <History className="h-4 w-4" />
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
                暂无相关数据
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
