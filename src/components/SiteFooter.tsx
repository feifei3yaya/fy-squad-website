import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const footerLinks = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于我们' },
  { to: '/wiki', label: '战术百科' },
  { to: '/forum', label: '社区论坛' },
  { to: '/server', label: '服务器列表' },
  { to: '/sponsor', label: '赞助支持' },
  { to: '/join', label: '加入战队' },
  { to: '/guide', label: '新手指南' },
  { to: '/contact', label: '联系我们' },
];

export function SiteFooter() {
  return (
    <footer className="bg-fy-dark/95 border-t border-fy-edge/20 py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fy-amber/5 via-transparent to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-16 relative z-10">
        {/* 第一列：Logo + 简介 */}
        <div className="md:col-span-2 space-y-6">
          <Link to="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-200">
            <Logo size={32} textSize="lg" />
          </Link>
          <p className="text-fy-steel/60 text-sm leading-relaxed max-w-sm">
            专注战术小队(Squad)的华人竞技社区，以公平竞技、团队协作、战术至上为核心，打造最专业的中文战术体验。
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 bg-fy-panel border border-fy-edge/30 rounded-lg px-4 py-2 hover:bg-fy-amber/10 hover:border-fy-amber/50 transition-all duration-200 active:scale-95 shadow-sm">
              <ShoppingBag className="w-4 h-4 text-fy-amber group-hover:text-fy-amber-hc transition-colors" />
              <span className="font-hud text-xs tracking-wider text-fy-silver group-hover:text-white">购买游戏</span>
            </a>
          </div>
        </div>

        {/* 第二列：快速导航 */}
        <div>
          <h4 className="font-hud text-sm text-white tracking-widest mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-fy-amber" />
            快速导航
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="group flex items-center font-hud text-xs text-fy-steel/70 tracking-wider hover:text-fy-amber transition-colors duration-200">
                  <span className="truncate">{l.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 ml-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 第三列：联系方式 */}
        <div>
          <h4 className="font-hud text-sm text-white tracking-widest mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-fy-amber" />
            联系我们
          </h4>
          <div className="space-y-4">
            <div className="bg-fy-panel/50 border border-fy-edge/20 rounded-lg p-3 hover:border-fy-edge/40 transition-colors">
              <p className="text-fy-steel/50 text-[10px] uppercase tracking-wider mb-1 font-mono">QQ群</p>
              <p className="text-fy-silver font-mono text-sm">147724008</p>
            </div>
            <div className="bg-fy-panel/50 border border-fy-edge/20 rounded-lg p-3 hover:border-fy-edge/40 transition-colors">
              <p className="text-fy-steel/50 text-[10px] uppercase tracking-wider mb-1 font-mono">邮箱</p>
              <p className="text-fy-silver font-mono text-sm">fy.squad@qq.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-fy-edge/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-fy-steel/40 text-xs font-mono tracking-wider">
          © {new Date().getFullYear()} 肥鸭战队 版权所有.
        </p>
        <div className="flex gap-6 text-xs text-fy-steel/40 font-mono">
          <Link to="/about" className="hover:text-fy-amber transition-colors">关于</Link>
          <Link to="/contact" className="hover:text-fy-amber transition-colors">联系</Link>
        </div>
      </div>
    </footer>
  );
}
