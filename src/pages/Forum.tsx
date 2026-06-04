import { useState, useMemo } from 'react';
import { Pin, Flame, MessageSquare, Eye, Plus, Hash, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const boards = [
  { id: 1, name: '公告通知', count: 156 },
  { id: 2, name: '战术交流', count: 892 },
  { id: 3, name: '队内闲聊', count: 2341 },
  { id: 4, name: '新人报到', count: 445 },
  { id: 5, name: '赛事活动', count: 67 },
  { id: 6, name: '问题反馈', count: 123 },
  { id: 7, name: '资源分享', count: 334 },
  { id: 8, name: '游戏讨论', count: 567 },
];

const posts = [
  { id: 1, title: '【重要】6月招募计划正式启动', author: 'FY_Duck', replies: 56, views: 2341, pinned: true, essence: true, board: '公告通知' },
  { id: 2, title: '【维护】服务器6月1日凌晨维护', author: 'FY_Duck', replies: 12, views: 1567, pinned: true, essence: false, board: '公告通知' },
  { id: 3, title: 'Al Basrah 步兵战术攻略', author: 'FY_Tactical', replies: 43, views: 1876, pinned: false, essence: true, board: '战术交流' },
  { id: 4, title: '载具协同作战技巧分享', author: 'FY_Driver', replies: 34, views: 892, pinned: false, essence: false, board: '战术交流' },
  { id: 5, title: '今晚队内友谊赛，有人来吗？', author: 'FY_Gamer', replies: 28, views: 456, pinned: false, essence: false, board: '队内闲聊' },
  { id: 6, title: '新人报到！来自广州的Squad玩家', author: 'FY_Newbie', replies: 15, views: 234, pinned: false, essence: false, board: '新人报到' },
  { id: 7, title: '赛事服规则更新说明 v2.1', author: 'FY_Scout', replies: 8, views: 345, pinned: false, essence: false, board: '赛事活动' },
  { id: 8, title: '服务器延迟问题反馈', author: 'FY_Medic', replies: 22, views: 567, pinned: false, essence: false, board: '问题反馈' },
];

const hotPosts = [
  { title: '6月招募计划正式启动', views: 2341 },
  { title: 'Al Basrah 步兵战术攻略', views: 1876 },
  { title: '服务器6月1日凌晨维护', views: 1567 },
  { title: '服务器延迟问题反馈', views: 567 },
  { title: '载具协同作战技巧分享', views: 892 },
];

const PAGE_SIZE = 5;

export default function Forum() {
  const [activeBoard, setActiveBoard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBoard, setNewPostBoard] = useState(boards[0].name);
  const [newPostContent, setNewPostContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = activeBoard
      ? posts.filter((p) => p.board === boards.find((b) => b.id === activeBoard)?.name)
      : posts;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    return result;
  }, [activeBoard, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleBoardChange = (id: number | null) => {
    setActiveBoard(id);
    setCurrentPage(1);
  };

  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    setShowNewPost(false);
    setNewPostTitle('');
    setNewPostBoard(boards[0].name);
    setNewPostContent('');
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PageHeader className="mb-6 sm:mb-8" />

        <div className="flex items-center gap-3 mb-2 px-1">
          <MessageSquare className="w-4 h-4 text-fy-amber" />
          <span className="section-label">论坛</span>
        </div>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8">肥鸭论坛</h1>

        {/* 搜索框 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fy-steel/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="搜索帖子标题..."
            className="w-full bg-fy-panel border border-fy-green-dim/20 pl-10 pr-9 py-2.5 font-hud text-xs text-white placeholder:text-fy-steel/30 outline-none focus:border-fy-amber/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fy-steel/40 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-px bg-fy-green-dim/20 mb-8">
          <button
            onClick={() => handleBoardChange(null)}
            className={`px-4 py-2 font-hud text-xs tracking-wider transition-colors ${activeBoard === null ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface hover:text-white'}`}
          >
            全部
          </button>
          {boards.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBoardChange(b.id)}
              className={`px-4 py-2 font-hud text-xs tracking-wider transition-colors ${activeBoard === b.id ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface hover:text-white'}`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="panel p-0">
              {filteredPosts.length === 0 && (
                <div className="px-4 sm:px-6 py-8 sm:py-12 text-center text-fy-steel/40 font-hud text-sm tracking-wider">
                  {searchQuery ? '未找到匹配的帖子' : '该板块暂无帖子'}
                </div>
              )}
              {paginatedPosts.map((post, i) => (
                <div
                  key={post.id}
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 hover:bg-fy-surface/50 transition-colors cursor-pointer group ${i < paginatedPosts.length - 1 ? 'divider' : ''}`}
                >
                  <div className="flex gap-1.5 sm:gap-2 w-8 sm:w-10 flex-shrink-0">
                    {post.pinned && <Pin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fy-orange-hc" />}
                    {post.essence && <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fy-amber" />}
                    {!post.pinned && !post.essence && <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fy-green-hc-dim" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white/90 text-xs sm:text-sm group-hover:text-fy-amber transition-colors truncate">{post.title}</h4>
                    <p className="text-fy-steel/40 text-[10px] sm:text-xs font-mono mt-0.5">{post.author}</p>
                  </div>
                  {/* 移动端也显示回复数和浏览数，使用更小字号 */}
                  <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
                    <span className="flex items-center gap-0.5 sm:gap-1 text-fy-steel/40 text-[10px] sm:text-xs font-mono">
                      <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {post.replies}
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1 text-fy-steel/40 text-[10px] sm:text-xs font-mono">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {post.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 px-1">
                <span className="font-mono text-fy-steel/40 text-[10px] sm:text-xs">
                  第 {safeCurrentPage} / {totalPages} 页
                </span>
                <div className="flex gap-px bg-fy-green-dim/20">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safeCurrentPage <= 1}
                    className="flex items-center gap-1 px-3 py-2 font-hud text-xs tracking-wider transition-colors bg-fy-panel text-fy-steel hover:bg-fy-surface hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-fy-panel disabled:hover:text-fy-steel"
                  >
                    <ChevronLeft className="w-3 h-3" /> 上一页
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safeCurrentPage >= totalPages}
                    className="flex items-center gap-1 px-3 py-2 font-hud text-xs tracking-wider transition-colors bg-fy-panel text-fy-steel hover:bg-fy-surface hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-fy-panel disabled:hover:text-fy-steel"
                  >
                    下一页 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-72 space-y-4">
            <div className="panel p-0">
              <div className="px-4 sm:px-5 py-3 border-b border-fy-green-dim/20">
                <span className="section-label">热门帖子</span>
              </div>
              {hotPosts.map((p, i) => (
                <div key={i} className={`flex items-start gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-fy-surface/50 transition-colors cursor-pointer ${i < hotPosts.length - 1 ? 'divider' : ''}`}>
                  <span className={`font-hud font-bold text-xs sm:text-sm w-4 sm:w-5 flex-shrink-0 ${i < 3 ? 'text-fy-amber' : 'text-fy-steel/30'}`}>
                    {i + 1}
                  </span>
                  <p className="text-fy-steel/70 text-xs leading-relaxed hover:text-fy-amber transition-colors">{p.title}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowNewPost(true)}
              className="w-full btn-amber flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 发布新帖
            </button>
          </div>
        </div>
      </div>

      {/* 发帖弹窗 */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6">
          <div className="bg-fy-dark border border-fy-green-dim/30 p-5 sm:p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-fy-amber" />
                <h3 className="font-hud font-semibold text-white text-lg tracking-wider">发布新帖</h3>
              </div>
              <button onClick={() => setShowNewPost(false)} className="text-fy-steel/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="data-label mb-2 block">帖子标题</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="输入帖子标题..."
                  className="w-full bg-fy-panel border border-fy-green-dim/20 px-4 py-2.5 font-hud text-xs text-white placeholder:text-fy-steel/30 outline-none focus:border-fy-amber/50 transition-colors"
                />
              </div>

              <div>
                <label className="data-label mb-2 block">所属板块</label>
                <select
                  value={newPostBoard}
                  onChange={(e) => setNewPostBoard(e.target.value)}
                  className="w-full bg-fy-panel border border-fy-green-dim/20 px-4 py-2.5 font-hud text-xs text-white outline-none focus:border-fy-amber/50 transition-colors appearance-none cursor-pointer"
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="data-label mb-2 block">帖子内容</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="输入帖子内容..."
                  rows={5}
                  className="w-full bg-fy-panel border border-fy-green-dim/20 px-4 py-2.5 font-hud text-xs text-white placeholder:text-fy-steel/30 outline-none focus:border-fy-amber/50 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-px bg-fy-green-dim/20 mt-6">
              <button
                onClick={() => setShowNewPost(false)}
                className="flex-1 py-2.5 bg-fy-panel font-hud text-xs tracking-wider text-fy-steel hover:bg-fy-surface hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleNewPost}
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
                className="flex-1 py-2.5 bg-fy-amber font-hud text-xs tracking-wider text-fy-dark font-semibold hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-fy-amber"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
