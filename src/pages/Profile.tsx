import { useState } from 'react';
import { MessageSquare, Settings, FileText, CreditCard, Bookmark, Camera, LogOut, Shield, Calendar, ThumbsUp, Edit3, Save, User, AtSign, Quote, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Tab = '帖子' | '赞助' | '收藏' | '设置';

const tabs: { key: Tab; icon: typeof MessageSquare }[] = [
  { key: '帖子', icon: FileText },
  { key: '赞助', icon: CreditCard },
  { key: '收藏', icon: Bookmark },
  { key: '设置', icon: Settings },
];

const posts = [
  { title: 'Al Basrah 进攻路线分享', date: '2026-05-28', replies: 12, likes: 34 },
  { title: '新兵报到！来自一名老兵的问候', date: '2026-05-25', replies: 8, likes: 21 },
  { title: 'FOB防守经验总结', date: '2026-05-20', replies: 23, likes: 67 },
];

const sponsors = [
  { date: '2026-05', amount: '¥50', method: '微信', status: '已完成' },
  { date: '2026-04', amount: '¥30', method: '支付宝', status: '已完成' },
  { date: '2026-03', amount: '¥50', method: '微信', status: '已完成' },
];

const bookmarks = [
  { title: '载具编队与反装甲战术', type: '视频', tag: '战术' },
  { title: '小队长快速参考卡', type: '资源', tag: '指南' },
  { title: 'Narva 俄军防守布阵详解', type: '图文', tag: '战术' },
];

const stats = [
  { label: '帖子', value: 3, icon: FileText },
  { label: '获赞', value: 128, icon: ThumbsUp },
  { label: '加入天数', value: 45, icon: Calendar },
];

const achievements = [
  { name: '初级勇士', desc: '完成 10 场战斗', progress: 100 },
  { name: '战术大师', desc: '发表 5 篇攻略', progress: 60 },
  { name: '社区之星', desc: '获赞 100 次', progress: 100 },
];

export default function Profile() {
  const [tab, setTab] = useState<Tab>('帖子');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="panel p-6 sm:p-8 hud-corners max-w-sm w-full text-center border border-fy-red/20">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-fy-red/10 border border-fy-red/30 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-fy-red-hc" />
            </div>
            <h3 className="font-hud font-bold text-white text-sm tracking-wider mb-2">确认退出</h3>
            <p className="text-fy-steel/60 text-xs mb-6">确定要退出登录吗？</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowLogoutConfirm(false)} className="px-5 py-2 border border-fy-edge/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">
                取消
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className="px-5 py-2 bg-fy-red/80 text-white font-hud text-xs tracking-wider hover:bg-fy-red transition-colors">
                退出登录
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        {/* 个人信息卡片 */}
        <div className="panel p-4 sm:p-6 mb-6 hud-corners relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-fy-amber/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative group">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-fy-surface border-2 border-fy-amber/20 flex items-center justify-center shrink-0 overflow-hidden rounded-sm">
                  <img src="/images/logo.png" alt="头像" className="w-full h-full object-contain" />
                </div>
                <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-sm">
                  <Camera className="w-4 h-4 text-fy-amber" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-hud font-bold text-xl sm:text-2xl text-white tracking-wider">FY_Commander</h2>
                  <CheckCircle2 className="w-4 h-4 text-fy-amber" aria-label="已验证" />
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                  <span className="flex items-center gap-1 font-mono text-[10px] text-fy-steel/60">
                    <Shield className="w-3 h-3" /> UID: 0001
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ACTIVE
                  </span>
                  <span className="font-mono text-[10px] text-fy-steel/40">2026-04-20 加入</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-5">
                {stats.map((s) => (
                  <div key={s.label} className="text-center px-3 py-2 bg-fy-dark/50 border border-fy-edge/10 rounded-sm">
                    <div className="text-lg font-bold text-white font-hud">{s.value}</div>
                    <div className="text-[10px] text-fy-steel/60 font-mono">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 移动端统计 */}
            <div className="flex md:hidden items-center justify-around mt-4 pt-4 border-t border-fy-edge/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-base font-bold text-white font-hud">{s.value}</div>
                  <div className="text-[10px] text-fy-steel/60 font-mono">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 成就进度 */}
        <div className="panel p-3 sm:p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5 text-fy-amber" />
            <span className="text-[10px] font-mono text-fy-steel/60 tracking-widest">成就进度</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div key={a.name} className="bg-fy-dark/50 border border-fy-edge/10 p-3 rounded-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white font-hud">{a.name}</span>
                  <span className="text-[10px] text-fy-amber font-mono">{a.progress}%</span>
                </div>
                <p className="text-[10px] text-fy-steel/60 mb-2">{a.desc}</p>
                <div className="w-full h-1 bg-fy-surface rounded-full overflow-hidden">
                  <div className="h-full bg-fy-amber transition-all rounded-full" style={{ width: `${a.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex gap-px bg-fy-edge/20 mb-6 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 font-hud text-xs tracking-wider transition-colors ${tab === t.key ? 'bg-fy-amber text-fy-dark font-semibold' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
            >
              <t.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {t.key}
            </button>
          ))}
        </div>

        <div className="panel p-4 sm:p-6 min-h-[280px]">
          {tab === '帖子' && (
            <div>
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-fy-steel/20" />
                  <p className="text-fy-steel/40 text-xs">暂无帖子</p>
                </div>
              ) : (
                <div className="space-y-px bg-fy-edge/10">
                  {posts.map((p) => (
                    <div key={p.title} className="flex items-center justify-between p-3 sm:p-4 bg-fy-panel hover:bg-fy-surface/70 transition-colors cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-hud font-semibold text-white text-sm tracking-wider truncate group-hover:text-fy-amber transition-colors">{p.title}</h4>
                        <span className="font-mono text-[10px] text-fy-steel/50">{p.date}</span>
                      </div>
                      <div className="flex items-center gap-3 ml-3 shrink-0">
                        <span className="flex items-center gap-1 text-fy-steel/50 text-[10px]">
                          <ThumbsUp className="w-3 h-3" /> {p.likes}
                        </span>
                        <span className="flex items-center gap-1 text-fy-steel/50 text-[10px]">
                          <MessageSquare className="w-3 h-3" /> {p.replies}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === '赞助' && (
            <div>
              {sponsors.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-fy-steel/20" />
                  <p className="text-fy-steel/40 text-xs">暂无赞助记录</p>
                </div>
              ) : (
                <div className="space-y-px bg-fy-edge/10">
                  <div className="flex items-center justify-between p-3 bg-fy-dark/50 border-b border-fy-edge/10">
                    <span className="text-[10px] font-mono text-fy-steel/40">日期</span>
                    <span className="text-[10px] font-mono text-fy-steel/40">金额</span>
                    <span className="text-[10px] font-mono text-fy-steel/40">方式</span>
                  </div>
                  {sponsors.map((s) => (
                    <div key={s.date} className="flex items-center justify-between p-3 bg-fy-panel hover:bg-fy-surface/70 transition-colors">
                      <span className="font-mono text-[10px] text-fy-steel/60">{s.date}</span>
                      <span className="font-hud font-semibold text-fy-amber text-sm">{s.amount}</span>
                      <span className="font-mono text-[10px] text-fy-steel/60 bg-fy-dark/30 px-2 py-0.5 rounded-sm">{s.method}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-fy-edge/10">
                <p className="text-[10px] text-fy-steel/40 text-center">感谢您对战队的支持！</p>
              </div>
            </div>
          )}

          {tab === '收藏' && (
            <div>
              {bookmarks.length === 0 ? (
                <div className="text-center py-12">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 text-fy-steel/20" />
                  <p className="text-fy-steel/40 text-xs">暂无收藏</p>
                </div>
              ) : (
                <div className="space-y-px bg-fy-edge/10">
                  {bookmarks.map((b) => (
                    <div key={b.title} className="flex items-center justify-between p-3 sm:p-4 bg-fy-panel hover:bg-fy-surface/70 transition-colors cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-hud font-semibold text-white text-sm tracking-wider truncate group-hover:text-fy-amber transition-colors">{b.title}</h4>
                        <span className="text-[10px] text-fy-steel/50 font-mono">{b.tag}</span>
                      </div>
                      <span className="font-mono text-[10px] text-fy-steel/60 border border-fy-edge/30 px-2 py-0.5 bg-fy-dark/30 shrink-0 ml-2">{b.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === '设置' && (
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-4 h-4 text-fy-amber" />
                <span className="text-[10px] font-mono text-fy-steel/60 tracking-widest">个人资料设置</span>
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <User className="w-3.5 h-3.5 text-fy-steel/40" />
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-fy-steel/60 tracking-wider block mb-1">昵称</label>
                    <input type="text" defaultValue="FY_Commander" className="w-full bg-transparent border-b border-fy-edge/20 py-2 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <AtSign className="w-3.5 h-3.5 text-fy-steel/40" />
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-fy-steel/60 tracking-wider block mb-1">QQ</label>
                    <input type="text" defaultValue="147724008" className="w-full bg-transparent border-b border-fy-edge/20 py-2 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Quote className="w-3.5 h-3.5 text-fy-steel/40" />
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-fy-steel/60 tracking-wider block mb-1">个人签名</label>
                    <input type="text" defaultValue="战术至上，团队第一" className="w-full bg-transparent border-b border-fy-edge/20 py-2 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Camera className="w-3.5 h-3.5 text-fy-steel/40" />
                  <div className="flex-1">
                    <label className="text-[10px] font-mono text-fy-steel/60 tracking-wider block mb-1">头像</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-fy-surface border border-fy-edge/20 flex items-center justify-center overflow-hidden rounded-sm">
                        <img src="/images/logo.png" alt="头像" className="w-full h-full object-contain" />
                      </div>
                      <button className="border border-fy-edge/30 text-[10px] font-mono text-fy-steel px-3 py-1.5 hover:bg-fy-surface transition-colors">
                        更换头像
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-fy-edge/10">
                <button
                  onClick={handleSave}
                  className="btn-amber text-xs flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saved ? '已保存' : '保存修改'}
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-2 text-fy-red-hc/60 hover:text-fy-red-hc font-hud text-xs tracking-wider transition-colors ml-auto"
                >
                  <LogOut className="w-3.5 h-3.5" /> 退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
