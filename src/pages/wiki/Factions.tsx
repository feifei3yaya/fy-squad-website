import { useState } from 'react'
import { Flag } from 'lucide-react'
import WikiLayout from '../../components/WikiLayout'
import { factions } from '../../data/wiki'

export default function Factions() {
  const [selectedId, setSelectedId] = useState(factions[0].id)
  const selected = factions.find((f) => f.id === selectedId) || factions[0]
  const sidebarItems = factions.map((f) => ({ id: f.id, label: f.name, tag: f.flag }))
  return (
    <WikiLayout label="FACTIONS" pageTitle="阵营档案" pageDesc="Squad 各阵营装备特色与战术风格" sidebarTitle="阵营目录" sidebarItems={sidebarItems} selectedId={selectedId} onSelect={setSelectedId}>
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Flag className="w-5 h-5 text-fy-amber" /><div><h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.name}</h2><div className="flex items-center gap-2 mt-1"><span className="font-mono text-[10px] text-fy-steel border border-fy-green-dim/30 px-2 py-0.5">{selected.flag}</span><span className="font-mono text-[10px] text-fy-amber tracking-wider">{selected.nameEn}</span></div></div></div>
          <div className="divider mb-4" /><p className="text-fy-steel text-xs leading-relaxed">{selected.description}</p>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <p className="section-label mb-4">FORCE COMPOSITION</p>
          <div className="grid grid-cols-2 gap-px bg-fy-green-dim/20">
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">代表武器</div><div className="text-fy-steel text-xs">{selected.weapons}</div></div>
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">代表载具</div><div className="text-fy-steel text-xs">{selected.vehicles}</div></div>
            <div className="bg-fy-dark/50 p-4 col-span-2"><div className="data-label mb-1">战术优势</div><div className="text-fy-amber text-xs font-hud tracking-wider">{selected.strength}</div></div>
          </div>
        </div>
      </div>
    </WikiLayout>
  )
}
