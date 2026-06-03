import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, User, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface FormErrors {
  content?: string;
  contact?: string;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [nickname, setNickname] = useState('');
  const [contact, setContact] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const infoItems = [
    { icon: MessageSquare, label: 'QQ群', value: '147724008' },
    { icon: Mail, label: '邮箱', value: 'fy.squad@qq.com' },
    { icon: User, label: '管理员', value: 'FY_Commander' },
  ];

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!content.trim()) errs.content = '内容不能为空';
    if (!contact.trim()) errs.contact = '联系方式不能为空';
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ content: true, contact: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-fy-dark min-h-screen flex items-center justify-center px-6">
        <div className="text-center panel p-12 hud-corners max-w-md w-full">
          <CheckCircle className="w-14 h-14 text-fy-green mx-auto mb-6" style={{ animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)' }} />
          <style>{`@keyframes bounceIn { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }`}</style>
          <h2 className="font-hud font-bold text-3xl text-white tracking-wider mb-3">反馈已提交</h2>
          <p className="text-fy-steel text-sm mb-8">我们会尽快处理你的反馈</p>
          <Link to="/" className="btn-amber inline-block text-sm">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-fy-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-12" />
        <p className="section-label mb-3">COMMUNICATIONS</p>
        <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">联系我们</h1>
        <p className="text-fy-steel text-xs sm:text-sm mb-8 sm:mb-12">问题反馈与建议</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-fy-green-dim/20">
          <div className="bg-fy-panel p-4 sm:p-6">
            <p className="section-label mb-4 sm:mb-6">CONTACT INFO</p>
            <div className="space-y-4 sm:space-y-6">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center gap-2 mb-1"><item.icon className="w-3.5 h-3.5 text-fy-amber" /><span className="data-label">{item.label}</span></div>
                  <p className="font-mono text-xs sm:text-sm text-white pl-5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 bg-fy-panel p-4 sm:p-6">
            <p className="section-label mb-4 sm:mb-6">FEEDBACK FORM</p>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div><label className="data-label block mb-2">昵称</label><input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 sm:py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors placeholder:text-fy-steel/30" placeholder="你的称呼" /></div>
                <div><label className="data-label block mb-2">联系方式 *</label><input type="text" value={contact} onChange={(e) => { setContact(e.target.value); if (touched.contact) setErrors(validate()); }} onBlur={() => handleBlur('contact')} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-fy-steel/30 ${touched.contact && errors.contact ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="QQ或邮箱" />{touched.contact && errors.contact && <p className="text-fy-red text-xs mt-1">{errors.contact}</p>}</div>
              </div>
              <div><label className="data-label block mb-2">类型</label><select className="w-full bg-transparent border-b border-fy-green-dim/30 py-2.5 sm:py-3 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors appearance-none cursor-pointer"><option value="bug" className="bg-fy-panel">问题反馈</option><option value="suggest" className="bg-fy-panel">功能建议</option><option value="other" className="bg-fy-panel">其他</option></select></div>
              <div><label className="data-label block mb-2">内容 *</label><textarea rows={4} value={content} onChange={(e) => { setContent(e.target.value); if (touched.content) setErrors(validate()); }} onBlur={() => handleBlur('content')} className={`w-full bg-transparent border-b py-2.5 sm:py-3 text-white font-mono text-sm outline-none transition-colors resize-none placeholder:text-fy-steel/30 ${touched.content && errors.content ? 'border-fy-red focus:border-fy-red' : 'border-fy-green-dim/30 focus:border-fy-amber'}`} placeholder="详细描述你的反馈..." />{touched.content && errors.content && <p className="text-fy-red text-xs mt-1">{errors.content}</p>}</div>
              <button type="submit" className="btn-amber text-xs sm:text-sm">提交反馈</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}