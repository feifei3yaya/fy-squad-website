import { useState } from 'react'
import { Crosshair } from 'lucide-react'
import WikiLayout from '../../components/WikiLayout'
import { weapons } from '../../data/wiki'

export default function Weapons() {
  const [selectedId, setSelectedId] = useState(weapons[0].id)
  const selected = weapons.find((w) => w.id === selectedId) || weapons[0]

  const sidebarItems = weapons.map((w) => ({ id: w.id, label: w.name, tag: w.factionTag }))

  return (
    <WikiLayout
      label="WEAPONS"
      pageTitle="武器图鉴"
      pageDesc="Squad 各阵营武器参数与详解"
      sidebarTitle="武器目录"
      sidebarItems={sidebarItems}
      selectedId={selectedId}
      onSelect={setSelectedId}
      groupBy={(item) => weapons.find((x) => x.id === item.id)?.faction ?? ''}
    >
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Crosshair className="w-5 h-5 text-fy-amber" />
            <div>
              <h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-[10px] text-fy-steel border border-fy-green-dim/30 px-2 py-0.5">{selected.factionTag}</span>
                <span className="font-mono text-[10px] text-fy-amber border border-fy-amber/30 px-2 py-0.5">{selected.type}</span>
              </div>
            </div>
          </div>
          <div className="divider mb-4" />
          <p className="text-fy-steel text-xs leading-relaxed">{selected.description}</p>
        </div>

        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners p-6 sm:p-8">
          <p className="section-label mb-4">SPECIFICATIONS</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-fy-green-dim/20">
            <div className="bg-fy-dark/50 p-4 text-center">
              <div className="data-value text-lg sm:text-xl">{selected.damage}</div>
              <div className="data-label mt-1">伤害</div>
            </div>
            <div className="bg-fy-dark/50 p-4 text-center">
              <div className="data-value text-lg sm:text-xl">{selected.fireRate}</div>
              <div className="data-label mt-1">射速</div>
            </div>
            <div className="bg-fy-dark/50 p-4 text-center">
              <div className="data-value text-lg sm:text-xl">{selected.magazineSize}</div>
              <div className="data-label mt-1">弹匣</div>
            </div>
            <div className="bg-fy-dark/50 p-4 text-center">
              <div className="data-value text-lg sm:text-xl">{selected.caliber}</div>
              <div className="data-label mt-1">口径</div>
            </div>
          </div>
        </div>
      </div>
    </WikiLayout>
  )
}
