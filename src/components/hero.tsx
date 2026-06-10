'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, Users, ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react';
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

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 -z-20 bg-cover bg-right opacity-80"
          style={{ backgroundImage: "url('/images/hero-arabic-bg.svg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-800/65 to-ink-900/90" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[60rem] w-[60rem] rounded-full opacity-50"
          style={{
            background:
              'radial-gradient(closest-side, rgba(212,175,55,0.35), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div className="absolute inset-0 grain" />
      </motion.div>

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
        style={{ opacity: opacityFade }}
        className="container relative pt-32 sm:pt-36 lg:pt-40 pb-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-background/40 px-4 py-1.5 text-xs sm:text-sm backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-gold-100/90">{t('badge')}</span>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-[2rem] border border-gold-400/20 bg-[#3d2918]/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            >
              <motion.h1
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02] tracking-tight"
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
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 max-w-xl text-base sm:text-lg text-foreground/70 leading-relaxed"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
              <Link
                href="/#booking"
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full',
                  'bg-gold-gradient text-ink-900 px-7 py-3.5 text-sm sm:text-base font-bold',
                  'shadow-gold hover:shadow-gold-lg',
                  'transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]',
                )}
              >
                {t('search.cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-6 py-3.5 text-sm sm:text-base font-semibold text-gold-200 hover:bg-gold-400/5 transition-all duration-200"
              >
                {tFleet('viewAll')}
              </Link>
            </motion.div>
           </motion.div>
 
            <motion.dl
              initial={false}
              animate={{ opacity: 1, y: 0 }}
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

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 relative"
          >
            <CarVisual />
          </motion.div>
        </div>

        <motion.div
          id="booking"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14 lg:mt-20"
        >
          <SearchForm />
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => {
          const el = document.getElementById('fleet-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={false}
        animate={{ opacity: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold-300/80 hover:text-gold-200 transition-colors duration-200"
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
  const [passengers, setPassengers] = React.useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSearchPrefs({
      pickupLocation: pickup.trim() || undefined,
      dropoffLocation: dropoff.trim() || undefined,
      date: date || undefined,
      passengers,
    });
    const params = new URLSearchParams();
    if (passengers > 1) params.set('passengers', String(passengers));
    const qs = params.toString();
    router.push(qs ? `/fleet?${qs}` : '/fleet');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 sm:p-5">
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
        <Field icon={Users} label={t('passengers')}>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full bg-transparent text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n} className="bg-ink-900 text-foreground">
                {n} {n === 1 ? t('person') : t('people')}
              </option>
            ))}
          </select>
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

/**
 * Cinematic car visual — pure SVG / CSS, no external image dependency.
 * A sleek black-and-gold silhouette of a sedan that reads as "luxury"
 * without needing a real photo (which the user will add later).
 */
function CarVisual() {
  return (
    <div className="relative aspect-[4/3] w-full">
      {/* Halo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Subtle pedestal */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-3 rounded-full bg-gold-400/20 blur-xl" />

      <motion.svg
        viewBox="0 0 600 400"
        className="absolute inset-0 h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        aria-label="Luxury car"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="55%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F1D989" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8941F" />
          </linearGradient>
          <linearGradient id="goldHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="50%" stopColor="#F1D989" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Body */}
        <path
          d="M70 260 C 80 200, 130 160, 200 150 L 360 140 C 420 138, 470 155, 510 200 L 540 230 C 555 240, 560 255, 555 270 L 540 280 L 80 280 Z"
          fill="url(#bodyGrad)"
          stroke="url(#goldRim)"
          strokeWidth="1.2"
        />

        {/* Roof / glass */}
        <path
          d="M180 160 C 220 130, 280 120, 360 122 C 410 124, 450 145, 480 175 L 460 195 L 200 195 Z"
          fill="url(#windowGrad)"
          stroke="url(#goldRim)"
          strokeWidth="0.8"
          opacity="0.9"
        />

        {/* Window divider */}
        <line
          x1="320"
          y1="125"
          x2="320"
          y2="195"
          stroke="url(#goldRim)"
          strokeWidth="0.8"
        />

        {/* Gold highlight strip */}
        <rect
          x="80"
          y="240"
          width="470"
          height="2"
          fill="url(#goldHighlight)"
          opacity="0.7"
        />

        {/* Door lines */}
        <path
          d="M230 195 L 230 270"
          stroke="url(#goldRim)"
          strokeWidth="0.6"
          opacity="0.4"
        />
        <path
          d="M340 195 L 340 270"
          stroke="url(#goldRim)"
          strokeWidth="0.6"
          opacity="0.4"
        />
        <path
          d="M420 195 L 420 270"
          stroke="url(#goldRim)"
          strokeWidth="0.6"
          opacity="0.4"
        />

        {/* Headlight */}
        <path
          d="M70 240 C 60 240, 55 248, 60 258 L 90 258 L 95 248 Z"
          fill="#F1D989"
          opacity="0.95"
        />
        <ellipse cx="76" cy="248" rx="6" ry="2" fill="#fff" opacity="0.8" />

        {/* Taillight */}
        <path
          d="M540 240 L 555 240 C 560 245, 558 255, 552 258 L 540 258 Z"
          fill="#D4AF37"
          opacity="0.8"
        />

        {/* Grille */}
        <rect
          x="60"
          y="260"
          width="35"
          height="6"
          rx="1"
          fill="url(#goldRim)"
          opacity="0.6"
        />

        {/* Front wheel arch */}
        <ellipse
          cx="170"
          cy="280"
          rx="55"
          ry="22"
          fill="#000"
        />
        {/* Rear wheel arch */}
        <ellipse
          cx="450"
          cy="280"
          rx="55"
          ry="22"
          fill="#000"
        />

        {/* Front wheel */}
        <g>
          <circle cx="170" cy="285" r="32" fill="#0a0a0a" stroke="url(#goldRim)" strokeWidth="1" />
          <circle cx="170" cy="285" r="20" fill="#1a1a1a" stroke="url(#goldRim)" strokeWidth="0.6" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={`f-${deg}`}
              x1="170"
              y1="285"
              x2={170 + 18 * Math.cos((deg * Math.PI) / 180)}
              y2={285 + 18 * Math.sin((deg * Math.PI) / 180)}
              stroke="url(#goldRim)"
              strokeWidth="1"
            />
          ))}
          <circle cx="170" cy="285" r="4" fill="url(#goldRim)" />
        </g>

        {/* Rear wheel */}
        <g>
          <circle cx="450" cy="285" r="32" fill="#0a0a0a" stroke="url(#goldRim)" strokeWidth="1" />
          <circle cx="450" cy="285" r="20" fill="#1a1a1a" stroke="url(#goldRim)" strokeWidth="0.6" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={`r-${deg}`}
              x1="450"
              y1="285"
              x2={450 + 18 * Math.cos((deg * Math.PI) / 180)}
              y2={285 + 18 * Math.sin((deg * Math.PI) / 180)}
              stroke="url(#goldRim)"
              strokeWidth="1"
            />
          ))}
          <circle cx="450" cy="285" r="4" fill="url(#goldRim)" />
        </g>

        {/* Ground reflection */}
        <ellipse
          cx="310"
          cy="335"
          rx="240"
          ry="6"
          fill="url(#goldHighlight)"
          opacity="0.3"
        />
      </motion.svg>

      {/* Floating gold particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold-300"
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${5 + (i * 13) % 85}%`,
            boxShadow: '0 0 10px rgba(241, 217, 137, 0.8)',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-2xl border border-gold-400/30 glass dark:glass px-3 py-2 flex items-center gap-2 shadow-gold-sm"
      >
        <Star className="h-4 w-4 text-gold-300 fill-gold-300" />
        <span className="text-sm font-bold text-foreground">4.9</span>
        <span className="text-xs text-foreground/60">VIP</span>
      </motion.div>
    </div>
  );
}

export default Hero;
