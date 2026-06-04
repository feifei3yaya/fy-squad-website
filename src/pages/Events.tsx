import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, LayoutList, CalendarDays } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Tab = 'upcoming' | 'past';
type ViewMode = 'list' | 'calendar';

const upcomingEvents = [
  { id: 1, title: 'FY周末对抗赛', date: '2026-06-06', time: '20:00', map: 'Al Basrah', players: '40/50', status: '报名中' as const },
  { id: 2, title: '新兵训练营 #12', date: '2026-06-08', time: '19:30', map: 'Jensen\'s Range', players: '18/20', status: '即将满员' as const },
  { id: 3, title: 'FY vs ZQ 友谊赛', date: '2026-06-12', time: '20:00', map: 'Fallujah', players: '50/50', status: '已满' as const },
];

const pastEvents = [
  { id: 4, title: 'FY周末对抗赛 #8', date: '2026-05-24', time: '20:00', map: 'Narva', players: '48/50', status: '已结束' as const },
  { id: 5, title: '新兵训练营 #11', date: '2026-05-20', time: '19:30', map: 'Jensen\'s Range', players: '20/20', status: '已结束' as const },
  { id: 6, title: 'FY vs RED 联赛', date: '2026-05-15', time: '20:00', map: 'Gorodok', players: '50/50', status: '已结束' as const },
];

const statusStyle: Record<string, string> = {
  '报名中': 'text-fy-info border-fy-info/30',
  '即将满员': 'text-fy-orange-hc border-fy-orange/30',
  '已满': 'text-fy-red-hc border-fy-red/30',
  '已结束': 'text-fy-steel/40 border-fy-steel/20',
};

function getCountdown(dateStr: string, timeStr: string): string | null {
  const target = new Date(`${dateStr}T${timeStr}:00`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) return `${days}天${hours}时${minutes}分`;
  if (hours > 0) return `${hours}时${minutes}分`;
  return `${minutes}分`;
}

export default function Events() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [confirmEvent, setConfirmEvent] = useState<string | null>(null);
  const [countdowns, setCountdowns] = useState<Record<number, string | null>>({});

  const events = tab === 'upcoming' ? upcomingEvents : pastEvents;

  useEffect(() => {
    const updateCountdowns = () => {
      const result: Record<number, string | null> = {};
      upcomingEvents.forEach((ev) => {
        result[ev.id] = getCountdown(ev.date, ev.time);
      });
      setCountdowns(result);
    };
    updateCountdowns();
    const timer = setInterval(updateCountdowns, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSignup = (title: string) => {
    setConfirmEvent(title);
  };

  const confirmSignup = () => {
    setConfirmEvent(null);
  };

  return (
    <div className="bg-fy-dark min-h-screen">
      {confirmEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="panel p-6 sm:p-8 hud-corners max-w-sm w-full text-center">
            <h3 className="font-hud font-bold text-white text-sm tracking-wider mb-3">确认报名</h3>
            <p className="text-fy-steel text-xs mb-6">确认报名参加「{confirmEvent}」？</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmEvent(null)} className="px-4 py-2 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">
                取消
              </button>
              <button onClick={confirmSignup} className="btn-amber text-xs px-4 py-2">
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />

        <p className="section-label mb-3">行动</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">战队活动</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-6 sm:mb-8">参与战队训练、对抗赛与社区活动</p>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex gap-px bg-fy-green-dim/20 w-fit">
            <button
              onClick={() => setTab('upcoming')}
              className={`px-5 py-2 font-hud text-xs tracking-wider transition-colors ${tab === 'upcoming' ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
            >
              即将开始
            </button>
            <button
              onClick={() => setTab('past')}
              className={`px-5 py-2 font-hud text-xs tracking-wider transition-colors ${tab === 'past' ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
            >
              往期活动
            </button>
          </div>

          <div className="flex gap-px bg-fy-green-dim/20 w-fit">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
              title="列表视图"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 transition-colors ${viewMode === 'calendar' ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}
              title="日历视图"
            >
              <CalendarDays className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-px bg-fy-green-dim/20">
            {events.map((ev) => (
              <div key={ev.id} className="bg-fy-panel p-4 sm:p-5 hover:bg-fy-surface transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider">{ev.title}</h3>
                      <span className={`border px-1.5 sm:px-2 py-0.5 font-mono text-[10px] tracking-wider ${statusStyle[ev.status]}`}>
                        {ev.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <span className="flex items-center gap-1.5 text-fy-steel/60 text-xs">
                        <Calendar className="w-3 h-3" /> {ev.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-fy-steel/60 text-xs">
                        <Clock className="w-3 h-3" /> {ev.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-fy-steel/60 text-xs">
                        <MapPin className="w-3 h-3" /> {ev.map}
                      </span>
                      <span className="flex items-center gap-1.5 text-fy-steel/60 text-xs">
                        <Users className="w-3 h-3" /> {ev.players}
                      </span>
                    </div>
                    {tab === 'upcoming' && countdowns[ev.id] && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-fy-amber" />
                        <span className="font-mono text-[10px] text-fy-amber tracking-wider">倒计时: {countdowns[ev.id]}</span>
                      </div>
                    )}
                  </div>
                  {tab === 'upcoming' && (
                    <button
                      disabled={ev.status === '已满'}
                      onClick={() => ev.status !== '已满' && handleSignup(ev.title)}
                      className={`font-hud text-xs tracking-wider px-4 sm:px-5 py-2 transition-colors shrink-0 ${
                        ev.status === '已满'
                          ? 'bg-fy-surface text-fy-steel/30 cursor-not-allowed border border-fy-green-dim/20'
                          : 'btn-amber'
                      }`}
                    >
                      {ev.status === '已满' ? '已满' : '报名参加'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="panel p-4 sm:p-6 hud-corners">
            <div className="grid grid-cols-7 gap-px bg-fy-green-dim/20 mb-2">
              {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
                <div key={d} className="bg-fy-panel p-2 text-center">
                  <span className="font-hud text-[10px] text-fy-steel/50 tracking-wider">{d}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-fy-green-dim/20">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2;
                const dateStr = day > 0 && day <= 30 ? `2026-06-${String(day).padStart(2, '0')}` : null;
                const dayEvents = dateStr ? events.filter((e) => e.date === dateStr) : [];
                return (
                  <div key={i} className={`bg-fy-panel p-1.5 sm:p-2 min-h-[3rem] sm:min-h-[4.5rem] ${!dateStr ? 'opacity-20' : ''}`}>
                    {dateStr && (
                      <>
                        <span className="font-mono text-[10px] text-fy-steel/50">{day}</span>
                        {dayEvents.map((ev) => (
                          <div key={ev.id} className="mt-0.5 text-[8px] sm:text-[9px] text-fy-amber truncate leading-tight">
                            {ev.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
