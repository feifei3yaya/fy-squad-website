import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Mail, Key, Hash, MessageCircle, AlertTriangle, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://api.fy-squad.cn:3001';

interface FormErrors {
  username?: string;
  email?: string;
  steamId?: string;
  qq?: string;
  password?: string;
  code?: string;
}

/** 将后端/网络错误转译为中文提示 */
function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return '网络连接失败，请检查后端服务是否运行';
  }
  if (error instanceof Error) {
    // 某些浏览器可能返回不同的英文表述
    const msg = error.message;
    if (/Failed to fetch|NetworkError|net::ERR_/i.test(msg)) return '网络连接失败，请检查后端服务是否运行';
    if (/timeout|timed ?out/i.test(msg)) return '请求超时，请稍后重试';
    if (/abort/i.test(msg)) return '请求已取消';
    return msg;
  }
  return fallback;
}

/* ─── 战术状态条 ─── */
function StatusBar() {
  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-fy-dark/90 border-b border-fy-amber/10 flex items-center justify-between px-4 sm:px-6 font-mono text-[9px] tracking-[0.12em] text-fy-steel/30 z-20 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-fy-amber/60 rounded-full animate-pulse" />
          肥鸭网络 // 安全通道
        </span>
        <span className="hidden sm:inline">通讯：已加密</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">认证协议：JWT_256</span>
        <span>{new Date().toISOString().slice(0, 10).replace(/-/g, '.')}</span>
      </div>
    </div>
  );
}

/* ─── 战术输入组件 ─── */
function TacticalInput({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  maxLength,
  center,
  disabled,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder: string;
  error?: string;
  touched?: boolean;
  maxLength?: number;
  center?: boolean;
  disabled?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="group">
      <label className="block text-[10px] text-fy-steel/50 font-mono tracking-[0.2em] uppercase mb-1.5 ml-0.5">
        {label}
      </label>
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 pointer-events-none
          ${touched && error ? 'from-fy-red/20 via-fy-red/5 to-transparent opacity-100' : 'from-fy-amber/5 via-transparent to-transparent opacity-0 group-focus-within:opacity-100'}`}
        />
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors
          ${touched && error ? 'text-fy-red-hc/50' : 'text-fy-steel/30 group-focus-within:text-fy-amber/50'}`}
        />
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={`w-full bg-fy-dark/40 border font-mono text-sm pl-10 pr-10 py-2.5 outline-none transition-all duration-300 placeholder:text-fy-steel/15
            ${touched && error
              ? 'border-fy-red/30 text-fy-red-hc/90 focus:border-fy-red/50'
              : 'border-fy-edge/20 text-fy-silver/90 focus:border-fy-amber/30'}
            ${center ? 'text-center tracking-[0.5em]' : 'tracking-wider'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fy-steel/30 hover:text-fy-steel/60 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        )}
        {/* 聚焦角标 */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-fy-amber/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-fy-amber/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>
      {touched && error && (
        <p className="flex items-center gap-1.5 text-[10px] text-fy-red-hc/80 font-mono tracking-[0.1em] mt-1.5 ml-0.5 uppercase">
          <AlertTriangle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── 战术提示横幅 ─── */
function TacticalBanner({ type, message, onClose }: { type: 'error' | 'success'; message: string; onClose?: () => void }) {
  const isError = type === 'error';
  return (
    <div className={`flex items-start gap-2.5 p-3 border font-mono text-[11px] tracking-wider animate-fade-up
      ${isError
        ? 'bg-fy-red/8 border-fy-red/20 text-fy-red-hc/90'
        : 'bg-fy-info/8 border-fy-info/20 text-fy-info/90'}`}
    >
      {isError ? <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />}
      <span className="flex-1 uppercase leading-relaxed">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-current/50 hover:text-current shrink-0 transition-colors font-bold">
          ×
        </button>
      )}
    </div>
  );
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
  const codeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'verify' && codeInputRef.current) {
      setTimeout(() => codeInputRef.current?.focus(), 400);
    }
  }, [step]);

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
    if (!username.trim()) errs.username = '请输入用户名';

    if (!isLogin) {
      if (!email.trim()) {
        errs.email = '请输入邮箱';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = '邮箱格式不正确';
      }

      if (!steamId.trim()) {
        errs.steamId = '请输入 Steam ID';
      } else if (!/^\d{17}$/.test(steamId)) {
        errs.steamId = 'Steam ID 必须为 17 位数字';
      }

      if (!qq.trim()) {
        errs.qq = '请输入 QQ 号';
      } else if (!/^\d{5,15}$/.test(qq)) {
        errs.qq = 'QQ 号长度不正确';
      }

      if (!password.trim()) {
        errs.password = '请输入密码';
      } else if (password.length < 6) {
        errs.password = '密码至少 6 位';
      }
    } else {
      if (!password.trim()) errs.password = '请输入密码';
    }

    return errs;
  };

  const validateCode = (): FormErrors => {
    const errs: FormErrors = {};
    if (!code.trim() || code.length !== 6) {
      errs.code = '请输入 6 位验证码';
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');
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
      if (!res.ok) throw new Error(data.message || '注册失败，请稍后重试');

      setRegisteredEmail(email);
      setStep('verify');
      setSuccessMsg('验证码已发送至您的邮箱');
      startCountdown();
    } catch (err) {
      setServerError(getErrorMessage(err, '注册失败，请稍后重试'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');
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
      if (!res.ok) throw new Error(data.message || '验证失败，请检查验证码');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/profile';
    } catch (err) {
      setServerError(getErrorMessage(err, '验证失败，请检查验证码'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setServerError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '重发失败，请稍后再试');

      setSuccessMsg('验证码已重新发送');
      startCountdown();
    } catch (err) {
      setServerError(getErrorMessage(err, '重发验证码失败'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');
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
      if (!res.ok) throw new Error(data.message || '用户名或密码错误');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/profile';
    } catch (err) {
      setServerError(getErrorMessage(err, '用户名或密码错误'));
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
    <div className="fixed inset-0 bg-[#080b0e] overflow-hidden">
      {/* ====== 背景层 ====== */}
      {/* 主背景图 */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/tactics.jpg)',
            filter: 'brightness(0.3) saturate(0.5)',
            transform: 'scale(1.05)',
          }}
        />
      </div>

      {/* 暗色叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080b0e]/95 via-[#0c1015]/90 to-[#080b0e]/95 pointer-events-none" />

      {/* 战术网格 */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(214,164,73,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214,164,73,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 四角战术准星 */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-fy-amber/10 pointer-events-none" />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-fy-amber/10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-fy-amber/10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-fy-amber/10 pointer-events-none" />

      {/* ====== 顶部状态条 ====== */}
      <StatusBar />

      {/* ====== 主内容区 ====== */}
      <div className="absolute inset-0 overflow-y-auto z-10 pt-8">
        <div className="min-h-full w-full flex items-center justify-center px-4 sm:px-6 py-12">
          <div className="w-full max-w-[440px]">

          {/* ─── 品牌标识区 ─── */}
          <div className="text-center mb-5 sm:mb-8">
            <Link to="/" className="inline-block group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 relative">
                {/* 徽章光晕 */}
                <div className="absolute inset-0 rounded-full bg-fy-amber/10 blur-xl group-hover:bg-fy-amber/20 transition-all duration-500" />
                <img
                  src="/images/logo.png"
                  alt="肥鸭战队"
                  className="relative w-full h-full object-contain drop-shadow-[0_0_20px_rgba(214,164,73,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(214,164,73,0.5)] transition-all duration-500"
                />
              </div>
            </Link>

            <h1 className="font-hud font-bold text-xl sm:text-2xl text-white tracking-[0.15em] mb-1">
              肥鸭战队
            </h1>
            <p className="font-hud text-fy-amber/80 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
              战术指挥中心
            </p>
          </div>

          {/* ─── 认证面板 ─── */}
          <div className="relative">
            {/* 面板发光边框 */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-fy-amber/10 via-fy-amber/5 to-transparent pointer-events-none" />

            <div className="relative bg-[#0c1015]/95 backdrop-blur-xl border border-fy-edge/15 p-4 sm:p-6 md:p-8 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">

              {/* ─── 登录/注册 标签切换 ─── */}
              {step === 'form' && (
                <div className="flex mb-5 sm:mb-8 border-b border-fy-edge/15">
                  <button
                    onClick={() => { if (!isLogin) switchMode(); }}
                    className={`flex-1 pb-3 font-hud text-sm tracking-[0.15em] uppercase transition-all duration-300 border-b-2 relative
                      ${isLogin
                        ? 'text-fy-amber border-fy-amber'
                        : 'text-fy-steel/30 border-transparent hover:text-fy-steel/50'}`}
                  >
                    <Shield className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
                    登录
                    {isLogin && (
                      <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-fy-amber/40 blur-sm" />
                    )}
                  </button>
                  <button
                    onClick={() => { if (isLogin) switchMode(); }}
                    className={`flex-1 pb-3 font-hud text-sm tracking-[0.15em] uppercase transition-all duration-300 border-b-2
                      ${!isLogin
                        ? 'text-fy-amber border-fy-amber'
                        : 'text-fy-steel/30 border-transparent hover:text-fy-steel/50'}`}
                  >
                    <User className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
                    注册
                    {!isLogin && (
                      <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-fy-amber/40 blur-sm" />
                    )}
                  </button>
                </div>
              )}

              {/* ─── 验证码步骤标题 ─── */}
              {step === 'verify' && (
                <div className="text-center mb-8 border-b border-fy-edge/15 pb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-fy-amber" />
                    <h2 className="font-hud text-lg text-fy-amber tracking-[0.15em] uppercase">
                      邮箱验证
                    </h2>
                  </div>
                  <p className="text-fy-steel/40 text-[10px] font-mono tracking-wider">
                    验证码已发送至邮箱
                  </p>
                </div>
              )}

              {/* ─── 消息提示 ─── */}
              {serverError && (
                <div className="mb-5">
                  <TacticalBanner type="error" message={serverError} onClose={() => setServerError('')} />
                </div>
              )}
              {successMsg && (
                <div className="mb-5">
                  <TacticalBanner type="success" message={successMsg} onClose={() => setSuccessMsg('')} />
                </div>
              )}

              {/* ====== 验证码表单 ====== */}
              {step === 'verify' ? (
                <form onSubmit={handleVerify}>
                  {/* 目标邮箱 */}
                  <div className="mb-6 p-3 bg-fy-dark/30 border border-fy-amber/10 text-center">
                    <p className="text-[9px] text-fy-steel/30 font-mono tracking-[0.2em] uppercase mb-1">目标邮箱</p>
                    <p className="text-fy-amber/80 text-sm font-mono tracking-wider">{registeredEmail}</p>
                  </div>

                  <TacticalInput
                    icon={Hash}
                    label="验证码"
                    value={code}
                    onChange={(v) => { setCode(v.replace(/\D/g, '').slice(0, 6)); }}
                    onBlur={() => handleBlur('code')}
                    placeholder="------"
                    error={errors.code}
                    touched={touched.code}
                    maxLength={6}
                    center
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-fy-amber text-fy-dark font-hud font-semibold text-sm tracking-[0.15em] uppercase py-3
                      hover:bg-[#E1B763] hover:shadow-[0_0_28px_rgba(214,164,73,0.25)]
                      active:scale-[0.98] transition-all duration-300
                      disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-fy-amber disabled:hover:shadow-none"
                  >
                    {loading ? '验证中...' : '确认验证'}
                  </button>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-fy-edge/10">
                    <button
                      type="button"
                      onClick={() => { setStep('form'); setIsLogin(false); }}
                      className="flex items-center gap-1 text-fy-steel/30 hover:text-fy-steel/60 font-mono text-[10px] tracking-wider uppercase transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      返回修改
                    </button>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={countdown > 0 || loading}
                      className="font-mono text-[10px] tracking-wider uppercase transition-colors
                        disabled:text-fy-steel/15 disabled:cursor-not-allowed
                        text-fy-amber/60 hover:text-fy-amber"
                    >
                      {countdown > 0 ? `重发 (${countdown}s)` : '重新发送验证码'}
                    </button>
                  </div>
                </form>
              ) : (
                /* ====== 登录/注册表单 ====== */
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <TacticalInput
                      icon={User}
                      label="账号"
                      value={username}
                      onChange={(v) => setUsername(v)}
                      onBlur={() => handleBlur('username')}
                      placeholder="输入用户名"
                      error={errors.username}
                      touched={touched.username}
                    />

                    {/* 注册额外字段 */}
                    {!isLogin && (
                      <>
                        <TacticalInput
                          icon={Mail}
                          label="电子邮箱"
                          type="email"
                          value={email}
                          onChange={(v) => setEmail(v)}
                          onBlur={() => handleBlur('email')}
                          placeholder="your@email.com"
                          error={errors.email}
                          touched={touched.email}
                        />

                        <TacticalInput
                          icon={Hash}
                          label="Steam ID64（17位数字）"
                          value={steamId}
                          onChange={(v) => setSteamId(v)}
                          onBlur={() => handleBlur('steamId')}
                          placeholder="7656119XXXXXXXXXX"
                          error={errors.steamId}
                          touched={touched.steamId}
                          maxLength={17}
                        />

                        <TacticalInput
                          icon={MessageCircle}
                          label="QQ 号"
                          value={qq}
                          onChange={(v) => setQq(v)}
                          onBlur={() => handleBlur('qq')}
                          placeholder="QQ号码"
                          error={errors.qq}
                          touched={touched.qq}
                          maxLength={12}
                        />
                      </>
                    )}

                    <TacticalInput
                      icon={Key}
                      label="密码"
                      type="password"
                      value={password}
                      onChange={(v) => setPassword(v)}
                      onBlur={() => handleBlur('password')}
                      placeholder="输入密码"
                      error={errors.password}
                      touched={touched.password}
                    />
                  </div>

                  {/* 提交按钮 */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 bg-fy-amber text-fy-dark font-hud font-semibold text-sm tracking-[0.15em] uppercase py-3
                      hover:bg-[#E1B763] hover:shadow-[0_0_28px_rgba(214,164,73,0.25)]
                      active:scale-[0.98] transition-all duration-300
                      disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-fy-amber disabled:hover:shadow-none"
                  >
                    {loading ? '处理中...' : (isLogin ? '登录系统' : '提交注册')}
                  </button>

                  {/* 底部操作区 */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-fy-edge/10">
                    <Link
                      to="/"
                      className="flex items-center gap-1 text-fy-steel/30 hover:text-fy-steel/60 font-mono text-[10px] tracking-wider uppercase transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      返回首页
                    </Link>
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-hud text-xs tracking-[0.12em] text-fy-amber/70 hover:text-fy-amber transition-colors uppercase"
                    >
                      {isLogin ? '没有账号？注册' : '已有账号？登录'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* 底部版本号 */}
          <p className="text-center mt-6 font-mono text-[9px] text-fy-steel/15 tracking-[0.2em] uppercase">
            肥鸭战队 认证系统 v2.0 // 安全连接
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
