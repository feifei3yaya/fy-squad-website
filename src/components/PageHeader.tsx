import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  showBack?: boolean;
  backText?: string;
  className?: string;
}

export default function PageHeader({
  showBack = true,
  backText = '返回首页',
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 overflow-hidden">
          <img
            src="/images/logo.png"
            alt="肥鸭战队"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 209, 102, 0.25))',
            }}
          />
        </div>
        <span className="font-hud font-bold text-fy-amber text-xs sm:text-sm tracking-widest">肥鸭战队</span>
      </Link>
      {showBack && (
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 text-fy-steel/60 hover:text-fy-amber transition-colors font-hud text-xs sm:text-sm tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{backText}</span>
        </Link>
      )}
    </div>
  );
}
