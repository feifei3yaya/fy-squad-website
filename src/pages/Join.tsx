import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Gamepad2, Users, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const soldierTypes = ['步兵', '医疗兵', '机枪手', '反坦克兵', '工兵', '狙击手', '载具驾驶员', '小队长'];

interface FormErrors { gameId?: string; qq?: string; hours?: string; }

export default function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [gameId, setGameId] = useState('');
  const [qq, setQq] = useState('');
  const [hours, setHours] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [intro, setIntro] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!gameId.trim()) errs.gameId = '游戏ID不能为空';
    if (!qq.trim()) errs.qq = 'QQ号码不能为空';
    else if (!/^\d+$/.test(qq.trim())) errs.qq = 'QQ号码必须为纯数字';
    if (hours && (isNaN(Number(hours)) || Number(hours) <= 0)) errs.hours = '游戏时长必须为正数';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); const errs = validate(); setErrors(errs); setTouched({ gameId: true, qq: true, hours: true }); if (Object.keys(errs).length === 0) setSubmitted(true); };
  const toggleSoldierType = (type: string) => { setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]); };

  if (submitted) return (
    <div className="bg-fy-dark min-h-screen flex items-center justify-center px-6">
      <div className="text-center panel p-12 hud-corners max-w-md w-full">
        <CheckCircle className="w-14 h-14 text-fy-green mx-auto mb-6" />
        <h2 className="font-hud font-bold text-3xl text-white tracking-wider mb-3">申请已提交</h2>
        <p className="text-fy-steel text-sm mb-8">管理员将在24小时内审核你的申请</p>
        <Link to="/" className="btn-amber inline-block text-sm">返回首页</Link>
      </div>
    </div>
  );

  const requirements = [
    { icon: Gamepad2, title: '拥有游戏', desc: '《战术小队》正版' },
    { icon: Users, title: '团队意识', desc: '具备协作精神' },
    { icon: Clock, title: '时间投入', desc: '每周固定游戏时间' },
  ];

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />
        <p className="section-label mb-3">ENLISTMENT</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">加入肥鸭</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8 sm:mb-12">填写以下信息，申请加入FY战队</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20 mb-8 sm:mb-12">
          {requirements.map((item) => (<div key={item.title} className="bg-fy-panel p-4 sm:p-6 text-center hover:bg-fy-surface transition-colors"><item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-fy-amber mx-auto mb-2 sm:mb-3" /><h4 className="font-hud font-semibold text-white text-xs sm:text-sm tracking-wider mb-1">{item.title}</h4><p className="text-fy-steel text-xs">{item.desc}</p></div>))}
        </div>
        <div className="panel p-5 sm:p-8 hud-corners">
          <p className="section-label mb-6">APPLICATION FORM</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="data-label block mb-2">游戏ID *</label><input type="text" value={gameId} onChange={(e) => setGameId(e.target.value)} className={`w-full bg-transparent border-b py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 border-fy-green-dim/30 focus:border-fy-amber`} placeholder="Steam游戏ID" />{errors.gameId && <p className="text-fy-red text-xs mt-1">{errors.gameId}</p>}</div>
              <div><label className="data-label block mb-2">QQ号码 *</label><input type="text" value={qq} onChange={(e) => setQq(e.target.value)} className={`w-full bg-transparent border-b py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 border-fy-green-dim/30 focus:border-fy-amber`} placeholder="用于联系" />{errors.qq && <p className="text-fy-red text-xs mt-1">{errors.qq}</p>}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="data-label block mb-2">游戏时长（小时）</label><input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-transparent border-b py-3 text-white font-mono text-sm outline-none border-fy-green-dim/30 focus:border-fy-amber placeholder:text-fy-steel/30" placeholder="累计时长" />{errors.hours && <p className="text-fy-red text-xs mt-1">{errors.hours}</p>}</div>
              <div><label className="data-label block mb-2">擅长兵种</label><div className="grid grid-cols-2 gap-2 mt-1">{soldierTypes.map((type) => (<label key={type} className={`flex items-center gap-2 py-1.5 px-2 border cursor-pointer transition-colors text-xs ${selectedTypes.includes(type) ? 'border-fy-amber/50 bg-fy-amber/10 text-fy-amber' : 'border-fy-green-dim/30 text-fy-steel hover:border-fy-green-dim/50'}`}><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleSoldierType(type)} className="sr-only" /><span className={`w-3 h-3 border flex items-center justify-center shrink-0 ${selectedTypes.includes(type) ? 'border-fy-amber bg-fy-amber' : 'border-fy-green-dim/40'}`}>{selectedTypes.includes(type) && <span className="block w-1.5 h-1.5 bg-fy-dark" />}</span>{type}</label>))}</div></div>
            </div>
            <div><label className="data-label block mb-2">自我介绍 *</label><textarea required rows={4} value={intro} onChange={(e) => setIntro(e.target.value)} className="w-full bg-transparent border-b border-fy-green-dim/30 py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors resize-none placeholder:text-fy-steel/30" placeholder="简单介绍一下自己..." /></div>
            <button type="submit" className="btn-amber w-full text-sm">提交申请</button>
          </form>
        </div>
      </div>
    </div>
  );
}
