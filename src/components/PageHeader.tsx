import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from './Logo';

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
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <Link to="/" className="flex items-center gap-2 sm:gap-3 group transition-transform duration-200 hover:scale-[1.02] active:scale-95">
        <Logo size={32} textSize="sm" />
      </Link>
      {showBack && (
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-fy-edge hover:bg-fy-panel/50 text-fy-steel/70 hover:text-fy-amber transition-all duration-200 font-hud text-xs sm:text-sm tracking-wider active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{backText}</span>
        </Link>
      )}
    </div>
  );
}
