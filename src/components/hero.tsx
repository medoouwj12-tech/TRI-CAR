'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { saveSearchPrefs } from '@/lib/search-prefs';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations('hero');
  const tFleet = useTranslations('fleet');
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yCar = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const stats = [
    { value: '120+', key: 'cars' as const },
    { value: '8K+', key: 'trips' as const },
    { value: '4.9', key: 'rating' as const },
    { value: '24/7', key: 'support' as const },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900"
      aria-label="Hero"
    >
      {/* Layered backgrounds */}
      <motion.div
        style={{ y: yBg, scale: scaleFade }}
        className="absolute inset-0 -z-10"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-banner.png')",
          }}
        />
        {/* Gradients to merge background image cleanly with web colors and text */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/70 to-ink-900/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/20 via-transparent to-ink-900" />
        {/* Radial gold glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] rounded-full opacity-35"
          style={{
            background:
              'radial-gradient(closest-side, rgba(212,175,55,0.35), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Subtle film grain */}
        <div className="absolute inset-0 grain" />
      </motion.div>

      {/* Decorative grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <motion.div
        style={{ y: yCar, opacity: opacityFade }}
        className="container relative pt-32 sm:pt-36 lg:pt-40 pb-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-background/40 px-4 py-1.5 text-xs sm:text-sm backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-gold-100/90">{t('badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02] tracking-tight"
            >
              <span className="block text-foreground">{t('title')}</span>
              <span
                className="block mt-2 text-gold-gradient"
                style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.25))' }}
              >
                {t('titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.45 }}
              className="mt-6 max-w-xl text-base sm:text-lg text-foreground/70 leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/#booking"
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full',
                  'bg-gold-gradient text-ink-900 px-7 py-3.5 text-sm sm:text-base font-bold',
                  'shadow-gold hover:shadow-gold-lg',
                  'transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]',
                )}
              >
                {t('search.cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-3.5 text-sm sm:text-base font-semibold text-gold-200 hover:bg-gold-400/5 transition-all"
              >
                {tFleet('viewAll')}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.8 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl"
            >
              {stats.map((s, i) => (
                <div key={s.key} className="relative">
                  <dt className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs sm:text-sm text-foreground/60 tracking-wider">
                    {t(`stats.${s.key}`)}
                  </dd>
                  {i < stats.length - 1 && (
                    <span className="hidden sm:block absolute right-0 top-1.5 h-10 w-px bg-gold-400/15" />
                  )}
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Spacer to expose the keys and horse logo on the right side of the background banner */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>

        {/* Search form overlay */}
        <motion.div
          id="booking"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="mt-14 lg:mt-20"
        >
          <SearchForm />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => {
          const el = document.getElementById('fleet-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold-300/80 hover:text-gold-200"
        aria-label="Scroll to fleet"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">{t('explore')}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}

function SearchForm() {
  const t = useTranslations('hero.search');
  const router = useRouter();
  const [pickup, setPickup] = React.useState('');
  const [dropoff, setDropoff] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSearchPrefs({
      pickupLocation: pickup.trim() || undefined,
      dropoffLocation: dropoff.trim() || undefined,
      date: date || undefined,
    });
    router.push('/fleet');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'group relative overflow-hidden rounded-3xl',
        'border border-gold-400/25 shadow-gold',
        'glass dark:glass',
      )}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold-400/[0.04] via-transparent to-gold-400/[0.06]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 sm:p-5">
        <Field icon={MapPin} label={t('pickup')}>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder={t('pickupPlaceholder')}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
        </Field>
        <Field icon={MapPin} label={t('dropoff')}>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder={t('dropoffPlaceholder')}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
        </Field>
        <Field icon={Calendar} label={t('date')}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground/90 focus:outline-none [color-scheme:dark]"
          />
        </Field>
        <button
          type="submit"
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-2xl',
            'bg-gold-gradient text-ink-900 px-5 py-3.5 text-sm font-bold',
            'shadow-gold hover:shadow-gold-lg',
            'transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
          )}
        >
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group/field flex items-center gap-3 rounded-2xl border border-gold-400/15 bg-background/30 px-4 py-3 hover:border-gold-400/40 focus-within:border-gold-400/60 focus-within:shadow-gold-sm transition-all">
      <Icon className="h-4 w-4 text-gold-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-widest text-foreground/50">
          {label}
        </span>
        <div className="mt-0.5">{children}</div>
      </div>
    </label>
  );
}

export default Hero;
