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

const Spec = React.memo(({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <div className="flex flex-col items-center gap-1 rounded-xl border border-gold-400/10 bg-background/30 py-2.5">
    <Icon className="h-3.5 w-3.5 text-gold-300" />
    <span className="text-[10px] text-foreground/70 font-medium text-center leading-tight">{label}</span>
  </div>
));
Spec.displayName = 'Spec';

export const CarCard = React.memo(function CarCard({ car }: { car: Car }) {
  const t = useTranslations('fleet');
  const tDetails = useTranslations('details');
  const locale = useLocale();
  const href = `/fleet/${car.id}` as const;

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      whileHover="hover"
      className={cn(
        'group relative overflow-hidden rounded-3xl',
        'border border-gold-400/15 hover:border-gold-400/40',
        'bg-card transition-all duration-300',
        'hover:shadow-gold-lg hover:-translate-y-1',
      )}
    >
      {car.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink-900 shadow-gold">
          <Sparkles className="h-3 w-3" />
          {t('featured')}
        </div>
      )}

      {car.withDriver && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full glass-light dark:glass border border-gold-400/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-200">
          <Star className="h-3 w-3 text-gold-300 fill-gold-300" />
          {t('filters.withDriver')}
        </div>
      )}

      <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
        <motion.div
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent opacity-90" />
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-tr from-gold-400/0 via-gold-400/0 to-gold-400/15 transition-opacity duration-500"
        />
      </div>

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

        <div className="grid grid-cols-3 gap-2 my-4">
          <Spec icon={Users} label={`${car.seats} ${t('seats')}`} />
          <Spec icon={Settings2} label={t(`transmission.${car.transmission}`)} />
          <Spec icon={Fuel} label={t(`fuel.${car.fuelType}`)} />
        </div>

        <div className="flex items-end justify-between gap-3 pt-4 border-t border-gold-400/10">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-foreground/50">
              {tDetails('from')}
            </p>
            <p className="text-2xl font-extrabold text-gold-gradient">
              {formatCurrency(car.pricePerDay, locale)}
              <span className="text-xs font-normal text-foreground/50"> / {t('perDay')}</span>
            </p>
          </div>
          <IntlLink
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-ink-900 px-4 py-2 text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all hover:scale-105 active:scale-95"
          >
            {t('book')}
          </IntlLink>
        </div>
      </div>
    </motion.article>
  );
});

export default CarCard;
