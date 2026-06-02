import { useState, useEffect } from 'react';
import { Globe, Crosshair, BookOpen, Newspaper, HelpCircle, ChevronDown, ArrowUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const sections = [
  { icon: Globe, label: '背景', tag: 'BACKGROUND', items: ['《战术小队》(Squad) 是一款50vs50大规模多人战术射击游戏','强调团队协作、通信与战术配合，非传统FPS体验','由Offworld Industries开发，基于虚幻引擎4打造'] },
  { icon: Crosshair, label: '玩法', tag: 'GAMEPLAY', items: ['以小队为单位作战，每队9人，由小队长指挥','建造FOB前线基地，部署兵站与防御工事','兵种体系：步枪兵、医疗兵、轻/重机枪手、反坦克兵、工兵等'] },
  { icon: BookOpen, label: '入门', tag: 'GETTING STARTED', items: ['完成训练场教程，熟悉基本操作与射击手感','加入小队后跟随队长指令，保持通信畅通','优先选择步枪兵或医疗兵上手，逐步尝试其他兵种'] },
  { icon: Newspaper, label: '资讯', tag: 'NEWS & UPDATES', items: ['关注Steam商店页面获取最新版本更新日志','官方Discord频道发布开发进度与社区活动','FY战队群内同步推送重要版本改动与战术分析'] },
];

const faqItems = [
  { question: '游戏需要什么配置？', answer: '最低GTX 770，推荐GTX 1060以上' },
  { question: '必须开麦吗？', answer: '强烈建议使用麦克风，沟通是核心玩法' },
  { question: '新手适合什么服务器？', answer: '推荐先在新手服练习，再转正式服' },
];

export default function Guide() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({ 0: true });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => { const handleScroll = () => { setShowBackTop(window.scrollY > window.innerHeight); }; window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />
        <p className="section-label mb-3">FIELD MANUAL</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">游戏指南</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8 sm:mb-12">从零开始了解《战术小队》</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fy-green-dim/20 mb-8 sm:mb-12">
          {sections.map((sec, index) => (<div key={sec.label} className="bg-fy-panel hover:bg-fy-surface transition-colors"><button onClick={() => setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }))} className="w-full p-4 sm:p-6 flex items-center gap-3"><sec.icon className="w-4 h-4 text-fy-amber shrink-0" /><span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{sec.label}</span><span className="data-label ml-auto">{sec.tag}</span><ChevronDown className={`w-4 h-4 text-fy-steel/50 transition-transform shrink-0 ${expandedSections[index] ? 'rotate-180' : ''}`} /></button>{expandedSections[index] && (<div className="px-4 sm:px-6 pb-4 sm:pb-6"><div className="divider mb-4" /><ul className="space-y-3">{sec.items.map((item, i) => (<li key={i} className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-green-dim/30">{item}</li>))}</ul></div>)}</div>))}
        </div>
        <div className="panel p-4 sm:p-6 hud-corners"><div className="flex items-center gap-2 mb-4 sm:mb-6"><HelpCircle className="w-4 h-4 text-fy-amber" /><span className="section-label">FAQ</span></div><div className="divider mb-4" /><div className="space-y-px bg-fy-green-dim/10">{faqItems.map((faq, i) => (<div key={i} className="bg-fy-panel"><button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-fy-surface transition-colors"><span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider text-left pr-3">Q: {faq.question}</span><ChevronDown className={`w-3.5 h-3.5 text-fy-steel/50 transition-transform shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`} /></button>{expandedFaq === i && (<div className="px-3 sm:px-4 pb-3 sm:pb-4"><p className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-amber/30">A: {faq.answer}</p></div>)}</div>))}</div></div>
      </div>
      {showBackTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-10 h-10 bg-fy-amber text-fy-dark flex items-center justify-center hover:bg-fy-amber/80 transition-colors z-40"><ArrowUp className="w-4 h-4" /></button>}
    </div>
  );
}
