import { useState } from 'react';
import { Heart, Bookmark, Download, Upload, Image, Video, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Filter = '全部' | '图文' | '视频';
type SortBy = '最新' | '最热' | '最多收藏';

const initialTactics = [
  { id: 1, title: 'Al Basrah 美军进攻路线分析', type: '图文' as const, author: 'FY_Commander', likes: 128, bookmarks: 45 },
  { id: 2, title: 'FOB选址与防御工事教学', type: '视频' as const, author: 'FY_Engineer', likes: 256, bookmarks: 89 },
  { id: 3, title: 'Fallujah 巷战小队配合', type: '图文' as const, author: 'FY_Scout', likes: 97, bookmarks: 34 },
  { id: 4, title: '载具编队与反装甲战术', type: '视频' as const, author: 'FY_Driver', likes: 312, bookmarks: 112 },
  { id: 5, title: 'Narva 俄军防守布阵详解', type: '图文' as const, author: 'FY_Tactical', likes: 85, bookmarks: 28 },
  { id: 6, title: '小队长指挥通信规范', type: '视频' as const, author: 'FY_Commander', likes: 198, bookmarks: 76 },
];

const initialResources = [
  { name: 'FY战术地图标注模板', size: '2.4 MB', format: 'PDF', downloads: 0 },
  { name: '小队长快速参考卡', size: '856 KB', format: 'PNG', downloads: 0 },
  { name: '兵种武器数据表 v4.2', size: '1.1 MB', format: 'XLSX', downloads: 0 },
];

const typeIcon = { '图文': Image, '视频': Video };
const typeColor = { '图文': 'text-fy-amber border-fy-amber/30', '视频': 'text-fy-orange border-fy-orange/30' };

export default function Tactics() {
  const [filter, setFilter] = useState<Filter>('全部');
  const [sortBy, setSortBy] = useState<SortBy>('最新');
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [favCounts, setFavCounts] = useState<Record<number, number>>(
    Object.fromEntries(initialTactics.map((t) => [t.id, t.bookmarks]))
  );
  const [resources, setResources] = useState(initialResources);

  const filters: Filter[] = ['全部', '图文', '视频'];
  const sortOptions: SortBy[] = ['最新', '最热', '最多收藏'];

  const filtered = filter === '全部' ? initialTactics : initialTactics.filter((t) => t.type === filter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === '最热') return b.likes - a.likes;
    if (sortBy === '最多收藏') return (favCounts[b.id] || 0) - (favCounts[a.id] || 0);
    return b.id - a.id;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const isFav = prev[id];
      setFavCounts((counts) => ({ ...counts, [id]: (counts[id] || 0) + (isFav ? -1 : 1) }));
      return { ...prev, [id]: !isFav };
    });
  };

  const handleDownload = (index: number) => {
    setResources((prev) =>
      prev.map((r, i) => (i === index ? { ...r, downloads: r.downloads + 1 } : r))
    );
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <p className="section-label mb-3">TACTICS LIBRARY</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">战术库</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-6 sm:mb-8">战队战术分析与教学资源</p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex gap-px bg-fy-green-dim/20 w-fit">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 font-hud text-xs tracking-wider transition-colors ${filter === f ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-px bg-fy-green-dim/20 w-fit">
            {sortOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-4 py-2 font-hud text-xs tracking-wider transition-colors ${sortBy === s ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-fy-green-dim/20 mb-8 sm:mb-12">
          {sorted.map((t) => {
            const Icon = typeIcon[t.type];
            const color = typeColor[t.type];
            const isFav = favorites[t.id];
            return (
              <div key={t.id} className="bg-fy-panel p-4 sm:p-5 hover:bg-fy-surface transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider group-hover:text-fy-amber transition-colors leading-tight pr-3">
                    {t.title}
                  </h3>
                  <span className={`shrink-0 flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-wider ${color}`}>
                    <Icon className="w-3 h-3" /> {t.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-fy-steel/60 tracking-wider">{t.author}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-fy-steel/50 text-xs">
                      <Heart className="w-3 h-3" /> {t.likes}
                    </span>
                    <button
                      onClick={() => toggleFavorite(t.id)}
                      className="flex items-center gap-1 text-xs transition-colors"
                    >
                      <Bookmark className={`w-3 h-3 transition-colors ${isFav ? 'text-fy-red fill-fy-red' : 'text-fy-steel/50'}`} />
                      <span className={isFav ? 'text-fy-red' : 'text-fy-steel/50'}>{favCounts[t.id] || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20">
          <div className="md:col-span-2 bg-fy-panel p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Download className="w-4 h-4 text-fy-amber" />
              <span className="section-label">RESOURCES</span>
            </div>
            <div className="divider mb-4" />
            <ul className="space-y-3">
              {resources.map((r, i) => (
                <li key={r.name} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-fy-green-dim/20 last:border-0 gap-2 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-fy-steel/40" />
                    <span className="text-white text-xs">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-3 pl-7 sm:pl-0">
                    <span className="font-mono text-[10px] text-fy-steel/50">{r.size}</span>
                    <span className="font-mono text-[10px] text-fy-steel/50 border border-fy-green-dim/30 px-1.5 py-0.5">{r.format}</span>
                    <span className="font-mono text-[10px] text-fy-steel/50">{r.downloads}次</span>
                    <button onClick={() => handleDownload(i)} className="font-hud text-[10px] text-fy-amber tracking-wider hover:text-white transition-colors">下载</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-fy-panel p-4 sm:p-6 flex flex-col items-center justify-center text-center">
            <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-fy-amber/40 mb-3 sm:mb-4" />
            <h3 className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider mb-2">分享你的战术</h3>
            <p className="text-fy-steel text-xs mb-4 sm:mb-6">上传图文或视频，帮助队友提升</p>
            <button className="btn-outline text-xs py-2 px-4">上传资源</button>
          </div>
        </div>
      </div>
    </div>
  );
}
