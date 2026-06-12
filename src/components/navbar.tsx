'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'fleet', href: '/fleet' },
  { key: 'services', href: '/#services' },
  { key: 'about', href: '/#about' },
  { key: 'policy', href: '/#policy' },
  { key: 'contact', href: '/#contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  // Close mobile menu on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-2 backdrop-blur-xl'
            : 'py-4 backdrop-blur-md',
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
            'rounded-2xl transition-all duration-500',
            scrolled
              ? 'glass-light dark:glass border border-gold-400/20 shadow-gold-sm'
              : 'border border-transparent',
          )}
        >
          <nav
            className="flex h-14 sm:h-16 items-center justify-between gap-3"
            aria-label="Primary"
          >
            <Link href="/" className="shrink-0">
              <Logo size={40} />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="group relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {t(item.key)}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-gradient group-hover:w-full transition-all duration-500" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <Link
                href="/#booking"
                className={cn(
                  'hidden sm:inline-flex items-center gap-2 rounded-full',
                  'bg-gold-gradient text-ink-900 px-5 py-2.5 text-sm font-bold',
                  'shadow-gold hover:shadow-gold-lg',
                  'transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]',
                )}
              >
                {t('book')}
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 bg-background/40 backdrop-blur-md"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? (
                  <X className="h-5 w-5 text-gold-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gold-300" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          clipPath: open
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(0% 0% 100% 0%)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden fixed inset-0 z-40 bg-ink-900/98 dark:bg-ink-900/98 backdrop-blur-2xl"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          <ul className="flex flex-col items-center gap-6">
            {navItems.map((item, i) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link
                  href={item.href}
                  className="text-3xl font-extrabold tracking-tight text-foreground hover:text-gold-300 transition-colors"
                >
                  {t(item.key)}
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            <Link
              href="/#booking"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient text-ink-900 px-6 py-3.5 text-base font-bold shadow-gold"
            >
              {t('book')}
            </Link>
            <a
              href="tel:+201557608942"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/40 px-6 py-3.5 text-base font-semibold text-gold-200"
            >
              <Phone className="h-4 w-4" />
              +20 155 760 8942
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
