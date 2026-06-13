'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CarCard } from '@/components/car-card';
import { FleetFilters } from '@/components/fleet-filters';
import type { Car } from '@/lib/cars.types';

type Cat = Car['category'];

export function FleetGrid({ cars }: { cars: Car[] }) {
  const t = useTranslations('fleet');
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<Cat | 'ALL'>('ALL');
  const [driverFilter, setDriverFilter] = React.useState<'ALL' | 'WITH' | 'SELF'>('ALL');
  const [minPassengers, setMinPassengers] = React.useState(1);

  React.useEffect(() => {
    const p = searchParams.get('passengers');
    if (p) {
      const n = Number(p);
      if (Number.isFinite(n) && n >= 1) setMinPassengers(n);
    }
  }, [searchParams]);

  const filtered = React.useMemo(() => {
    return cars.filter((c) => {
      if (c.seats < minPassengers) return false;
      if (category !== 'ALL' && c.category !== category) return false;
      if (driverFilter === 'WITH' && !c.withDriver) return false;
      if (driverFilter === 'SELF' && c.withDriver) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cars, query, category, driverFilter, minPassengers]);

  return (
    <section className="container py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
          {t('title')}
        </span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
          <span className="text-gold-gradient">{t('title')}</span>
        </h1>
        <p className="mt-4 text-foreground/60">{t('subtitle')}</p>
      </motion.div>

      <div className="mb-10">
        <FleetFilters
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          driverFilter={driverFilter}
          setDriverFilter={setDriverFilter}
          total={filtered.length}
        />
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-foreground/50"
        >
          <p className="text-lg">{t('filters.noResults')}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FleetGrid;
