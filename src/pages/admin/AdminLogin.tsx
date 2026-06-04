import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';

/** 后台管理员模拟登录页（后端 API 就绪后替换为真实接口） */
export function AdminLogin() {
  const navigate = useNavigate();
  const [account, setAccount] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟登录延迟
    await new Promise(r => setTimeout(r, 800));

    // 简单的本地校验（后端就绪后替换为 API 调用）
    if (account === 'admin' && password === 'admin123') {
      const token = 'mock_admin_token_' + Date.now();
      const user = {
        id: 'admin-001',
        nickname: 'FY_Admin',
        account: 'admin',
        role: 'admin',
        avatar: '',
        createdAt: '2025-01-01T00:00:00Z',
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/admin', { replace: true });
    } else {
      setError('账号或密码错误（提示：admin / admin123）');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1015] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-fy-amber/10 border border-fy-amber/20 mb-4">
            <Shield className="w-7 h-7 text-fy-amber" />
          </div>
          <h1 className="font-hud text-xl text-white tracking-[0.12em] mb-1">后台管理</h1>
          <p className="font-hud text-[10px] text-fy-steel/50 tracking-[0.2em]">FY SQUAD ADMIN PANEL</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-hud text-[10px] text-fy-steel/60 tracking-[0.12em] mb-1.5">管理员账号</label>
            <input
              type="text"
              value={account}
              onChange={e => setAccount(e.target.value)}
              className="w-full bg-[#0f1319] border border-fy-edge/30 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-fy-steel/30 font-mono outline-none transition-colors focus:border-fy-amber/50"
              placeholder="输入管理员账号"
            />
          </div>
          <div>
            <label className="block font-hud text-[10px] text-fy-steel/60 tracking-[0.12em] mb-1.5">密码</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#0f1319] border border-fy-edge/30 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white placeholder-fy-steel/30 font-mono outline-none transition-colors focus:border-fy-amber/50"
                placeholder="输入密码"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fy-steel/40 hover:text-fy-steel/70 transition-colors"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-fy-red/10 border border-fy-red/20 rounded-lg px-3 py-2.5">
              <p className="text-xs text-fy-red-hc/80 font-mono">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-fy-amber/90 hover:bg-fy-amber disabled:bg-fy-amber/50 text-fy-dark font-hud text-xs tracking-[0.18em] py-2.5 rounded-lg transition-all duration-200 font-semibold"
          >
            {loading ? '验证中...' : '登录后台'}
          </button>

          <p className="text-center text-[10px] text-fy-steel/30 font-mono tracking-wider pt-2">
            开发模式 · 模拟登录
          </p>
        </form>
      </div>
    </div>
  );
}
