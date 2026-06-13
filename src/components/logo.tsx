import * as React from 'react';
import { cn } from '@/lib/utils';

type LogoProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  showSubtext?: boolean;
};

/**
 * First Car — Rich Gold inline SVG logo.
 * The Arabic wordmark "فرست كار" sits above "First Car" in a clean sans-serif.
 * Pure SVG so it scales crisply and inherits `currentColor` only on the
 * stylized border mark; the gold gradient is locked to brand gold.
 */
export function Logo({ size = 44, showSubtext = true, className, ...props }: LogoProps) {
  const id = React.useId();
  return (
    <div
      className={cn('inline-flex items-center gap-3 select-none', className)}
      aria-label="First Car - فرست كار"
      role="img"
    >
      {/* Monogram mark — shield with stylized "F" and crown */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F1D989" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8941F" />
          </linearGradient>
          <linearGradient id={`gold-stroke-${id}`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F1D989" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#B8941F" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Outer shield */}
        <path
          d="M32 2 L60 12 V32 C60 47 47.5 57 32 62 C16.5 57 4 47 4 32 V12 Z"
          fill={`url(#gold-${id})`}
          opacity="0.08"
        />
        <path
          d="M32 2 L60 12 V32 C60 47 47.5 57 32 62 C16.5 57 4 47 4 32 V12 Z"
          stroke={`url(#gold-stroke-${id})`}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner double-line frame */}
        <path
          d="M32 8 L54 16 V32 C54 44 43.5 52.5 32 56.5 C20.5 52.5 10 44 10 32 V16 Z"
          stroke={`url(#gold-stroke-${id})`}
          strokeWidth="0.6"
          opacity="0.6"
          fill="none"
        />

        {/* Crown */}
        <path
          d="M22 22 L26 17 L30 21 L32 18 L34 21 L38 17 L42 22 V25 H22 Z"
          fill={`url(#gold-${id})`}
        />

        {/* Stylized "F" + swoosh */}
        <path
          d="M22 30 H42 V33 H25 V40 H38 V43 H25 V50 H22 Z"
          fill={`url(#gold-${id})`}
        />

        {/* Speed lines */}
        <path d="M14 44 H22" stroke={`url(#gold-stroke-${id})`} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 48 H19" stroke={`url(#gold-stroke-${id})`} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 52 H16" stroke={`url(#gold-stroke-${id})`} strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {showSubtext && (
        <div className="flex flex-col leading-none">
          <span
            className="font-arabic text-[1.45rem] sm:text-[1.6rem] font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #F1D989 0%, #D4AF37 50%, #B8941F 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(212,175,55,0.15)',
            }}
          >
            فرست كار
          </span>
          <span className="mt-1 text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-gold-400/90 font-medium">
            First Car
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
