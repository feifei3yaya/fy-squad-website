import { useState } from 'react'
import { Swords, Lightbulb, List } from 'lucide-react'
import WikiLayout from '../../components/WikiLayout'
import { modes } from '../../data/wiki'

export default function Modes() {
  const [selectedId, setSelectedId] = useState(modes[0].id)
  const selected = modes.find((m) => m.id === selectedId) || modes[0]
  const sidebarItems = modes.map((m) => ({ id: m.id, label: m.name }))
  return (
    <WikiLayout label="GAME MODES" pageTitle="模式规则" pageDesc="Squad 全部游戏模式详解与制胜策略" sidebarTitle="模式目录" sidebarItems={sidebarItems} selectedId={selectedId} onSelect={setSelectedId}>
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Swords className="w-5 h-5 text-fy-amber" /><div><h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.name}</h2><p className="font-hud text-fy-steel/50 text-xs tracking-[0.2em] mt-1">{selected.nameZh}</p></div></div>
          <div className="divider mb-4" /><p className="text-fy-steel text-xs leading-relaxed">{selected.description}</p>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4"><List className="w-4 h-4 text-fy-amber" /><span className="section-label">WIN CONDITION</span></div>
          <div className="divider mb-4" /><p className="text-fy-steel text-xs leading-relaxed">{selected.winCondition}</p>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <p className="section-label mb-4">FEATURES</p><div className="divider mb-4" />
          <ul className="space-y-2">{selected.features.map((f, i) => (<li key={i} className="flex items-center gap-2 text-fy-steel text-xs"><span className="w-1 h-1 bg-fy-amber/50 shrink-0" />{f}</li>))}</ul>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-fy-amber" /><span className="section-label">TACTICAL TIPS</span></div>
          <div className="divider mb-4" /><ul className="space-y-3">{selected.tips.map((tip, i) => (<li key={i} className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-amber/30">{tip}</li>))}</ul>
        </div>
      </div>
    </WikiLayout>
  )
}
