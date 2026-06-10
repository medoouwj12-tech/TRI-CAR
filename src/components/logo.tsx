import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
  showSubtext?: boolean;
};

/**
 * TRI CAR — Logo with car image and brand name.
 * Displays the TRI CAR logo with the brand name text.
 */
export function Logo({ size = 44, showSubtext = true, className, ...props }: LogoProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-3 select-none', className)}
      aria-label="TRI CAR"
      role="img"
    >
      {/* Logo Image */}
      <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
        <Image
          src="/images/tri-car-logo.png"
          alt="TRI CAR Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {showSubtext && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[1.45rem] sm:text-[1.6rem] font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #F1D989 0%, #D4AF37 50%, #B8941F 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(212,175,55,0.15)',
            }}
          >
            TRI CAR
          </span>
        </div>
      )}
    </div>
  );
}

export default Logo;
