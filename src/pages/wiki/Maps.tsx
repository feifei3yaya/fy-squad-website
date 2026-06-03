import { useState } from 'react'
import WikiLayout from '../../components/WikiLayout'
import { maps } from '../../data/wiki'

export default function Maps() {
  const [selectedId, setSelectedId] = useState(maps[0].id)
  const selected = maps.find((m) => m.id === selectedId) || maps[0]

  const sidebarItems = maps.map((m) => ({ id: m.id, label: m.nameZh }))

  return (
    <WikiLayout
      label="MAPS"
      pageTitle="地图图鉴"
      pageDesc="Squad 全部战场地图详情与攻略要点"
      sidebarTitle="地图目录"
      sidebarItems={sidebarItems}
      selectedId={selectedId}
      onSelect={setSelectedId}
    >
      <div className="space-y-6">
        <div className="bg-fy-panel border border-fy-green-dim/20 hud-corners overflow-hidden">
          <div className="aspect-video bg-fy-dark relative overflow-hidden">
            <img
              src={`/src/assets/squadmaps/${selected.image}`}
              alt={selected.name}
              className="w-full h-full object-contain bg-fy-dark"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fy-dark/80 to-transparent p-4 sm:p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-hud font-bold text-white text-xl sm:text-2xl tracking-wider">{selected.nameZh}</h2>
                  <p className="font-hud text-fy-steel/50 text-xs tracking-[0.2em] mt-1">{selected.name}</p>
                </div>
                <span className="font-mono text-[10px] text-fy-amber border border-fy-amber/30 px-2 py-1">{selected.size}</span>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-fy-steel text-xs leading-relaxed mb-4">{selected.description}</p>
            <div className="grid grid-cols-2 gap-px bg-fy-green-dim/20">
              <div className="bg-fy-dark/50 p-4">
                <div className="data-label mb-1">生态环境</div>
                <div className="text-fy-steel text-xs">{selected.biomes}</div>
              </div>
              <div className="bg-fy-dark/50 p-4">
                <div className="data-label mb-1">支持模式</div>
                <div className="text-fy-steel text-xs">{selected.layers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WikiLayout>
  )
}
