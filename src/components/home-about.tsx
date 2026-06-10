'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Award, Users, Globe2, CheckCircle2 } from 'lucide-react';

const highlights = ['experience', 'clients', 'cities', 'quality'] as const;
const icons = [Award, Users, Globe2, CheckCircle2] as const;

export function HomeAbout() {
  const t = useTranslations('home.about');

  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-gold-400/10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.2), transparent 55%)',
        }}
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
              {t('eyebrow')}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              {t('title')}
            </h2>
            <p className="mt-6 text-foreground/65 leading-relaxed">{t('p1')}</p>
            <p className="mt-4 text-foreground/65 leading-relaxed">{t('p2')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((key, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={key}
                  className="rounded-3xl border border-gold-400/20 bg-card/70 backdrop-blur-xl p-5 sm:p-6 text-center"
                >
                  <Icon className="h-6 w-6 text-gold-300 mx-auto mb-3" />
                  <p className="text-2xl sm:text-3xl font-extrabold text-gold-gradient">
                    {t(`stats.${key}.value`)}
                  </p>
                  <p className="mt-1 text-xs text-foreground/55">{t(`stats.${key}.label`)}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
