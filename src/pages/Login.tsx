import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormErrors { username?: string; email?: string; steamId?: string; qq?: string; }

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [steamId, setSteamId] = useState('');
  const [qq, setQq] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!username.trim()) errs.username = '用户名不能为空';
    if (!isLogin) {
      if (!email.trim()) errs.email = '邮箱不能为空';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = '请输入有效的邮箱地址';
      if (!steamId.trim()) errs.steamId = 'SteamID不能为空';
      else if (!/^\d{17}$/.test(steamId)) errs.steamId = 'SteamID应为17位数字';
      if (!qq.trim()) errs.qq = 'QQ号不能为空';
      else if (!/^\d{5,12}$/.test(qq)) errs.qq = 'QQ号应为5-12位数字';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(); setErrors(errs);
    const touchedFields = isLogin ? { username: true } : { username: true, email: true, steamId: true, qq: true };
    setTouched(touchedFields);
    if (Object.keys(errs).length === 0) { setLoading(true); setTimeout(() => setLoading(false), 1500); }
  };

  return (
    <div className="bg-fy-dark min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 overflow-hidden"><img src="/images/logo.png" alt="肥鸭战队 Logo" className="w-full h-full object-contain" style={{ filter: 'drop-shadow(0 0 16px rgba(255, 209, 102, 0.3))' }} /></div>
          <h1 className="font-hud font-bold text-3xl sm:text-4xl text-fy-amber tracking-[0.2em]">FY</h1>
          <p className="font-hud text-fy-steel text-xs tracking-[0.3em] mt-1">FEI YA SQUAD</p>
          <p className="text-fy-steel/50 text-xs sm:text-sm mt-3 sm:mt-4">{isLogin ? '欢迎回来，战士' : '注册新账号'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div><label className="data-label block mb-2">用户名</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${errors.username ? 'border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="用户名" />{errors.username && <p className="text-fy-red text-xs mt-1">{errors.username}</p>}</div>
          {!isLogin && (<><div><label className="data-label block mb-2">邮箱</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${errors.email ? 'border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="邮箱地址" />{errors.email && <p className="text-fy-red text-xs mt-1">{errors.email}</p>}</div><div><label className="data-label block mb-2">SteamID</label><input type="text" value={steamId} onChange={(e) => setSteamId(e.target.value)} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${errors.steamId ? 'border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="17位数字SteamID" />{errors.steamId && <p className="text-fy-red text-xs mt-1">{errors.steamId}</p>}</div><div><label className="data-label block mb-2">QQ号</label><input type="text" value={qq} onChange={(e) => setQq(e.target.value)} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${errors.qq ? 'border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="QQ号码" />{errors.qq && <p className="text-fy-red text-xs mt-1">{errors.qq}</p>}</div></>)}
          <button type="submit" disabled={loading} className="btn-amber w-full text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">{loading ? (isLogin ? '登录中...' : '注册中...') : (isLogin ? '登录' : '注册')}</button>
        </form>
        <div className="divider my-6" />
        <button className="w-full py-2.5 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">QQ 快速登录</button>
        <div className="mt-6 text-center"><button onClick={() => { setIsLogin(!isLogin); setErrors({}); setTouched({}); }} className="text-fy-steel/50 text-xs font-hud tracking-wider hover:text-fy-amber transition-colors">{isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}</button></div>
        <div className="mt-8 text-center"><Link to="/" className="text-fy-steel/30 text-xs font-hud tracking-wider hover:text-fy-amber transition-colors">← 返回首页</Link></div>
      </div>
    </div>
  );
}
