'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Car } from '@/lib/cars.types';

type Cat = Car['category'];

export function FleetFilters({
  query,
  setQuery,
  category,
  setCategory,
  driverFilter,
  setDriverFilter,
  total,
}: {
  query: string;
  setQuery: (v: string) => void;
  category: Cat | 'ALL';
  setCategory: (v: Cat | 'ALL') => void;
  driverFilter: 'ALL' | 'WITH' | 'SELF';
  setDriverFilter: (v: 'ALL' | 'WITH' | 'SELF') => void;
  total: number;
}) {
  const t = useTranslations('fleet');
  const cats: Array<Cat | 'ALL'> = ['ALL', 'LUXURY', 'SUV', 'SEDAN', 'SPORTS', 'VAN', 'ELECTRIC'];

  return (
    <div className="rounded-3xl border border-gold-400/15 bg-card/60 backdrop-blur-xl p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 flex items-center gap-3 rounded-2xl border border-gold-400/20 bg-background/50 px-4 py-3 focus-within:border-gold-400/50 focus-within:shadow-gold-sm transition-all">
          <Search className="h-4 w-4 text-gold-300 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('filters.search')}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={() => setQuery('')}
                className="rounded-full p-1 hover:bg-gold-400/10"
                aria-label="Clear"
              >
                <X className="h-3.5 w-3.5 text-gold-300" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 hidden sm:inline-flex items-center gap-1">
            <Filter className="h-3 w-3" />
            {t('filters.category')}:
          </span>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300',
                category === c
                  ? 'bg-gold-gradient text-ink-900 shadow-gold-sm'
                  : 'border border-gold-400/20 text-foreground/70 hover:border-gold-400/50 hover:text-gold-200',
              )}
            >
              {c === 'ALL' ? t('filters.all') : t(`categories.${c}`)}
            </button>
          ))}
        </div>

        {/* Driver filter */}
        <div className="flex items-center gap-1.5 rounded-full border border-gold-400/20 p-1 self-start">
          {(
            [
              { v: 'ALL', l: t('filters.all') },
              { v: 'WITH', l: t('filters.withDriver') },
              { v: 'SELF', l: t('filters.selfDrive') },
            ] as const
          ).map((opt) => (
            <button
              key={opt.v}
              onClick={() => setDriverFilter(opt.v)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all',
                driverFilter === opt.v
                  ? 'bg-gold-gradient text-ink-900'
                  : 'text-foreground/70 hover:text-gold-200',
              )}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mt-3 pt-3 border-t border-gold-400/10 text-xs text-foreground/50">
        <span className="text-gold-300 font-bold">{total}</span> {t('filters.results')}
      </div>
    </div>
  );
}

export default FleetFilters;
