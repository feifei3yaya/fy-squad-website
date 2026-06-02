import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from './PageHeader'
import WikiSidebar from './WikiSidebar'

interface SidebarItem {
  id: string
  label: string
  tag?: string
}

interface WikiLayoutProps {
  label: string
  pageTitle: string
  pageDesc: string
  sidebarTitle: string
  sidebarItems: SidebarItem[]
  selectedId: string
  onSelect: (id: string) => void
  groupBy?: (item: SidebarItem) => string
  backTo?: string
  backLabel?: string
  children: React.ReactNode
}

export default function WikiLayout({
  label,
  pageTitle,
  pageDesc,
  sidebarTitle,
  sidebarItems,
  selectedId,
  onSelect,
  groupBy,
  backTo = '/wiki',
  backLabel = '返回百科',
  children,
}: WikiLayoutProps) {
  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <div className="flex items-center gap-3 mb-8">
          <Link
            to={backTo}
            className="flex items-center gap-1.5 text-fy-steel/50 hover:text-fy-amber transition-colors font-hud text-xs tracking-wider"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">{backLabel}</span>
          </Link>
          <span className="text-fy-steel/30">/</span>
          <p className="section-label">{label}</p>
        </div>

        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">{pageTitle}</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8">{pageDesc}</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <WikiSidebar
            items={sidebarItems}
            selectedId={selectedId}
            onSelect={onSelect}
            title={sidebarTitle}
            groupBy={groupBy}
          />
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
