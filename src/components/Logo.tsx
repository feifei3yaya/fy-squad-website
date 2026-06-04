import { Link } from 'react-router-dom';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  showTextVertical?: boolean;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  linkTo?: string;
}

export default function Logo({
  size = 36,
  showText = true,
  className = '',
  showTextVertical = false,
  textSize = 'md',
  linkTo,
}: LogoProps) {
  const textSizeClass = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl',
  }[textSize];

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: size, height: size }}
      >
        <img
          src="/images/logo.png"
          alt="肥鸭战队 Logo"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(214, 164, 73, 0.32))',
          }}
        />
      </div>
      {showText && (
        <div className={showTextVertical ? 'flex flex-col leading-tight' : 'flex items-center gap-2'}>
          <span className={`font-hud font-bold text-fy-amber tracking-widest ${textSizeClass}`}>
            肥鸭战队
          </span>
          {!showTextVertical && (
            <span
              className="hidden sm:block text-xs tracking-wider font-hud text-white/85"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}
            >
              战术小队竞技社区
            </span>
          )}
          {showTextVertical && (
            <span
              className="text-[10px] tracking-[0.3em] font-hud text-white/85"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}
            >
              战术小队竞技社区
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }
  return content;
}
