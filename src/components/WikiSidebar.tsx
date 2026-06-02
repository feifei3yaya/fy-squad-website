import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface SidebarItem {
  id: string
  label: string
  tag?: string
}

interface WikiSidebarProps {
  items: SidebarItem[]
  selectedId: string
  onSelect: (id: string) => void
  title: string
  groupBy?: (item: SidebarItem) => string
}

export default function WikiSidebar({
  items,
  selectedId,
  onSelect,
  title,
  groupBy,
}: WikiSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const groups = new Map<string, SidebarItem[]>()
  if (groupBy) {
    items.forEach((item) => {
      const key = groupBy(item)
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(item)
    })
  }

  const renderList = () => {
    if (!groupBy) {
      return items.map((item) => (
        <button
          key={item.id}
          onClick={() => { onSelect(item.id); setMobileOpen(false) }}
          className={`w-full text-left px-3 py-2 text-xs tracking-wider transition-colors font-hud ${
            selectedId === item.id
              ? 'bg-fy-amber text-fy-dark font-semibold'
              : 'text-fy-steel hover:bg-fy-surface hover:text-white'
          }`}
        >
          {item.label}
          {item.tag && <span className="ml-2 text-fy-steel/50 text-[10px] font-mono">{item.tag}</span>}
        </button>
      ))
    }

    return Array.from(groups.entries()).map(([group, groupItems]) => (
      <div key={group} className="mb-2">
        <div className="px-3 py-1.5 text-[10px] text-fy-steel/40 font-mono tracking-[0.2em] uppercase">
          {group}
        </div>
        {groupItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { onSelect(item.id); setMobileOpen(false) }}
            className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors font-hud ${
              selectedId === item.id
                ? 'bg-fy-amber text-fy-dark font-semibold'
                : 'text-fy-steel hover:bg-fy-surface hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    ))
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden w-full mb-4 px-4 py-2 bg-fy-panel border border-fy-green-dim/20 flex items-center justify-between text-fy-steel hover:text-fy-amber transition-colors"
      >
        <span className="font-hud text-xs tracking-wider">{title} · 目录</span>
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-20 bg-fy-panel border border-fy-green-dim/20 p-1 max-h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="px-3 py-2 text-[10px] text-fy-steel/40 font-mono tracking-[0.2em] uppercase border-b border-fy-green-dim/20 mb-1">
            {title}
          </div>
          {renderList()}
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden mb-4 bg-fy-panel border border-fy-green-dim/20 p-1">
          {renderList()}
        </div>
      )}
    </>
  )
}
