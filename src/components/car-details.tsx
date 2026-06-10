'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Users, Fuel, Settings2, Star, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Link as IntlLink } from '@/i18n/routing';
import { formatCurrency, buildWhatsAppUrl } from '@/lib/utils';
import type { Car } from '@/lib/cars.types';
import { cn } from '@/lib/utils';
import { BookingForm } from './booking-form';

export function CarDetails({ car }: { car: Car }) {
  const t = useTranslations('details');
  const tFleet = useTranslations('fleet');
  const locale = useLocale();
  const [activeImg, setActiveImg] = React.useState(0);

  const gallery = car.gallery.length > 0 ? car.gallery : [car.imageUrl];
  const waMsg = `مرحباً، أرغب في حجز سيارة من فرست كار.\nالاسم: [الاسم]\nالعربية: ${car.make} ${car.model}\nعدد الركاب: ${car.seats}\nمن: [الاستلام]\nإلى: [الوصول]\nالتاريخ: [التاريخ]`;
  const waHref = buildWhatsAppUrl(waMsg);

  return (
    <section className="container py-12 sm:py-20">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <IntlLink
          href="/fleet"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold-300 transition-colors"
        >
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          {t('back')}
        </IntlLink>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery + content */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-ink-700 border border-gold-400/20 shadow-gold"
          >
            <Image
              src={gallery[activeImg]}
              alt={`${car.make} ${car.model}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            {car.featured && (
              <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-full bg-gold-gradient px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-ink-900 shadow-gold">
                <Sparkles className="h-3 w-3" />
                {tFleet('featured')}
              </div>
            )}
          </motion.div>

          {/* Thumbs */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all',
                    activeImg === i
                      ? 'border-gold-400 shadow-gold-sm'
                      : 'border-transparent opacity-60 hover:opacity-100',
                  )}
                >
                  <Image src={src} alt="" fill sizes="200px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title + category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-semibold">
              {tFleet(`categories.${car.category}`)} · {car.year}
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {car.make} <span className="text-gold-gradient">{car.model}</span>
            </h1>
          </motion.div>

          {/* Specs grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <SpecBox icon={Users} label={tFleet('seats')} value={`${car.seats}`} />
            <SpecBox icon={Settings2} label={tFleet('transmission.AUTOMATIC') === 'أوتوماتيك' ? 'ناقل' : 'Trans'} value={tFleet(`transmission.${car.transmission}`)} />
            <SpecBox icon={Fuel} label={tFleet('fuel.GASOLINE') === 'بنزين' ? 'الوقود' : 'Fuel'} value={tFleet(`fuel.${car.fuelType}`)} />
            <SpecBox icon={Star} label={tFleet('filters.withDriver') === 'مع سائق' ? 'السائق' : 'Driver'} value={car.withDriver ? '✓' : '—'} />
          </motion.div>

          {/* Description */}
          {car.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border border-gold-400/15 bg-card/50 p-6"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-gold-300 mb-3">
                {t('description')}
              </h2>
              <p className="text-foreground/80 leading-relaxed">{car.description}</p>
            </motion.div>
          )}

          {/* Features */}
          {car.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-gold-400/15 bg-card/50 p-6"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-gold-300 mb-4">
                {t('features')}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Sticky booking panel */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-gold-400/30 bg-card/80 backdrop-blur-xl p-6 shadow-gold"
            >
              <p className="text-[10px] uppercase tracking-widest text-foreground/50">
                {t('from')}
              </p>
              <p className="text-4xl font-extrabold text-gold-gradient mt-1">
                {formatCurrency(car.pricePerDay, locale)}
                <span className="text-base font-normal text-foreground/50"> / {tFleet('perDay')}</span>
              </p>
              {car.pricePerHour && (
                <p className="text-sm text-foreground/60 mt-1">
                  {formatCurrency(car.pricePerHour, locale)} / {tFleet('perHour')}
                </p>
              )}

              <div className="my-5 border-t border-gold-400/15" />

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient text-ink-900 px-5 py-3.5 text-sm font-bold shadow-gold hover:shadow-gold-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('bookNow')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </motion.div>

            {/* Multi-step booking form */}
            <BookingForm car={car} />
          </div>
        </aside>
      </div>
    </section>
  );
}

function SpecBox({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gold-400/15 bg-card/50 p-4 text-center">
      <Icon className="h-5 w-5 text-gold-300 mx-auto" />
      <p className="mt-2 text-[10px] uppercase tracking-widest text-foreground/50">{label}</p>
      <p className="text-sm font-bold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

export default CarDetails;
