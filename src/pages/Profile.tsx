import { useState } from 'react';
import { MessageSquare, Settings, FileText, CreditCard, Bookmark, Camera, LogOut } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Tab = '帖子' | '赞助' | '收藏' | '设置';

const tabs: { key: Tab; icon: typeof MessageSquare }[] = [
  { key: '帖子', icon: FileText }, { key: '赞助', icon: CreditCard }, { key: '收藏', icon: Bookmark }, { key: '设置', icon: Settings },
];

const posts = [
  { title: 'Al Basrah 进攻路线分享', date: '2026-05-28', replies: 12 },
  { title: '新兵报到！来自一名老兵的问候', date: '2026-05-25', replies: 8 },
  { title: 'FOB防守经验总结', date: '2026-05-20', replies: 23 },
];

const sponsors = [
  { date: '2026-05', amount: '¥50', method: '微信' }, { date: '2026-04', amount: '¥30', method: '支付宝' }, { date: '2026-03', amount: '¥50', method: '微信' },
];

const bookmarks = [
  { title: '载具编队与反装甲战术', type: '视频' }, { title: '小队长快速参考卡', type: '资源' }, { title: 'Narva 俄军防守布阵详解', type: '图文' },
];

const stats = [{ label: '帖子', value: 3 }, { label: '获赞', value: 128 }, { label: '天数', value: 45 }];

export default function Profile() {
  const [tab, setTab] = useState<Tab>('帖子');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="bg-fy-dark min-h-screen">
      {showLogoutConfirm && (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"><div className="panel p-6 sm:p-8 hud-corners max-w-sm w-full text-center"><h3 className="font-hud font-bold text-white text-sm tracking-wider mb-3">确认退出</h3><p className="text-fy-steel text-xs mb-6">确定要退出登录吗？</p><div className="flex gap-3 justify-center"><button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">取消</button><button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-fy-red/80 text-white font-hud text-xs tracking-wider hover:bg-fy-red transition-colors">退出登录</button></div></div></div>)}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />
        <div className="panel p-4 sm:p-6 mb-6 sm:mb-8 hud-corners">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative group"><div className="w-12 h-12 sm:w-16 sm:h-16 bg-fy-surface border border-fy-green-dim/30 flex items-center justify-center shrink-0 overflow-hidden"><img src="/images/logo.png" alt="头像" className="w-full h-full object-contain" /></div><button className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-4 h-4 text-white" /></button></div>
            <div><h2 className="font-hud font-bold text-xl sm:text-2xl text-white tracking-wider">FY_Commander</h2><div className="flex items-center gap-3 sm:gap-4 mt-1"><span className="data-label">UID: 0001</span><span className="font-mono text-[10px] text-fy-green tracking-wider">● ACTIVE</span></div></div>
            <div className="ml-auto hidden md:flex items-center gap-6">{stats.map((s) => (<div key={s.label} className="text-center"><div className="data-value text-lg">{s.value}</div><div className="data-label">{s.label}</div></div>))}</div>
          </div>
          <div className="flex md:hidden items-center justify-center gap-6 mt-4 pt-4 border-t border-fy-green-dim/20">{stats.map((s) => (<div key={s.label} className="text-center"><div className="data-value text-base">{s.value}</div><div className="data-label">{s.label}</div></div>))}</div>
        </div>
        <div className="flex gap-px bg-fy-green-dim/20 mb-6 sm:mb-8 w-fit">{tabs.map((t) => (<button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 font-hud text-xs tracking-wider transition-colors ${tab === t.key ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}><t.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">{t.key}</span></button>))}</div>
        <div className="panel p-4 sm:p-6">
          {tab === '帖子' && (<div className="space-y-px bg-fy-green-dim/10">{posts.map((p) => (<div key={p.title} className="flex items-center justify-between p-4 bg-fy-panel hover:bg-fy-surface transition-colors"><div><h4 className="font-hud font-semibold text-white text-sm tracking-wider">{p.title}</h4><span className="font-mono text-[10px] text-fy-steel/50">{p.date}</span></div><span className="flex items-center gap-1 text-fy-steel/50 text-xs"><MessageSquare className="w-3 h-3" /> {p.replies}</span></div>))}</div>)}
          {tab === '赞助' && (<div className="space-y-px bg-fy-green-dim/10">{sponsors.map((s) => (<div key={s.date} className="flex items-center justify-between p-4 bg-fy-panel"><span className="font-mono text-[10px] text-fy-steel/50">{s.date}</span><span className="font-hud font-semibold text-fy-amber text-sm">{s.amount}</span><span className="font-mono text-[10px] text-fy-steel/50">{s.method}</span></div>))}</div>)}
          {tab === '收藏' && (<div className="space-y-px bg-fy-green-dim/10">{bookmarks.map((b) => (<div key={b.title} className="flex items-center justify-between p-4 bg-fy-panel hover:bg-fy-surface transition-colors"><span className="font-hud font-semibold text-white text-sm tracking-wider">{b.title}</span><span className="font-mono text-[10px] text-fy-steel/50 border border-fy-green-dim/30 px-2 py-0.5">{b.type}</span></div>))}</div>)}
          {tab === '设置' && (<div className="space-y-5 sm:space-y-6 max-w-md"><div><label className="data-label block mb-2">头像</label><div className="flex items-center gap-4"><div className="w-12 h-12 bg-fy-surface border border-fy-green-dim/30 flex items-center justify-center overflow-hidden"><img src="/images/logo.png" alt="头像" className="w-full h-full object-contain" /></div><button className="btn-outline text-xs py-2 px-4 flex items-center gap-2"><Camera className="w-3 h-3" /> 更换头像</button></div></div><div><label className="data-label block mb-2">昵称</label><input type="text" defaultValue="FY_Commander" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 sm:py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" /></div><div><label className="data-label block mb-2">QQ</label><input type="text" defaultValue="123456789" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 sm:py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" /></div><div><label className="data-label block mb-2">签名</label><input type="text" defaultValue="战术至上，团队第一" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 sm:py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" /></div><button className="btn-amber text-xs sm:text-sm">保存修改</button><div className="divider" /><button onClick={() => setShowLogoutConfirm(true)} className="flex items-center gap-2 text-fy-red/70 hover:text-fy-red font-hud text-xs tracking-wider transition-colors"><LogOut className="w-3.5 h-3.5" /> 退出登录</button></div>)}
        </div>
      </div>
    </div>
  );
}
