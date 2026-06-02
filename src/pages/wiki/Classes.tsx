import { useState } from 'react'
import { Users, Crosshair, Lightbulb } from 'lucide-react'
import WikiLayout from '../../components/WikiLayout'
import { classes } from '../../data/wiki'

export default function Classes() {
  const [selectedId, setSelectedId] = useState(classes[0].id)
  const selected = classes.find((c) => c.id === selectedId) || classes[0]
  const sidebarItems = classes.map((c) => ({ id: c.id, label: c.name }))
  return (
    <WikiLayout label="KIT ROLES" pageTitle="兵种手册" pageDesc="Squad 各兵种详细说明与战术指南" sidebarTitle="兵种目录" sidebarItems={sidebarItems} selectedId={selectedId} onSelect={setSelectedId}>
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4"><Users className="w-5 h-5 text-fy-amber" /><div><h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.name}</h2><span className="font-mono text-[10px] text-fy-steel/50">{selected.faction}</span></div></div>
          <div className="divider mb-4" /><p className="text-fy-steel text-xs leading-relaxed">{selected.description}</p>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4"><Crosshair className="w-4 h-4 text-fy-amber" /><span className="section-label">LOADOUT</span></div>
          <div className="divider mb-4" />
          <div className="space-y-2">{selected.weapons.map((w, i) => (<div key={i} className="flex items-center gap-2 text-fy-steel text-xs"><span className="w-1 h-1 bg-fy-amber/50 shrink-0" />{w}</div>))}</div>
          <div className="divider my-4" />
          <div className="space-y-2">{selected.equipment.map((eq, i) => (<div key={i} className="flex items-center gap-2 text-fy-steel text-xs"><span className="w-1 h-1 bg-fy-green/50 shrink-0" />{eq}</div>))}</div>
        </div>
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-fy-amber" /><span className="section-label">TACTICAL TIPS</span></div>
          <div className="divider mb-4" /><ul className="space-y-3">{selected.tips.map((tip, i) => (<li key={i} className="text-fy-steel text-xs leading-relaxed pl-3 border-l border-fy-amber/30">{tip}</li>))}</ul>
        </div>
      </div>
    </WikiLayout>
  )
}
