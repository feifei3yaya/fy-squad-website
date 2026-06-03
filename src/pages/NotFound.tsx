import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

const militaryPhrases = [
  '目标区域未找到',
  '信号丢失',
  '坐标无效',
  '通讯中断',
  '区域已撤离',
  '目标不在射程内',
  '雷达未检测到目标',
  '该频段无响应',
  '导航系统故障',
  '作战区域不存在',
];

export default function NotFound() {
  const [phrase] = useState(() => militaryPhrases[Math.floor(Math.random() * militaryPhrases.length)]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-fy-dark min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md w-full">
        <h1 className="font-hud font-bold text-[8rem] sm:text-[12rem] text-white/[0.04] leading-none tracking-wider">404</h1>
        <h2 className="font-hud font-bold text-2xl sm:text-4xl text-white tracking-wider -mt-8 sm:-mt-12 mb-3">{phrase}</h2>
        <p className="text-fy-steel text-xs sm:text-sm mb-6 sm:mb-8">你请求的页面似乎已经撤离了该区域</p>

        <div className="relative mb-6 sm:mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索页面..."
            className="w-full bg-transparent border border-fy-green-dim/30 py-2.5 sm:py-3 px-4 pr-10 text-white font-mono text-sm outline-none focus:border-fy-amber transition-colors placeholder:text-fy-steel/30"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fy-steel/30" />
        </div>

        <Link to="/" className="btn-amber inline-flex items-center gap-2 text-xs sm:text-sm">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 返回基地
        </Link>
      </div>
    </div>
  );
}
