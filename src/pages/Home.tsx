import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Server, Users, MessageSquare, Activity, Crosshair, Target, Radio, Map, Zap, X, ShoppingBag } from 'lucide-react';
import Logo from '../components/Logo';
import SEO from '../components/SEO';

/* ─── 导航 ─── */
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

/* ─── Hero 视频背景 ─── */
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
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/squad-1.mp4" type="video/mp4" />
        <source src="/videos/squad-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-fy-dark via-fy-dark/60 to-fy-dark/40" />


      <div className="hero-ct relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="section-label mb-4 sm:mb-6 text-xs sm:text-sm">TACTICAL SQUAD · 战术小队</p>
        </div>
        <h1 className="font-hud font-bold text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-[0.1em] sm:tracking-[0.15em] mb-2 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          肥鸭战队
        </h1>
        <p className="font-hud text-fy-amber text-lg sm:text-xl md:text-2xl tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          FEI YA SQUAD
        </p>
        <p className="text-fy-steel text-xs sm:text-sm md:text-base max-w-md mb-8 sm:mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.9s' }}>
          公平竞技 · 团队协作 · 战术至上
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '1.1s' }}>
          <Link to="/join" className="btn-amber flex items-center justify-center gap-2 text-sm px-6 py-3">
            加入战队 <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center justify-center gap-2 text-sm px-6 py-3">
            <ShoppingBag className="w-4 h-4" /> 购买游戏
          </a>
          <Link to="/server" className="btn-outline text-sm px-6 py-3 text-center">查看服务器</Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-fy-amber/40" />
      </div>
    </section>
  );
}

/* ─── 战术小队游戏介绍 ─── */
function GameIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const features = [
    {
      icon: Target,
      title: '50 vs 50 大规模战斗',
      desc: '两支队伍各50名玩家在16km²的战场上展开激烈对抗，步兵、载具、空中支援协同作战。',
    },
    {
      icon: Radio,
      title: '真实通信系统',
      desc: '内置VoIP语音系统，支持小队频道、指挥频道和近距离本地语音，沟通是胜利的关键。',
    },
    {
      icon: Map,
      title: '战术基地建设',
      desc: '建造FOB前线基地、部署兵站和防御工事，控制关键据点，制定战略部署。',
    },
    {
      icon: Zap,
      title: '多兵种协同',
      desc: '步枪兵、医疗兵、机枪手、反坦克兵、工兵、狙击手等兵种各司其职，团队配合至关重要。',
    },
  ];

  const gameModes = [
    { name: 'RAAS', desc: '随机战线推进', detail: '随机生成占领点，双方争夺推进战线' },
    { name: 'AAS', desc: '交替战线', detail: '固定顺序的占领点，逐步推进' },
    { name: 'Invasion', desc: '入侵模式', detail: '进攻方逐步占领防守方据点' },
    { name: 'Destruction', desc: '破坏模式', detail: '摧毁敌方关键目标获取胜利' },
  ];

  const factions = [
    { name: '美军', flag: 'USA', desc: 'M4卡宾枪、M249机枪、布莱德利步战车' },
    { name: '俄军', flag: 'RUS', desc: 'AK-74M、PKP机枪、BTR-82A装甲车' },
    { name: '英军', flag: 'GBR', desc: 'L85A2、L7A2机枪、FV510武士' },
    { name: '解放军', flag: 'PLA', desc: 'QBZ-95、QJY-88机枪、ZBL-09步战' },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 游戏概述 */}
        <div className={`mb-16 sm:mb-24 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-label mb-4">ABOUT THE GAME</p>
          <h2 className="font-hud font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wider mb-6 sm:mb-8">
            什么是<span className="text-fy-amber">战术小队</span>？
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <p className="text-fy-steel/80 text-sm sm:text-base leading-relaxed mb-4">
                《战术小队》(Squad) 是一款由 Offworld Industries 开发的大型多人在线战术射击游戏，
                于2015年开启抢先体验，2020年正式发售。游戏基于虚幻引擎4打造，
                填补了街机射击游戏与严肃军事模拟之间的空白。
              </p>
              <p className="text-fy-steel/80 text-sm sm:text-base leading-relaxed mb-4">
                游戏核心强调团队合作、战术沟通和真实战斗体验。每局最多支持100名玩家同场竞技，
                分为两支各50人的队伍，在16平方公里的广阔战场上展开激烈对抗。
              </p>
              <p className="text-fy-steel/80 text-sm sm:text-base leading-relaxed">
                玩家可以扮演步枪兵、医疗兵、机枪手、反坦克兵、工兵、狙击手等多种兵种，
                驾驶载具、建造基地、执行战术任务，体验真实的现代战场。
              </p>
            </div>
            <div className="bg-fy-panel border border-fy-green-dim/20 p-6 sm:p-8 hud-corners">
              <p className="section-label mb-6">GAME INFO</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">100</div>
                  <div className="data-label text-[10px] mt-1">同场竞技</div>
                </div>
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">16km²</div>
                  <div className="data-label text-[10px] mt-1">战场规模</div>
                </div>
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">9人</div>
                  <div className="data-label text-[10px] mt-1">小队编制</div>
                </div>
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">20+</div>
                  <div className="data-label text-[10px] mt-1">可选地图</div>
                </div>
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">10+</div>
                  <div className="data-label text-[10px] mt-1">可选阵营</div>
                </div>
                <div className="text-center p-3 bg-fy-dark/50">
                  <div className="font-hud font-bold text-xl sm:text-2xl text-fy-amber">50+</div>
                  <div className="data-label text-[10px] mt-1">载具种类</div>
                </div>
              </div>
          <div className="flex flex-col gap-2 w-full mt-6">
                <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" className="btn-amber w-full flex items-center justify-center gap-2 py-3 text-sm">
                  <ShoppingBag className="w-4 h-4" />
                  网页版购买 (需代理)
                </a>
                <a href="steam://store/393380" className="btn-outline w-full flex items-center justify-center gap-2 py-3 text-sm text-fy-amber border-fy-amber/30 hover:bg-fy-amber/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 .007c-5.122 0-9.453 3.325-11.025 7.915l6.49 2.618c.504-.37 1.127-.604 1.805-.604.226 0 .442.029.65.081L13.195 7.02c.046-2.115 1.786-3.821 3.916-3.821 2.164 0 3.923 1.76 3.923 3.924 0 2.164-1.759 3.924-3.923 3.924-.654 0-1.267-.161-1.805-.443l-3.21 3.425c.05.21.08.428.08.653 0 1.636-1.325 2.962-2.961 2.962-1.636 0-2.962-1.326-2.962-2.962 0-.256.035-.503.098-.737l-6.104-2.463c-.15 1.13-.231 2.279-.231 3.447 0 6.613 5.373 11.986 11.986 11.986s11.986-5.373 11.986-11.986S18.613.007 12 .007zM7.273 15.003c0 .934-.757 1.691-1.691 1.691-.933 0-1.691-.757-1.691-1.691s.758-1.691 1.691-1.691c.934 0 1.691.757 1.691 1.691zm12.571-7.882c0 1.488-1.206 2.695-2.694 2.695-1.489 0-2.695-1.207-2.695-2.695 0-1.488 1.206-2.694 2.695-2.694 1.488 0 2.694 1.206 2.694 2.694zm-1.815 0c0-.501-.406-.906-.907-.906-.501 0-.907.405-.907.906 0 .502.406.907.907.907.501 0 .907-.405.907-.907z"/></svg>
                  客户端直达 (推荐)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 核心特色 */}
        <div className={`mb-16 sm:mb-24 transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Crosshair className="w-4 h-4 text-fy-amber" />
            <span className="section-label">CORE FEATURES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fy-green-dim/20">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-fy-panel p-6 sm:p-8 hud-corners hover:bg-fy-surface transition-all duration-500"
              >
                <f.icon className="w-6 h-6 sm:w-8 sm:h-8 text-fy-amber/70 mb-4 sm:mb-5" />
                <h3 className="font-hud font-semibold text-white text-sm tracking-wider mb-2 sm:mb-3">{f.title}</h3>
                <p className="text-fy-steel/60 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 游戏模式 */}
        <div className={`mb-16 sm:mb-24 transition-all duration-700 delay-300 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Map className="w-4 h-4 text-fy-amber" />
            <span className="section-label">GAME MODES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fy-green-dim/20">
            {gameModes.map((mode) => (
              <div key={mode.name} className="bg-fy-panel p-5 sm:p-6 hud-corners hover:bg-fy-surface transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-hud font-bold text-fy-amber text-lg">{mode.name}</span>
                </div>
                <p className="font-hud text-white text-sm tracking-wider mb-2">{mode.desc}</p>
                <p className="text-fy-steel/60 text-xs leading-relaxed">{mode.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 可选阵营 */}
        <div className={`transition-all duration-700 delay-400 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-4 h-4 text-fy-amber" />
            <span className="section-label">FACTIONS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fy-green-dim/20">
            {factions.map((faction) => (
              <div key={faction.name} className="bg-fy-panel p-5 sm:p-6 hud-corners hover:bg-fy-surface transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-hud font-bold text-white text-sm tracking-wider">{faction.name}</span>
                  <span className="font-mono text-[10px] text-fy-amber border border-fy-amber/30 px-2 py-0.5">{faction.flag}</span>
                </div>
                <p className="text-fy-steel/60 text-xs leading-relaxed">{faction.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 服务器状态面板 (HUD风格) ─── */
function ServerPanel() {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const servers = [
    { name: 'FY #1 公开服', map: 'Al Basrah', players: 98, queue: 5, status: 'online' as const, ip: '43.248.96.12', port: 7787 },
    { name: 'FY #2 训练服', map: 'Fallujah', players: 100, queue: 23, status: 'full' as const, ip: '43.248.96.13', port: 7787 },
    { name: 'FY #3 赛事服', map: '维护中', players: 0, queue: 0, status: 'offline' as const, ip: '43.248.96.14', port: 7787 },
  ];

  const statusMap = {
    online: { dot: 'bg-green-500', text: 'ONLINE', color: 'text-green-400' },
    full: { dot: 'bg-yellow-500', text: 'HIGH LOAD', color: 'text-yellow-400' },
    offline: { dot: 'bg-red-500', text: 'OFFLINE', color: 'text-red-400' },
  };

  return (
    <section className="relative z-10 -mt-16 sm:-mt-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4 px-1">
          <Server className="w-4 h-4 text-fy-amber" />
          <span className="section-label">SERVER STATUS</span>
          <span className="text-[10px] font-mono text-fy-steel/50 ml-auto hidden sm:block">AUTO-REFRESH {countdown}S</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20">
          {servers.map((s) => {
            const st = statusMap[s.status];
            return (
              <div key={s.name} className="bg-fy-panel p-4 sm:p-5 hud-corners hover:bg-fy-surface transition-colors group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 ${st.dot} animate-pulse-slow`} />
                    <span className={`font-mono text-[10px] tracking-wider ${st.color}`}>{st.text}</span>
                  </div>
                </div>
                <div className="flex items-end gap-3 mb-3 sm:mb-4">
                  <span className="font-hud font-bold text-2xl sm:text-3xl text-white leading-none">{s.players}</span>
                  <span className="font-hud text-fy-steel text-xs sm:text-sm mb-0.5">/100</span>
                  {s.queue > 0 && <span className="font-mono text-[10px] text-fy-orange ml-auto">QUEUE: {s.queue}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-fy-steel/60 tracking-wider">{s.map}</span>
                  <a href={`steam://connect/${s.ip}:${s.port}`}
                     className={`font-hud text-[10px] tracking-wider px-3 py-1 border transition-colors ${s.status === 'offline' ? 'border-fy-green-dim/20 text-fy-steel/30 cursor-not-allowed' : 'border-fy-amber/30 text-fy-amber hover:bg-fy-amber/10'}`}
                     onClick={s.status === 'offline' ? (e) => e.preventDefault() : undefined}>
                    JOIN →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 数据概览 ─── */
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  const items = [
    { icon: Users, value: '156+', label: '活跃队员', target: 156, suffix: '+' },
    { icon: Server, value: '3', label: '专用服务器', target: 3, suffix: '' },
    { icon: MessageSquare, value: '4.8K', label: '论坛帖子', target: 4800, suffix: '', format: (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`) },
    { icon: Activity, value: '365', label: '运营天数', target: 365, suffix: '' },
  ];

  const [animatedValues, setAnimatedValues] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    if (!vis) return;
    const duration = 2000;
    const startTime = Date.now();
    const targets = [156, 3, 4800, 365];
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(targets.map((t) => Math.round(t * eased)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [vis]);

  const formatValue = (item: typeof items[number], animated: number) => {
    if (item.format) return item.format(animated);
    return `${animated}${item.suffix}`;
  };

  return (
    <section ref={ref} className="py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-fy-green-dim/10">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`bg-fy-dark p-6 sm:p-8 text-center transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-fy-amber/60 mx-auto mb-3 sm:mb-4" />
              <div className="data-value text-xl sm:text-2xl mb-1">{formatValue(item, animatedValues[i])}</div>
              <div className="data-label text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 游戏视频展示 ─── */
function VideoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [activeVideo, setActiveVideo] = useState(1);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-28 px-4 sm:px-6 bg-fy-panel/30">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-label mb-4">GAMEPLAY FOOTAGE</p>
          <h2 className="font-hud font-bold text-3xl sm:text-4xl text-white tracking-wider mb-4">战场实录</h2>
          <p className="text-fy-steel max-w-lg mx-auto text-sm sm:text-base">真实的战术小队战斗画面，感受百人战场的震撼</p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="aspect-video bg-fy-dark border border-fy-green-dim/20 overflow-hidden mb-4 sm:mb-6">
            <video
              key={activeVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={`/videos/squad-${activeVideo}.mp4`} type="video/mp4" />
            </video>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setActiveVideo(n)}
                className={`font-mono text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 border transition-all ${activeVideo === n ? 'border-fy-amber text-fy-amber bg-fy-amber/10' : 'border-fy-green-dim/30 text-fy-steel/50 hover:border-fy-steel/50 hover:text-fy-steel'}`}
              >
                CAM {String(n).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/team.jpg)' }} />
      <div className="absolute inset-0 bg-fy-dark/85" />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
        <span className="section-label">JOIN THE SQUAD</span>
        <h2 className="font-hud font-bold text-3xl sm:text-5xl md:text-7xl text-white tracking-wider mt-4 mb-4 sm:mb-6">准备加入战斗？</h2>
        <p className="text-fy-steel mb-8 sm:mb-10 max-w-md mx-auto text-sm sm:text-base">无论你是新手还是老兵，FY都欢迎你的加入</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/join" className="btn-amber inline-flex items-center justify-center gap-2 text-sm sm:text-base px-6 py-3">
            立即申请 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <Link to="/about" className="btn-outline inline-flex items-center justify-center text-sm sm:text-base px-6 py-3">
            了解战队
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 赞助滚动 ─── */
function SponsorStrip() {
  const names = ['FY_Tactical', 'FY_Gamer', 'FY_Driver', 'FY_Sniper', 'FY_Medic', 'FY_Commander', 'FY_Scout', 'FY_Engineer'];
  return (
    <section className="py-8 sm:py-10 border-y border-fy-green-dim/10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...names, ...names, ...names, ...names].map((n, i) => (
          <span key={i} className="mx-6 sm:mx-10 font-hud text-lg sm:text-xl text-fy-steel/15 hover:text-fy-amber/40 transition-colors cursor-default tracking-wider">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const footerLinks = [
    { to: '/', label: '首页' },
    { to: '/about', label: '关于' },
    { to: '/wiki', label: '百科' },
    { to: '/forum', label: '论坛' },
    { to: '/server', label: '服务器' },
    { to: '/sponsor', label: '赞助' },
    { to: '/join', label: '加入' },
    { to: '/guide', label: '指南' },
    { to: '/contact', label: '联系' },
  ];

  return (
    <footer className="bg-fy-dark border-t border-fy-green-dim/10 py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        {/* 左列：Logo + 名称 + 简介 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="FY" className="w-6 h-6 object-contain" />
            <span className="font-hud text-fy-amber tracking-widest text-lg">FY SQUAD</span>
          </div>
          <p className="font-hud text-sm text-white tracking-wider mb-3">肥鸭战队</p>
          <p className="text-fy-steel/50 text-xs leading-relaxed">
            专注战术小队(Squad)的华人竞技社区，以公平竞技、团队协作、战术至上为核心，打造最专业的中文战术体验。
          </p>
        </div>

        {/* 中列：导航链接 */}
        <div>
          <p className="font-hud text-xs text-fy-steel/30 tracking-widest mb-4">NAVIGATION</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="font-hud text-xs text-fy-steel/50 tracking-wider hover:text-fy-amber transition-colors py-1">
                {l.label}
              </Link>
            ))}
            <a href="https://store.steampowered.com/app/393380/Squad/" target="_blank" rel="noopener noreferrer" className="font-hud text-xs text-fy-amber tracking-wider hover:text-white transition-colors py-1 flex items-center gap-1.5">
              <ShoppingBag className="w-3 h-3" /> 购买游戏
            </a>
          </div>
        </div>

        {/* 右列：联系方式 + 版权 */}
        <div>
          <p className="font-hud text-xs text-fy-steel/30 tracking-widest mb-4">CONTACT</p>
          <div className="space-y-2 mb-6">
            <p className="text-fy-steel/50 text-xs">QQ群: <span className="text-fy-steel/70">147724008</span></p>
            <p className="text-fy-steel/50 text-xs">邮箱: <span className="text-fy-steel/70">fy.squad@qq.com</span></p>
          </div>
          <div className="border-t border-fy-green-dim/10 pt-4">
            <p className="text-fy-steel/20 text-xs font-mono">© 2026 FY SQUAD. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── 首页 ─── */
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "肥鸭战队社区官网",
    "alternateName": ["FY Squad", "肥鸭战队"],
    "url": "https://www.fy-squad.cn",
    "description": "肥鸭战队(FY Squad) — 专注战术小队(Squad)的华人竞技社区。公平竞技、团队协作、战术至上。",
    "inLanguage": "zh-CN",
    "about": {
      "@type": "VideoGame",
      "name": "战术小队",
      "alternateName": "Squad",
      "url": "https://store.steampowered.com/app/393380/Squad/",
      "gamePlatform": ["PC"]
    }
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      <SEO schema={schema} />
      <Nav />
      <Hero />
      <ServerPanel />
      <GameIntro />
      <Stats />
      <VideoShowcase />
      <CTA />
      <SponsorStrip />
      <Footer />
    </div>
  );
}
