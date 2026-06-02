import { useState, useEffect, useCallback } from 'react';
import { Server, MapPin, AlertTriangle, Ban, Users, Clock, TrendingUp, UserPlus } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const initialServers = [
  { name: 'FY #1 公开服', ip: '43.248.96.12', port: 7787, status: 'online' as const, players: 98, queue: 5, map: 'Al Basrah' },
  { name: 'FY #2 训练服', ip: '43.248.96.13', port: 7787, status: 'full' as const, players: 100, queue: 23, map: 'Fallujah' },
  { name: 'FY #3 赛事服', ip: '43.248.96.14', port: 7787, status: 'offline' as const, players: 0, queue: 0, map: '维护中' },
];

const statusMap = {
  online: { dot: 'bg-green-500', text: 'ONLINE', color: 'text-green-400' },
  full: { dot: 'bg-yellow-500', text: 'HIGH LOAD', color: 'text-yellow-400' },
  offline: { dot: 'bg-red-500', text: 'OFFLINE', color: 'text-red-400' },
};

const bans = [
  { name: 'Player123', reason: '使用外挂', type: 'permanent' as const },
  { name: 'NoobMaster', reason: '恶意TK', type: 'temp' as const, expire: '2026-06-05' },
  { name: 'ToxicGamer', reason: '辱骂队友', type: 'temp' as const, expire: '2026-06-15' },
  { name: 'Cheater_X', reason: '使用外挂', type: 'permanent' as const },
];

const funStats = [
  { icon: TrendingUp, value: '98', label: '今日最高在线', unit: '人' },
  { icon: MapPin, value: 'Al Basrah', label: '本周热门地图', unit: '' },
  { icon: Clock, value: '12,480', label: '累计游戏时长', unit: '小时' },
  { icon: UserPlus, value: '34', label: '本周新玩家', unit: '人' },
];

const REFRESH_INTERVAL = 30;
const maintenanceStart = new Date('2026-06-03T02:00:00');
const maintenanceEnd = new Date('2026-06-03T04:00:00');

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = totalSec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type BanFilter = 'all' | 'permanent' | 'temp';

export default function ServerPage() {
  const [serverData, setServerData] = useState(initialServers);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [maintenanceCountdown, setMaintenanceCountdown] = useState('');
  const [maintenanceStatus, setMaintenanceStatus] = useState<'before' | 'during' | 'after'>('before');
  const [banFilter, setBanFilter] = useState<BanFilter>('all');

  const refreshPlayers = useCallback(() => { setServerData((prev) => prev.map((s) => { if (s.status === 'offline') return s; const delta = Math.floor(Math.random() * 7) - 3; return { ...s, players: Math.max(0, Math.min(100, s.players + delta)) }; })); }, []);

  useEffect(() => { const timer = setInterval(() => { setCountdown((prev) => { if (prev <= 1) { refreshPlayers(); return REFRESH_INTERVAL; } return prev - 1; }); }, 1000); return () => clearInterval(timer); }, [refreshPlayers]);

  useEffect(() => { const updateMaintenance = () => { const now = new Date(); if (now < maintenanceStart) { setMaintenanceStatus('before'); setMaintenanceCountdown(formatCountdown(maintenanceStart.getTime() - now.getTime())); } else if (now < maintenanceEnd) { setMaintenanceStatus('during'); setMaintenanceCountdown(formatCountdown(maintenanceEnd.getTime() - now.getTime())); } else { setMaintenanceStatus('after'); setMaintenanceCountdown(''); } }; updateMaintenance(); const timer = setInterval(updateMaintenance, 1000); return () => clearInterval(timer); }, []);

  const filteredBans = bans.filter((b) => { if (banFilter === 'all') return true; return b.type === banFilter; });

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="relative h-[45vh] sm:h-[50vh] overflow-hidden"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/server.jpg)' }} /><div className="absolute inset-0 bg-gradient-to-t from-fy-dark via-fy-dark/70 to-fy-dark/30" /><div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 max-w-6xl mx-auto"><PageHeader className="mb-6 sm:mb-8" /><p className="section-label mb-3 sm:mb-4">REAL-TIME MONITOR</p><h1 className="page-title text-3xl sm:text-4xl md:text-5xl">FY 服务器</h1><p className="font-mono text-fy-steel/40 text-[10px] sm:text-xs tracking-wider mt-2 sm:mt-3">AUTO-REFRESH 30S · EAC PROTECTED</p></div></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-4 px-1"><div className="flex items-center gap-3"><Server className="w-4 h-4 text-fy-amber" /><span className="section-label">SERVER STATUS</span></div><span className="font-mono text-fy-steel/50 text-[10px] sm:text-xs tracking-wider">刷新倒计时: {countdown}s</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20 mb-10 sm:mb-16">
          {serverData.map((s) => { const st = statusMap[s.status]; const playerPercent = Math.min(100, Math.max(0, (s.players / 100) * 100)); return (<div key={s.name} className="bg-fy-panel p-4 sm:p-6 hud-corners hover:bg-fy-surface transition-colors"><div className="flex items-center justify-between mb-4 sm:mb-5"><span className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{s.name}</span><div className="flex items-center gap-2"><span className={`w-1.5 h-1.5 ${st.dot} animate-pulse-slow`} /><span className={`font-mono text-[10px] tracking-wider ${st.color}`}>{st.text}</span></div></div><div className="flex items-end gap-2 mb-1"><span className="data-value text-2xl sm:text-3xl leading-none">{s.players}</span><span className="font-hud text-fy-steel text-xs sm:text-sm mb-1">/100</span></div><div className="w-full h-1.5 bg-fy-green-dim/20 mb-2 overflow-hidden"><div className="h-full transition-all duration-1000 ease-out" style={{ width: `${playerPercent}%`, backgroundColor: playerPercent > 90 ? '#f59e0b' : '#22c55e', opacity: playerPercent > 90 ? 0.8 : 0.6 }} /></div>{s.queue > 0 && <p className="font-mono text-[10px] text-fy-orange tracking-wider mb-3 sm:mb-4">QUEUE: {s.queue}</p>}<div className="space-y-2 mb-4 sm:mb-6"><div className="flex items-center gap-2"><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fy-steel/40" /><span className="font-mono text-[10px] sm:text-[11px] text-fy-steel/60 tracking-wider">{s.map}</span></div><div className="flex items-center gap-2"><Server className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-fy-steel/40" /><span className="font-mono text-[10px] sm:text-[11px] text-fy-steel/60 tracking-wider">{s.ip}:{s.port}</span></div></div><a href={s.status === 'offline' ? undefined : `steam://connect/${s.ip}:${s.port}`} className={`block text-center font-hud text-xs tracking-wider py-2 sm:py-2.5 border transition-colors ${s.status === 'offline' ? 'border-fy-green-dim/20 text-fy-steel/30 cursor-not-allowed' : 'border-fy-amber/30 text-fy-amber hover:bg-fy-amber/10'}`} onClick={s.status === 'offline' ? (e) => e.preventDefault() : undefined}>{s.status === 'offline' ? 'OFFLINE' : 'JOIN →'}</a></div>); })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <div className="panel p-0"><div className="flex items-center gap-2 px-6 py-4 border-b border-fy-green-dim/20"><AlertTriangle className="w-4 h-4 text-fy-amber" /><span className="section-label">MAINTENANCE</span></div><div className="px-6 py-5"><div className="border-l-2 border-fy-amber/60 pl-4 py-1"><p className="font-hud font-semibold text-white text-sm tracking-wider">服务器例行维护</p><p className="font-mono text-fy-amber/70 text-xs mt-1">2026-06-03 02:00 — 04:00</p><p className="text-fy-steel/40 text-xs mt-2">预计维护2小时</p>{maintenanceCountdown && <div className="mt-3 flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-fy-amber/60" /><span className="font-mono text-fy-amber text-xs tracking-wider">{maintenanceStatus === 'before' ? `距离维护开始: ${maintenanceCountdown}` : `距离维护结束: ${maintenanceCountdown}`}</span></div>}{maintenanceStatus === 'after' && <p className="font-mono text-green-400/60 text-xs mt-3">维护已完成</p>}</div></div></div>
          <div className="panel p-0"><div className="flex items-center justify-between px-6 py-4 border-b border-fy-green-dim/20"><div className="flex items-center gap-2"><Ban className="w-4 h-4 text-fy-red" /><span className="section-label">BAN LIST</span></div><div className="flex gap-1">{([{ key: 'all' as BanFilter, label: '全部' },{ key: 'permanent' as BanFilter, label: '永久' },{ key: 'temp' as BanFilter, label: '临时' }]).map((f) => (<button key={f.key} onClick={() => setBanFilter(f.key)} className={`font-mono text-[10px] tracking-wider px-2 py-0.5 border transition-colors ${banFilter === f.key ? 'border-fy-amber/50 text-fy-amber bg-fy-amber/10' : 'border-fy-green-dim/20 text-fy-steel/40 hover:text-fy-steel/60'}`}>{f.label}</button>))}</div></div><div className="px-0">{filteredBans.length === 0 && <div className="px-6 py-4 text-fy-steel/30 font-mono text-xs text-center">无匹配记录</div>}{filteredBans.map((b, i) => (<div key={b.name + b.type} className={`flex items-center justify-between px-6 py-3 ${i < filteredBans.length - 1 ? 'divider' : ''}`}><div><p className="font-mono text-white/80 text-xs">{b.name}</p><p className="text-fy-steel/40 text-[10px] mt-0.5">{b.reason}</p></div><span className={`font-hud text-[10px] tracking-wider px-2 py-0.5 ${b.type === 'permanent' ? 'bg-fy-red/20 text-fy-red' : 'bg-fy-amber/10 text-fy-amber/70'}`}>{b.type === 'permanent' ? 'PERMANENT' : b.expire}</span></div>))}</div></div>
        </div>
        <div className="flex items-center gap-3 mb-4 px-1"><Users className="w-4 h-4 text-fy-amber" /><span className="section-label">FUN STATS</span></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-fy-green-dim/10">{funStats.map((s) => (<div key={s.label} className="bg-fy-panel p-4 sm:p-6 hover:bg-fy-surface transition-colors"><s.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fy-amber/50 mb-2 sm:mb-3" /><div className="font-hud font-bold text-white text-lg sm:text-xl leading-none mb-1">{s.value}</div><div className="data-label text-[10px] sm:text-xs">{s.label}</div></div>))}</div>
      </div>
    </div>
  );
}
