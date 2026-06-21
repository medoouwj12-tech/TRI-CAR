'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Users, Fuel, Settings2, Star, Sparkles } from 'lucide-react';
import { Link as IntlLink } from '@/i18n/routing';
import { formatCurrency } from '@/lib/utils';
import type { Car } from '@/lib/cars.types';
import { cn } from '@/lib/utils';

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const t = useTranslations('fleet');
  const tDetails = useTranslations('details');
  const locale = useLocale();
  const href = `/fleet/${car.id}` as const;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className={cn(
        'group relative overflow-hidden rounded-3xl',
        'border border-gold-400/15 hover:border-gold-400/40',
        'bg-card transition-all duration-500',
        'hover:shadow-gold-lg hover:-translate-y-1',
      )}
    >
      {/* Featured badge */}
      {car.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink-900 shadow-gold">
          <Sparkles className="h-3 w-3" />
          {t('featured')}
        </div>
      )}



      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
        <motion.div
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent opacity-90" />
        {/* Hover gold glow */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-tr from-gold-400/0 via-gold-400/0 to-gold-400/15 transition-opacity duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-300 font-semibold">
              {t(`categories.${car.category}`)}
            </span>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold leading-tight text-foreground">
              {car.make} <span className="text-gold-gradient">{car.model}</span>
            </h3>
            <p className="text-xs text-foreground/50 mt-0.5">{car.year}</p>
          </div>
        </div>

        {/* Prices List */}
        <div className="space-y-2 my-4 text-xs">
          <div className="flex justify-between border-b border-gold-400/5 pb-1.5">
            <span className="text-foreground/60">إيجار يومي:</span>
            <span className="font-extrabold text-gold-600 dark:text-gold-200">{formatCurrency(car.pricePerDay, locale)}</span>
          </div>
          <div className="flex justify-between border-b border-gold-400/5 pb-1.5">
            <span className="text-foreground/60">إيجار أسبوعي:</span>
            <span className="font-extrabold text-gold-600 dark:text-gold-200">
              {car.pricePerWeek > 0 ? formatCurrency(car.pricePerWeek, locale) : '—'}
            </span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-foreground/60">إيجار شهري:</span>
            <span className="font-extrabold text-gold-600 dark:text-gold-200">
              {car.pricePerMonth > 0 ? formatCurrency(car.pricePerMonth, locale) : '—'}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gold-400/10 flex justify-end">
          <IntlLink
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-ink-900 px-5 py-2 text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all hover:scale-105 active:scale-95"
          >
            {t('book')}
          </IntlLink>
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-gold-400/10 bg-background/30 py-2.5">
      <Icon className="h-3.5 w-3.5 text-gold-300" />
      <span className="text-[10px] text-foreground/70 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

export default CarCard;
