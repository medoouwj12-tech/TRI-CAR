'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Car, Shield, Clock, Headphones, Sparkles, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = [Car, Shield, Clock, Headphones, Sparkles, MapPin] as const;
const keys = ['chauffeur', 'fleet', 'availability', 'concierge', 'vip', 'coverage'] as const;

export function HomeServices() {
  const t = useTranslations('home.services');

  return (
    <section id="services" className="relative py-24 sm:py-32 border-t border-gold-400/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-foreground">
            {t('title')}
          </h2>
          <p className="mt-4 text-foreground/60">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={cn(
                  'group rounded-3xl border border-gold-400/15 bg-card/60 backdrop-blur-xl p-6',
                  'hover:border-gold-400/40 hover:shadow-gold transition-all duration-500',
                )}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-ink-900 shadow-gold-sm mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
