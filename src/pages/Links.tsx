import { useState } from 'react';
import { ExternalLink, Shield, BookOpen, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const clanLinks = [
  { name: 'ZQ战队', desc: '战术小队中文社区老牌战队，长期友好合作', url: '#' },
  { name: 'RED战队', desc: '以竞技为核心的战术小队战队，FY联赛对手', url: '#' },
  { name: 'TIGER战队', desc: '新锐战队，活跃于各类社区赛事', url: '#' },
  { name: 'Squad中文社区', desc: '战术小队中文玩家聚集地，攻略与讨论', url: '#' },
];

const resourceLinks = [
  { name: 'Squad Wiki', desc: '官方百科，包含兵种、武器、地图等详细数据', url: '#' },
  { name: 'Offworld Industries', desc: '游戏开发商官方网站与开发日志', url: '#' },
  { name: 'Squad Steam商店', desc: '游戏购买页面与版本更新日志', url: '#' },
  { name: 'Squad Mod Hub', desc: '社区MOD资源与安装指南', url: '#' },
];

export default function Links() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  return (
    <div className="bg-fy-dark min-h-screen">
      {showApplyModal && (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"><div className="panel p-6 sm:p-8 hud-corners max-w-md w-full"><h3 className="font-hud font-bold text-white text-sm tracking-wider mb-4">申请友链</h3><form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); }}><div><label className="data-label block mb-2">站点名称</label><input type="text" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors placeholder:text-fy-steel/30" placeholder="你的站点/战队名称" /></div><div><label className="data-label block mb-2">站点地址</label><input type="text" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors placeholder:text-fy-steel/30" placeholder="https://" /></div><div><label className="data-label block mb-2">站点描述</label><input type="text" className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors placeholder:text-fy-steel/30" placeholder="简短描述" /></div><div className="flex gap-3 justify-end pt-2"><button type="button" onClick={() => setShowApplyModal(false)} className="px-4 py-2 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">取消</button><button type="submit" className="btn-amber text-xs px-4 py-2">提交申请</button></div></form></div></div>)}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />
        <div className="flex items-center justify-between mb-8 sm:mb-12"><div><p className="section-label mb-3">ALLIED NETWORK</p><h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">友情链接</h1><p className="text-fy-steel text-xs sm:text-sm">合作战队与社区资源</p></div><button onClick={() => setShowApplyModal(true)} className="btn-outline text-xs py-2 px-3 sm:px-4 flex items-center gap-1.5"><Plus className="w-3 h-3" /> <span className="hidden sm:inline">申请友链</span></button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fy-green-dim/20">
          <div className="bg-fy-panel p-4 sm:p-6"><div className="flex items-center gap-2 mb-4"><Shield className="w-4 h-4 text-fy-amber" /><span className="section-label">CLANS</span></div><div className="divider mb-4" /><ul className="space-y-px bg-fy-green-dim/10">{clanLinks.map((link) => (<li key={link.name}><a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-fy-panel hover:bg-fy-surface transition-all duration-200 group hover:-translate-y-0.5"><div><span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider group-hover:text-fy-amber transition-colors">{link.name}</span><p className="text-fy-steel text-xs mt-0.5">{link.desc}</p></div><ExternalLink className="w-3.5 h-3.5 text-fy-steel/30 group-hover:text-fy-amber transition-colors shrink-0 ml-3" /></a></li>))}</ul></div>
          <div className="bg-fy-panel p-4 sm:p-6"><div className="flex items-center gap-2 mb-4"><BookOpen className="w-4 h-4 text-fy-amber" /><span className="section-label">RESOURCES</span></div><div className="divider mb-4" /><ul className="space-y-px bg-fy-green-dim/10">{resourceLinks.map((link) => (<li key={link.name}><a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-fy-panel hover:bg-fy-surface transition-all duration-200 group hover:-translate-y-0.5"><div><span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider group-hover:text-fy-amber transition-colors">{link.name}</span><p className="text-fy-steel text-xs mt-0.5">{link.desc}</p></div><ExternalLink className="w-3.5 h-3.5 text-fy-steel/30 group-hover:text-fy-amber transition-colors shrink-0 ml-3" /></a></li>))}</ul></div>
        </div>
      </div>
    </div>
  );
}
