import { useState, useMemo } from 'react';
import { Heart, Check, Crown, AlertTriangle, Shield, Trophy, ArrowUpDown, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const tiers = [
  { name: '基础赞助', range: '1 — 29', benefits: ['等额天数预留位', '赞助感谢墙留名', '论坛专属头衔', '首页公告展示'] },
  { name: '标准赞助', range: '30 — 49', benefits: ['全部基础权益', 'QQ群专属标识', '活动优先报名', '月度抽奖资格'] },
  { name: '高级赞助', range: '50 — 99', benefits: ['全部标准权益', 'ID自定义前后缀', '赞助之星资格', '活动优先测试'] },
  { name: '至尊赞助', range: '100+', benefits: ['全部高级权益', '金色至尊勋章', '规则建议权', '专属客服通道'] },
];

const rankings = [
  { name: 'FY_Sniper', amount: 200, tier: '至尊' }, { name: 'FY_Tactical', amount: 100, tier: '至尊' }, { name: 'FY_Gamer', amount: 50, tier: '高级' },
  { name: 'FY_Driver', amount: 30, tier: '标准' }, { name: 'FY_Medic', amount: 10, tier: '基础' }, { name: 'FY_Commander', amount: 80, tier: '高级' }, { name: 'FY_Scout', amount: 15, tier: '基础' },
];

const paymentMethods = [{ id: 'wechat', label: '微信支付' }, { id: 'alipay', label: '支付宝' }];
const quickAmounts = [10, 30, 50, 100];

export default function Sponsor() {
  const [amount, setAmount] = useState('');
  const [payment, setPayment] = useState<string | null>(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  const sortedRankings = useMemo(() => [...rankings].sort((a, b) => sortDesc ? b.amount - a.amount : a.amount - b.amount), [sortDesc]);

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PageHeader className="mb-6 sm:mb-8" />
        <div className="flex items-center gap-3 mb-2 px-1"><Heart className="w-4 h-4 text-fy-amber" /><span className="section-label">SPONSOR</span></div>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">赞助我们</h1>
        <div className="panel px-4 sm:px-6 py-3 sm:py-4 mb-8 sm:mb-12 flex items-start gap-3"><AlertTriangle className="w-4 h-4 text-fy-amber flex-shrink-0 mt-0.5" /><div><p className="font-hud text-fy-amber text-sm tracking-wider mb-1">自愿赞助声明</p><p className="text-fy-steel/60 text-xs leading-relaxed">所有赞助均为自愿行为，资金全部用于服务器运营与升级。赞助权益仅包含排队预留位、荣誉标识等，无任何游戏内优势。赞助一经支付不予退款。</p></div></div>
        <div className="flex items-center gap-3 mb-4 px-1"><Crown className="w-4 h-4 text-fy-amber" /><span className="section-label">TIERS</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fy-green-dim/20 mb-10 sm:mb-16">
          {tiers.map((t, ti) => (<div key={t.name} className="bg-fy-panel p-4 sm:p-6 hud-corners hover:bg-fy-surface transition-colors"><div className="flex items-center gap-2 mb-1"><span className={`font-mono text-[10px] tracking-wider px-1.5 py-0.5 ${ti === 3 ? 'bg-fy-amber/20 text-fy-amber' : ti === 2 ? 'bg-fy-green/20 text-fy-green' : 'bg-fy-steel/10 text-fy-steel/60'}`}>T{ti + 1}</span></div><h3 className="font-hud font-semibold text-white text-sm tracking-wider mb-1">{t.name}</h3><p className="font-mono text-fy-amber text-xs mb-4 sm:mb-5">¥{t.range}</p><ul className="space-y-2">{t.benefits.map((b) => (<li key={b} className="flex items-start gap-2 text-fy-steel/60 text-xs"><Check className="w-3 h-3 text-fy-amber/60 flex-shrink-0 mt-0.5" /><span>{b}</span></li>))}</ul></div>))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div className="panel p-0"><div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-fy-green-dim/20"><Shield className="w-4 h-4 text-fy-amber" /><span className="section-label">DONATE</span></div><div className="px-4 sm:px-6 py-4 sm:py-6"><div className="data-label mb-3">快捷金额</div><div className="grid grid-cols-4 gap-px bg-fy-green-dim/20 mb-5">{quickAmounts.map((val) => (<button key={val} onClick={() => setAmount(String(val))} className={`py-2 font-hud text-xs tracking-wider transition-colors ${amount === String(val) ? 'bg-fy-amber text-fy-dark font-semibold' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface hover:text-white'}`}>¥{val}</button>))}</div><div className="data-label mb-3">自定义金额</div><div className="flex items-center gap-3 mb-2 border-b border-fy-green-dim/30 pb-3"><span className="font-hud text-fy-steel/40 text-xl sm:text-2xl">¥</span><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="flex-1 bg-transparent font-hud font-bold text-white text-3xl sm:text-4xl outline-none placeholder:text-fy-steel/15 w-0" /></div>{amount && Number(amount) > 0 && <p className="font-mono text-fy-amber/60 text-[10px] tracking-wider mb-4">可获得 {amount} 天排队预留位时长</p>}<div className="data-label mb-3">支付方式</div><div className="flex gap-px bg-fy-green-dim/20 mb-6">{paymentMethods.map((m) => (<button key={m.id} onClick={() => setPayment(m.id)} className={`flex-1 py-2.5 font-hud text-xs tracking-wider transition-colors ${payment === m.id ? 'bg-fy-amber text-fy-dark' : 'bg-fy-panel text-fy-steel hover:bg-fy-surface'}`}>{m.label}</button>))}</div><button onClick={() => setShowAgreement(true)} className="w-full btn-amber flex items-center justify-center gap-2 text-sm"><Heart className="w-4 h-4" /> 确认赞助</button></div></div>
          <div className="panel p-0"><div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-fy-green-dim/20"><div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-fy-amber" /><span className="section-label">RANKING</span></div><button onClick={() => setSortDesc(!sortDesc)} className="flex items-center gap-1 text-fy-steel/50 hover:text-fy-amber transition-colors"><ArrowUpDown className="w-3 h-3" /><span className="font-hud text-[10px] tracking-wider">{sortDesc ? '金额降序' : '金额升序'}</span></button></div><div className="px-0">{sortedRankings.map((r, i) => (<div key={r.name} className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3.5 ${i < sortedRankings.length - 1 ? 'divider' : ''}`}><span className={`font-hud font-bold text-xs sm:text-sm w-5 sm:w-6 flex-shrink-0 text-center ${i < 3 ? 'text-fy-amber' : 'text-fy-steel/30'}`}>{i + 1}</span><div className="flex-1 min-w-0"><p className="font-mono text-white/80 text-xs truncate">{r.name}</p></div><span className="font-hud font-semibold text-fy-amber text-xs sm:text-sm">¥{r.amount}</span><span className={`font-hud text-[10px] tracking-wider px-1.5 py-0.5 ${r.tier === '至尊' ? 'bg-fy-amber/15 text-fy-amber/80' : r.tier === '高级' ? 'bg-fy-green/15 text-fy-green/80' : 'bg-fy-steel/10 text-fy-steel/50'}`}>{r.tier}</span></div>))}</div></div>
        </div>
      </div>
      {showAgreement && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6"><div className="bg-fy-dark border border-fy-green-dim/30 p-5 sm:p-8 max-w-md w-full"><div className="flex items-center gap-3 mb-6"><AlertTriangle className="w-5 h-5 text-fy-amber" /><h3 className="font-hud font-semibold text-white text-lg tracking-wider">赞助协议</h3></div><div className="text-fy-steel/60 text-sm space-y-3 mb-8 leading-relaxed"><p>1. 赞助为自愿行为，一经支付不予退款</p><p>2. 1元 = 1天排队预留位时长</p><p>3. 权益仅含预留位、荣誉标识，无游戏内优势</p><p>4. 多次赞助时长自动累加</p><p>5. 赞助权益在服务器存续期间有效</p></div><div className="flex gap-px bg-fy-green-dim/20"><button onClick={() => setShowAgreement(false)} className="flex-1 py-2.5 bg-fy-panel font-hud text-xs tracking-wider text-fy-steel hover:bg-fy-surface hover:text-white transition-colors">取消</button><button onClick={() => { setShowAgreement(false); setShowQRCode(true); }} className="flex-1 py-2.5 bg-fy-amber font-hud text-xs tracking-wider text-fy-dark font-semibold hover:bg-white transition-colors">同意并继续</button></div></div></div>)}
      {showQRCode && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6"><div className="bg-fy-dark border border-fy-green-dim/30 p-5 sm:p-8 max-w-sm w-full text-center"><div className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><Shield className="w-5 h-5 text-fy-amber" /><h3 className="font-hud font-semibold text-white text-lg tracking-wider">扫码支付</h3></div><button onClick={() => setShowQRCode(false)} className="text-fy-steel/40 hover:text-white transition-colors"><X className="w-5 h-5" /></button></div><div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 border-2 border-fy-green-dim/30 flex flex-col items-center justify-center mb-6 bg-fy-panel"><p className="font-hud text-fy-steel/50 text-[10px] tracking-wider">扫码支付</p></div><p className="font-hud text-fy-amber text-xl sm:text-2xl font-bold mb-1">¥{amount || '0'}</p><p className="font-mono text-fy-steel/40 text-[10px] tracking-wider mb-6">{payment === 'wechat' ? '微信支付' : payment === 'alipay' ? '支付宝' : '请选择支付方式'}</p><button onClick={() => setShowQRCode(false)} className="w-full py-2.5 bg-fy-panel font-hud text-xs tracking-wider text-fy-steel hover:bg-fy-surface hover:text-white transition-colors border border-fy-green-dim/20">关闭</button></div></div>)}
    </div>
  );
}
