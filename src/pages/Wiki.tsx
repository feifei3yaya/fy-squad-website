import { Link } from 'react-router-dom'
import { Crosshair, Users, Truck, Map, Flag, Swords, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { wikiStats } from '../data/wiki'

const categories = [
  { key: 'weapons', path: '/wiki/weapons', title: '武器图鉴', enTitle: '武器', icon: Crosshair, desc: '各阵营武器参数详解', count: wikiStats.weapons, color: 'text-fy-amber' },
  { key: 'classes', path: '/wiki/classes', title: '兵种手册', enTitle: '兵种', icon: Users, desc: '兵种技能与职责说明', count: wikiStats.classes, color: 'text-fy-info' },
  { key: 'vehicles', path: '/wiki/vehicles', title: '载具百科', enTitle: '载具', icon: Truck, desc: '陆海空载具数据手册', count: wikiStats.vehicles, color: 'text-fy-orange-hc' },
  { key: 'maps', path: '/wiki/maps', title: '地图图鉴', enTitle: '地图', icon: Map, desc: '全部战场地图与攻略', count: wikiStats.maps, color: 'text-fy-silver' },
  { key: 'factions', path: '/wiki/factions', title: '阵营档案', enTitle: '阵营', icon: Flag, desc: '各阵营装备与特色', count: wikiStats.factions, color: 'text-fy-red-hc' },
  { key: 'modes', path: '/wiki/modes', title: '模式规则', enTitle: '游戏模式', icon: Swords, desc: '游戏模式机制详解', count: wikiStats.modes, color: 'text-fy-steel' },
]

export default function Wiki() {
  return (
    <div className="bg-fy-dark min-h-screen">
      <SEO
        title="游戏百科"
        description="战术小队（Squad）完整知识库 — 武器图鉴、兵种手册、载具百科、地图图鉴、阵营档案、游戏模式规则，从入门到精通的必备参考。"
        keywords="Squad百科,战术小队百科,Squad武器,Squad兵种,Squad载具,Squad地图,战术小队攻略,Squad模式"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <p className="section-label mb-3">百科数据库</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">游戏百科</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8 sm:mb-12">
          战术小队（Squad）完整知识库，从入门到精通的必备参考
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={cat.path}
              className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8 hover:bg-fy-surface hover:border-fy-amber/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <cat.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${cat.color} mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`} />
              <h2 className="font-hud font-bold text-white text-lg sm:text-xl tracking-wider mb-1">{cat.title}</h2>
              <p className="font-hud text-[10px] text-fy-steel/50 tracking-[0.2em] mb-3">{cat.enTitle}</p>
              <p className="text-fy-steel text-xs leading-relaxed mb-4 sm:mb-5">{cat.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-fy-green-dim/20">
                <span className="font-mono text-[10px] text-fy-steel/50">{cat.count} 个条目</span>
                <span className="flex items-center gap-1 font-hud text-[10px] tracking-wider text-fy-amber/60 group-hover:text-fy-amber transition-colors">
                  浏览全部 <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 bg-fy-panel border border-fy-green-dim/20 p-6 sm:p-8 hud-corners">
          <p className="section-label mb-4">外部资源</p>
          <p className="text-fy-steel text-xs mb-4">以下为 Squad 官方与社区 Wiki，提供更详尽的游戏数据参考：</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="https://www.joinsquad.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-fy-dark/50 border border-fy-green-dim/20 hover:border-fy-amber/30 transition-colors text-fy-steel hover:text-fy-amber text-xs">
              <span className="font-hud tracking-wider">Squad 官网</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </a>
            <a href="https://squad.fandom.com/wiki/Squad_Wiki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-fy-dark/50 border border-fy-green-dim/20 hover:border-fy-amber/30 transition-colors text-fy-steel hover:text-fy-amber text-xs">
              <span className="font-hud tracking-wider">Squad Wiki 社区</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </a>
            <a href="https://sigua.qq.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 bg-fy-dark/50 border border-fy-green-dim/20 hover:border-fy-amber/30 transition-colors text-fy-steel hover:text-fy-amber text-xs">
              <span className="font-hud tracking-wider">战术小队国服官网</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
