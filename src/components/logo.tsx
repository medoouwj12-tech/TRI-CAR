import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
  showSubtext?: boolean;
};

/**
 * Al-Hisam Car Rental — Logo with car icon and brand name in Arabic.
 * Displays the Al-Hisam logo with the brand name text.
 */
export function Logo({ size = 44, showSubtext = true, className, ...props }: LogoProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-2 select-none', className)}
      aria-label="الحسام لايجار السيارات"
      role="img"
    >
      {/* Logo Image */}
      <div style={{ width: size + 20, height: size, position: 'relative', flexShrink: 0 }}>
        <Image
          src="/images/al-hisam-logo.svg"
          alt="الحسام"
          fill
          className="object-contain"
          priority
        />
      </div>

      {showSubtext && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[1.2rem] sm:text-[1.35rem] font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #F1D989 0%, #D4AF37 50%, #B8941F 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            dir="rtl"
          >
            الحسام
          </span>
          <span
            className="text-[0.7rem] sm:text-[0.75rem] font-semibold tracking-wider"
            style={{
              color: '#d4af37',
            }}
            dir="rtl"
          >
            تأجير السيارات
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
