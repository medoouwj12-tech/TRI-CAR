'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { routing, type Locale } from '@/i18n/routing';

const labels: Record<Locale, string> = {
  en: 'EN',
  ar: 'AR',
};

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const other: Locale = locale === 'ar' ? 'en' : 'ar';

  const switchTo = () => {
    router.replace(pathname, { locale: other });
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={`Switch language to ${labels[other]}`}
      className={cn(
        'group relative inline-flex h-10 items-center gap-1.5 rounded-full px-3',
        'border border-gold-400/30 bg-background/40 backdrop-blur-md',
        'hover:border-gold-400/70 hover:shadow-gold-sm',
        'transition-all duration-300 text-sm font-semibold tracking-wider',
        className,
      )}
    >
      <Languages className="h-4 w-4 text-gold-400" strokeWidth={1.7} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-gold-300"
        >
          {labels[locale]}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default LanguageToggle;
