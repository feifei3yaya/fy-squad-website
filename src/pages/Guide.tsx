import { useState, useEffect } from 'react';
import { Globe, Crosshair, BookOpen, Newspaper, HelpCircle, ChevronDown, ArrowUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const sections = [
  {
    icon: Globe,
    label: '背景',
    tag: '背景设定',
    items: [
      '《战术小队》(Squad) 是一款50vs50大规模多人战术射击游戏',
      '强调团队协作、通信与战术配合，非传统FPS体验',
      '由Offworld Industries开发，基于虚幻引擎4打造',
    ],
  },
  {
    icon: Crosshair,
    label: '玩法',
    tag: '玩法',
    items: [
      '以小队为单位作战，每队9人，由小队长指挥',
      '建造FOB前线基地，部署兵站与防御工事',
      '兵种体系：步枪兵、医疗兵、轻/重机枪手、反坦克兵、工兵等',
    ],
  },
  {
    icon: BookOpen,
    label: '入门',
    tag: '入门',
    items: [
      '完成训练场教程，熟悉基本操作与射击手感',
      '加入小队后跟随队长指令，保持通信畅通',
      '优先选择步枪兵或医疗兵上手，逐步尝试其他兵种',
    ],
  },
  {
    icon: Newspaper,
    label: '资讯',
    tag: '新闻与更新',
    items: [
      '关注Steam商店页面获取最新版本更新日志',
      '官方Discord频道发布开发进度与社区活动',
      'FY战队群内同步推送重要版本改动与战术分析',
    ],
  },
];

const faqItems = [
  { question: '游戏需要什么配置？', answer: '最低配置：i5-4690 / 8GB内存 / GTX 770。推荐配置：i7-8700K / 16GB内存 / GTX 1060 6GB以上。游戏对CPU单核性能要求较高，建议优先升级CPU。' },
  { question: '必须开麦吗？', answer: '强烈建议使用麦克风。《战术小队》的核心就是沟通与配合，不开麦等于放弃了90%的游戏体验。建议使用头戴式麦克风，避免啸叫。' },
  { question: '新手适合什么服务器？', answer: '推荐先在新手训练服（如FY-TRAIN-01）练习基础操作，熟悉FOB建造、兵种切换和通讯方式，再转正式服务器。FY战队服务器对新兵非常友好。' },
  { question: '如何加入肥鸭战队？', answer: '在官网「加入」页面填写申请表，需附上Steam游戏时长截图。通过初审后将安排面试，面试通过即可入队。入队后请务必阅读队内规章制度。' },
  { question: 'FOB是什么意思？', answer: 'FOB（Forward Operating Base，前方作战基地）是Squad的核心机制之一。玩家通过建造兵站、弹药箱、防御工事来控制区域，是推进战线的关键。' },
  { question: '游戏支持中文吗？', answer: 'Squad官方已支持简体中文界面和字幕。你可以在Steam游戏属性中选择语言为简体中文。部分玩家自制模组可能只有英文版本。' },
];

export default function Guide() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({ 0: true });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <p className="section-label mb-3">战术手册</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">游戏指南</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8 sm:mb-12">从零开始了解《战术小队》</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fy-green-dim/20 mb-8 sm:mb-12">
          {sections.map((sec, index) => (
            <div key={sec.label} className="bg-fy-panel hover:bg-fy-surface transition-colors">
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-4 sm:p-6 flex items-center gap-3"
              >
                <sec.icon className="w-4 h-4 text-fy-amber shrink-0" />
                <span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{sec.label}</span>
                <span className="data-label ml-auto">{sec.tag}</span>
                <ChevronDown
                  className={`w-4 h-4 text-fy-steel/50 transition-transform shrink-0 ${expandedSections[index] ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedSections[index] && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="divider mb-4" />
                  <ul className="space-y-3">
                    {sec.items.map((item, i) => (
                      <li key={i} className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-green-dim/30">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="panel p-4 sm:p-6 hud-corners">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <HelpCircle className="w-4 h-4 text-fy-amber" />
            <span className="section-label">常见问题</span>
          </div>
          <div className="divider mb-4" />
          <div className="space-y-px bg-fy-green-dim/10">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-fy-panel">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-fy-surface transition-colors"
                >
                  <span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider text-left pr-3">Q: {faq.question}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-fy-steel/50 transition-transform shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                    <p className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-amber/30">A: {faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBackTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 bg-fy-amber text-fy-dark flex items-center justify-center hover:bg-fy-amber/80 transition-colors z-40"
          style={{ animation: 'fadeInUp 0.3s ease' }}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
