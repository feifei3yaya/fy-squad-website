import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://www.fy-squad.cn:3001';

interface FormErrors {
  username?: string;
  email?: string;
  steamId?: string;
  qq?: string;
  password?: string;
  code?: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [steamId, setSteamId] = useState('');
  const [qq, setQq] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!username.trim()) errs.username = '用户名不能为空';

    if (!isLogin) {
      if (!email.trim()) {
        errs.email = '邮箱不能为空';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = '请输入有效的邮箱地址';
      }

      if (!steamId.trim()) {
        errs.steamId = 'SteamID不能为空';
      } else if (!/^\d{17}$/.test(steamId)) {
        errs.steamId = 'SteamID应为17位数字';
      }

      if (!qq.trim()) {
        errs.qq = 'QQ号不能为空';
      } else if (!/^\d{5,12}$/.test(qq)) {
        errs.qq = 'QQ号应为5-12位数字';
      }

      if (!password.trim()) {
        errs.password = '密码不能为空';
      } else if (password.length < 6) {
        errs.password = '密码至少6位';
      }
    }

    return errs;
  };

  const validateCode = (): FormErrors => {
    const errs: FormErrors = {};
    if (!code.trim() || code.length !== 6) {
      errs.code = '请输入6位验证码';
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    setErrors(errs);
    setTouched({ username: true, email: true, steamId: true, qq: true, password: true });

    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '注册失败');

      setRegisteredEmail(email);
      setStep('verify');
      setSuccessMsg('验证码已发送到您的邮箱，请查收');
    } catch (err: any) {
      setServerError(err.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs = validateCode();
    setErrors(errs);
    setTouched({ code: true });

    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '验证失败');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/profile';
    } catch (err: any) {
      setServerError(err.message || '验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setServerError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '重发失败');

      setSuccessMsg('验证码已重新发送');
      startCountdown();
    } catch (err: any) {
      setServerError(err.message || '重发失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs: FormErrors = {};
    if (!username.trim()) errs.username = '请输入用户名';
    if (!password.trim()) errs.password = '请输入密码';
    setErrors(errs);
    setTouched({ username: true, password: true });

    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '登录失败');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/profile';
    } catch (err: any) {
      setServerError(err.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (step === 'verify') {
      handleVerify(e);
    } else if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep('form');
    setErrors({});
    setTouched({});
    setServerError('');
    setSuccessMsg('');
    setPassword('');
    setCode('');
  };

  return (
    <div className="bg-fy-dark min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 overflow-hidden">
            <img
              src="/images/logo.png"
              alt="肥鸭战队 Logo"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 16px rgba(255, 209, 102, 0.3))',
              }}
            />
          </div>
          <h1 className="font-hud font-bold text-3xl sm:text-4xl text-fy-amber tracking-[0.2em]">FY</h1>
          <p className="font-hud text-fy-steel text-xs tracking-[0.3em] mt-1">FEI YA SQUAD</p>
          <p className="text-fy-steel/50 text-xs sm:text-sm mt-3 sm:mt-4">
            {step === 'verify' ? '验证邮箱' : isLogin ? '欢迎回来，战士' : '注册新账号'}
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-fy-red/10 border border-fy-red/30 rounded text-fy-red text-xs">{serverError}</div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 bg-fy-green-dim/10 border border-fy-green-dim/30 rounded text-fy-green-dim text-xs">{successMsg}</div>
        )}

        {step === 'verify' ? (
          <form onSubmit={handleVerify} className="space-y-4 sm:space-y-5">
            <div>
              <label className="data-label block mb-2">
                验证码 <span className="text-fy-steel/40 text-xs">(已发送至 {registeredEmail})</span>
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); if (touched.code) setErrors(validateCode()); }}
                onBlur={() => handleBlur('code')}
                placeholder="请输入6位验证码"
                maxLength={6}
                className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm text-center tracking-[0.5em] outline-none transition-colors placeholder:text-fy-steel/30 ${touched.code && errors.code ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
              />
              {touched.code && errors.code && (
                <p className="text-fy-red text-xs mt-1">{errors.code}</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-amber w-full text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? '验证中...' : '验证邮箱'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || loading}
                className="text-fy-steel/50 text-xs font-hud tracking-wider hover:text-fy-amber transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `${countdown}秒后可重发` : '重新发送验证码'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="data-label block mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); if (touched.username) setErrors(validate()); }}
                onBlur={() => handleBlur('username')}
                placeholder="用户名"
                className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.username && errors.username ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
              />
              {touched.username && errors.username && (
                <p className="text-fy-red text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="data-label block mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (touched.email) setErrors(validate()); }}
                  onBlur={() => handleBlur('email')}
                  placeholder="邮箱地址"
                  className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.email && errors.email ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
                />
                {touched.email && errors.email && (
                  <p className="text-fy-red text-xs mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="data-label block mb-2">SteamID</label>
                <input
                  type="text"
                  value={steamId}
                  onChange={(e) => { setSteamId(e.target.value); if (touched.steamId) setErrors(validate()); }}
                  onBlur={() => handleBlur('steamId')}
                  placeholder="17位数字SteamID"
                  className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.steamId && errors.steamId ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
                />
                {touched.steamId && errors.steamId && (
                  <p className="text-fy-red text-xs mt-1">{errors.steamId}</p>
                )}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="data-label block mb-2">QQ号</label>
                <input
                  type="text"
                  value={qq}
                  onChange={(e) => { setQq(e.target.value); if (touched.qq) setErrors(validate()); }}
                  onBlur={() => handleBlur('qq')}
                  placeholder="QQ号码"
                  className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.qq && errors.qq ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
                />
                {touched.qq && errors.qq && (
                  <p className="text-fy-red text-xs mt-1">{errors.qq}</p>
                )}
              </div>
            )}

            <div>
              <label className="data-label block mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (touched.password) setErrors(validate()); }}
                onBlur={() => handleBlur('password')}
                placeholder="密码（至少6位）"
                className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.password && errors.password ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`}
              />
              {touched.password && errors.password && (
                <p className="text-fy-red text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-amber w-full text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (isLogin ? '登录中...' : '注册中...') : (isLogin ? '登录' : '注册')}
            </button>
          </form>
        )}

        {step !== 'verify' && (
          <>
            <div className="divider my-6" />
            <button className="w-full py-2.5 border border-fy-green-dim/30 text-fy-steel font-hud text-xs tracking-wider hover:bg-fy-surface transition-colors">
              QQ 快速登录
            </button>
          </>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-fy-steel/50 text-xs font-hud tracking-wider hover:text-fy-amber transition-colors"
          >
            {step === 'verify' ? '返回注册' : isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-fy-steel/30 text-xs font-hud tracking-wider hover:text-fy-amber transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
