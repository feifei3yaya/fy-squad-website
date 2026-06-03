import { useState, useEffect, useRef } from 'react';
import { Target, Users, Award, Shield, Crosshair, Trophy, Star, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const milestones = [
  { year: '2024.01', title: '战队成立', desc: '肥鸭战队正式成立' },
  { year: '2024.03', title: '首个服务器', desc: 'FY #1 公开服上线' },
  { year: '2024.09', title: '首次赛事', desc: '社区杯赛八强' },
  { year: '2025.01', title: '一周年', desc: '成员突破100人' },
  { year: '2025.06', title: '三服同开', desc: '公开服·训练服·赛事服' },
  { year: '2026.01', title: '社区网站', desc: '官方网站正式上线' },
];

const values = [
  {
    icon: Target,
    title: '专业战术',
    desc: '系统化战术训练与实战演练，持续提升团队作战能力',
    detail: '我们建立了完整的战术体系，从基础步兵战术到装甲协同作战，每周定期组织战术研讨和实战演练。每位成员都能在系统中找到自己的定位，从步枪手到指挥官，层层递进、步步为营。',
  },
  {
    icon: Users,
    title: '团队协作',
    desc: '强调沟通配合与集体荣誉，一人不落全员进退',
    detail: '在FY，团队永远高于个人。我们注重小队内的默契配合，更强调跨小队的战略协同。无论是攻城拔寨还是防守据点，每个成员都是不可或缺的一环。我们坚信：没有最强的个人，只有最强的团队。',
  },
  {
    icon: Award,
    title: '公平竞技',
    desc: '拒绝外挂，维护游戏公平，营造健康竞技环境',
    detail: '公平是竞技的基石。FY对一切作弊行为零容忍，我们积极配合EAC反作弊系统，建立了完善的内部监督机制。我们相信，真正的胜利来自实力与配合，而非任何捷径。为每一位玩家提供干净的游戏环境，是我们不变的承诺。',
  },
];

const management = [
  { name: 'FY_Duck', role: '战队队长', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duck', onlineHours: 2860, joinDate: '2024年1月' },
  { name: 'FY_Tactical', role: '战术指挥', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tactical', onlineHours: 2340, joinDate: '2024年2月' },
  { name: 'FY_Commander', role: '训练教官', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Commander', onlineHours: 1980, joinDate: '2024年3月' },
  { name: 'FY_Scout', role: '赛事管理', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Scout', onlineHours: 1560, joinDate: '2024年5月' },
];

const honors = [
  '2024 社区杯赛八强',
  '2025 联赛积分榜 TOP 3',
  '2025 社区最佳战队提名',
  '2025 赛季 MVP — FY_Tactical',
  '2026 新年邀请赛冠军',
  '累计服务玩家 10,000+',
];

// 里程碑项滑入动画组件
function MilestoneItem({ m, isLast, index }: { m: typeof milestones[0]; isLast: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex gap-4 sm:gap-6 md:gap-12 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-700 ease-out ${
        isLast ? '' : 'divider'
      } ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className="font-mono text-fy-amber text-xs sm:text-sm w-16 sm:w-20 flex-shrink-0 pt-0.5">{m.year}</span>
      <div>
        <h4 className="font-hud font-semibold text-white text-sm sm:text-base tracking-wider">{m.title}</h4>
        <p className="text-fy-steel/50 text-xs sm:text-sm mt-0.5">{m.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  // 核心价值观展开状态
  const [expandedValue, setExpandedValue] = useState<number | null>(null);

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/team.jpg)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-fy-dark via-fy-dark/70 to-fy-dark/30" />
        <div className="absolute inset-0 bg-grid-overlay bg-grid-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 max-w-6xl mx-auto">
          <PageHeader className="mb-6 sm:mb-8" />
          <p className="section-label mb-3 sm:mb-4">ABOUT US</p>
          <h1 className="page-title text-3xl sm:text-4xl md:text-5xl">肥鸭战队</h1>
          <p className="font-hud text-fy-amber text-base sm:text-xl tracking-[0.2em] sm:tracking-[0.3em] mt-2">FEI YA SQUAD</p>
        </div>
      </div>

      {/* 战队口号横幅 */}
      <div className="border-y border-fy-amber/20 bg-fy-amber/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 text-center">
          <p className="font-hud text-fy-amber/80 text-sm sm:text-base md:text-lg tracking-[0.3em] sm:tracking-[0.5em]">
            公平竞技 · 团队协作 · 战术至上
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-3xl mb-12 sm:mb-20">
          <p className="text-fy-steel/80 text-sm sm:text-lg leading-relaxed">
            肥鸭战队（FY）成立于2024年，是一支专注于《战术小队》（Squad）的综合性战队。
            我们秉持"公平竞技、团队协作、战术至上"的理念，致力于为玩家提供专业、公平、有趣的游戏体验。
            无论你是刚接触游戏的新兵，还是久经沙场的老兵，FY 都有属于你的位置。
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 px-1">
          <Shield className="w-4 h-4 text-fy-amber" />
          <span className="section-label">CORE VALUES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20 mb-16 sm:mb-24">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-fy-panel p-5 sm:p-8 hud-corners hover:bg-fy-surface transition-colors group cursor-pointer"
              onClick={() => setExpandedValue(expandedValue === i ? null : i)}
            >
              <v.icon className="w-5 h-5 sm:w-6 sm:h-6 text-fy-amber/70 mb-3 sm:mb-4 group-hover:text-fy-amber transition-colors" />
              <h3 className="font-hud font-semibold text-white text-base sm:text-lg tracking-wider mb-2">{v.title}</h3>
              <p className="text-fy-steel/60 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              {/* 展开/收起详细描述 */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  expandedValue === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-fy-steel/50 text-xs sm:text-sm leading-relaxed border-t border-fy-green-dim/20 pt-3">
                  {v.detail}
                </p>
              </div>
              {/* 展开/收起指示器 */}
              <div className={`mt-3 flex justify-center transition-transform duration-300 ${expandedValue === i ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-3.5 h-3.5 text-fy-steel/30 group-hover:text-fy-steel/50 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6 px-1">
          <Crosshair className="w-4 h-4 text-fy-amber" />
          <span className="section-label">MILESTONES</span>
        </div>
        <div className="panel p-0 mb-16 sm:mb-24">
          {milestones.map((m, i) => (
            <MilestoneItem key={m.year} m={m} isLast={i === milestones.length - 1} index={i} />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6 px-1">
          <Star className="w-4 h-4 text-fy-amber" />
          <span className="section-label">MANAGEMENT</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-fy-green-dim/20 mb-16 sm:mb-24">
          {management.map((m) => (
            <div key={m.name} className="bg-fy-panel p-4 sm:p-6 text-center hover:bg-fy-surface transition-colors group relative">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 border border-fy-green-dim/30 bg-fy-surface" />
              <h4 className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{m.name}</h4>
              <p className="data-label mt-1 text-[10px] sm:text-xs">{m.role}</p>
              {/* Hover时显示更多信息 */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="border-t border-fy-green-dim/20 pt-3 space-y-1">
                  <p className="font-mono text-fy-amber/60 text-[10px] tracking-wider">在线时长: {m.onlineHours}小时</p>
                  <p className="font-mono text-fy-amber/60 text-[10px] tracking-wider">加入时间: {m.joinDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6 px-1">
          <Trophy className="w-4 h-4 text-fy-amber" />
          <span className="section-label">HONOR WALL</span>
        </div>
        <div className="panel p-0">
          {honors.map((h, i) => (
            <div key={i} className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 ${i < honors.length - 1 ? 'divider' : ''}`}>
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fy-amber/50 flex-shrink-0" />
              <span className="text-white/80 text-xs sm:text-sm">{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
