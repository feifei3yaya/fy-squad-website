import { useState } from 'react';
import { MessageSquare, Users, Shield, CheckCheck, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Filter = '全部' | '系统' | '互动' | '招募';

const initialMessages = [
  { id: 1, type: '系统' as const, title: '系统维护通知', content: '服务器将于6月1日凌晨2:00-6:00进行维护', time: '10分钟前', read: false },
  { id: 2, type: '互动' as const, title: 'FY_Scout 回复了你的帖子', content: '这个战术分析很棒，我补充一下...', time: '1小时前', read: false },
  { id: 3, type: '招募' as const, title: '新兵训练营 #12 报名确认', content: '你已成功报名新兵训练营，请准时参加', time: '3小时前', read: true },
  { id: 4, type: '系统' as const, title: '版本更新 v4.5', content: '游戏已更新至v4.5版本，新增地图Yehorivka', time: '1天前', read: true },
  { id: 5, type: '互动' as const, title: 'FY_Engineer 点赞了你的评论', content: 'FOB选址攻略中的评论获得了一个赞', time: '2天前', read: true },
  { id: 6, type: '招募' as const, title: 'FY vs ZQ 友谊赛招募', content: '友谊赛需要更多队员参加，点击报名', time: '3天前', read: true },
];

const typeIcon: Record<string, typeof Shield> = {
  '系统': Shield,
  '互动': MessageSquare,
  '招募': Users,
};

const typeColor: Record<string, string> = {
  '系统': 'text-fy-steel',
  '互动': 'text-fy-amber',
  '招募': 'text-fy-green',
};

export default function Messages() {
  const [filter, setFilter] = useState<Filter>('全部');
  const [msgs, setMsgs] = useState(initialMessages);
  const [showReadAllConfirm, setShowReadAllConfirm] = useState(false);

  const filters: Filter[] = ['全部', '系统', '互动', '招募'];
  const filtered = filter === '全部' ? msgs : msgs.filter((m) => m.type === filter);
  const unreadCount = msgs.filter((m) => !m.read).length;

  const markAllRead = () => {
    setShowReadAllConfirm(true);
  };

  const confirmMarkAllRead = () => {
    setMsgs(msgs.map((m) => ({ ...m, read: true })));
    setShowReadAllConfirm(false);
  };

  const deleteMessage = (id: number) => {
    setMsgs(msgs.filter((m) => m.id !== id));
  };

  const markAsRead = (id: number) => {
    setMsgs(msgs.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      {showReadAllConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="panel p-6 sm:p-8 hud-corners max-w-sm w-full text-center">
            <h3 className="font-hud font-bold text-white text-sm tracking-wider mb-3">全部已读</h3>
            <p className="text-fy-steel text-xs mb-6">确认将所有消息标记为已读？</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowReadAllConfirm(false)} className="px-4 py-2 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">
                取消
              </button>
              <button onClick={confirmMarkAllRead} className="btn-amber text-xs px-4 py-2">
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="section-label mb-3">MESSAGES</p>
            <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-1">消息中心</h1>
            <p className="text-fy-steel text-xs sm:text-sm">
              {unreadCount > 0 ? `${unreadCount} 条未读消息` : '没有未读消息'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 text-fy-steel hover:text-fy-amber transition-colors font-hud text-xs tracking-wider">
              <CheckCheck className="w-4 h-4" /> <span className="hidden sm:inline">全部已读</span>
            </button>
          )}
        </div>

        <div className="flex gap-px bg-fy-green-dim/20 mb-6 sm:mb-8 w-fit">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 font-hud text-xs tracking-wider transition-colors ${filter === f ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-px bg-fy-green-dim/20">
          {filtered.map((m) => {
            const Icon = typeIcon[m.type];
            const color = typeColor[m.type];
            return (
              <div
                key={m.id}
                onClick={() => markAsRead(m.id)}
                className={`bg-fy-panel p-4 sm:p-5 hover:bg-fy-surface transition-colors group relative cursor-pointer ${!m.read ? 'border-l-2 border-l-fy-amber' : ''}`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`mt-0.5 ${color}`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-hud font-semibold text-xs sm:text-sm tracking-wider truncate ${!m.read ? 'text-white' : 'text-fy-steel'}`}>
                        {m.title}
                      </h3>
                      <span className={`font-mono text-[10px] tracking-wider shrink-0 ${color} border border-fy-green-dim/30 px-1.5 py-0.5`}>
                        {m.type}
                      </span>
                    </div>
                    <p className="text-fy-steel/60 text-xs truncate">{m.content}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-fy-steel/30">{m.time}</span>
                    {!m.read && <span className="w-1.5 h-1.5 bg-fy-amber" />}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteMessage(m.id); }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity text-fy-steel/30 hover:text-fy-red"
                  title="删除消息"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="bg-fy-panel p-8 text-center">
              <p className="text-fy-steel/50 text-xs">暂无消息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
