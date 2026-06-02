import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Server, Users, MessageSquare, Activity, Crosshair, Target, Radio, Map, Zap, X, ShoppingBag } from 'lucide-react';
import Logo from '../components/Logo';

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { to: '/', label: '首页' },
    { to: '/about', label: '关于' },
    { to: '/wiki', label: '百科' },
    { to: '/forum', label: '论坛' },
    { to: '/server', label: '服务器' },
    { to: '/sponsor', label: '赞助' },
    { to: '/join', label: '加入' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-fy-dark/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Logo size={36} textSize="sm" />

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`font-hud text-sm tracking-wider transition-colors ${location.pathname === l.to ? 'text-fy-amber' : 'text-fy-steel hover:text-fy-amber'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" className="btn-amber text-[10px] py-1 px-3 hidden lg:flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            购买游戏
          </a>
          <Link to="/login" className="btn-outline text-xs py-1.5 px-4 hidden sm:block">登录</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-fy-steel hover:text-fy-amber p-2">
            {menuOpen ? <X className="w-5 h-5" /> : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect y="3" width="20" height="1.5" fill="currentColor"/><rect y="9" width="14" height="1.5" fill="currentColor"/><rect y="15" width="20" height="1.5" fill="currentColor"/></svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-fy-dark/95 backdrop-blur-md border-t border-fy-green-dim/20 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={`block font-hud text-sm tracking-wider py-2 transition-colors ${location.pathname === l.to ? 'text-fy-amber' : 'text-fy-steel hover:text-fy-amber'}`}>
              {l.label}
            </Link>
          ))}
          <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block btn-amber text-center text-xs py-2 mt-2 flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            购买 Squad 游戏
          </a>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block btn-outline text-center text-xs py-2 mt-2">登录</Link>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!ref.current) return;
          const y = window.scrollY;
          const ct = ref.current.querySelector<HTMLElement>('.hero-ct');
          if (ct) { 
            ct.style.opacity = `${Math.max(0, 1 - y / 600)}`; 
            ct.style.transform = `translateY(${y * 0.15}px)`; 
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-fy-dark">
      <video className="absolute inset-0 w-full h-full object-cover