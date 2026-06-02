import { useState } from 'react'
import { Truck } from 'lucide-react'
import WikiLayout from '../../components/WikiLayout'
import { vehicles } from '../../data/wiki'

export default function Vehicles() {
  const [selectedId, setSelectedId] = useState(vehicles[0].id)
  const selected = vehicles.find((v) => v.id === selectedId) || vehicles[0]
  const sidebarItems = vehicles.map((v) => ({ id: v.id, label: v.name, tag: v.factionTag }))
  return (
    <WikiLayout label="VEHICLES" pageTitle="载具百科" pageDesc="Squad 各阵营载具数据与使用指南" sidebarTitle="载具目录" sidebarItems={sidebarItems} selectedId={selectedId} onSelect={setSelectedId} groupBy={(item) => vehicles.find((x) => x.id === item.id)?.category ?? ''}>
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Truck className="w-5 h-5 text-fy-amber" /><div><h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.name}</h2><div className="flex items-center gap-2 mt-1"><span className="font-mono text-[10px] text-fy-steel border border-fy-green-dim/30 px-2 py-0.5">{selected.factionTag}</span><span className="font-mono text-[10px] text-fy-amber border border-fy-amber/30 px-2 py-0.5">{selected.type}</span></div></div></div>
          <div className="divider mb-4" /><p className="text-fy-steel text-xs leading-relaxed">{selected.description}</p>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <p className="section-label mb-4">SPECIFICATIONS</p>
          <div className="grid grid-cols-2 gap-px bg-fy-green-dim/20">
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">分类</div><div className="text-fy-steel text-xs">{selected.category}</div></div>
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">乘员</div><div className="text-fy-steel text-xs">{selected.crew}</div></div>
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">武装</div><div className="text-fy-steel text-xs">{selected.armament}</div></div>
            <div className="bg-fy-dark/50 p-4"><div className="data-label mb-1">装甲</div><div className="text-fy-steel text-xs">{selected.armor}</div></div>
          </div>
        </div>
      </div>
    </WikiLayout>
  )
}
