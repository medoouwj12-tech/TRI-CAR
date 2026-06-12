'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FileText,
  ClipboardCheck,
  Clock,
  ShieldCheck,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionKey = 'docs' | 'handover' | 'timeDistance' | 'deposit' | 'violations';

const sections: { key: SectionKey; Icon: typeof FileText }[] = [
  { key: 'docs', Icon: FileText },
  { key: 'handover', Icon: ClipboardCheck },
  { key: 'timeDistance', Icon: Clock },
  { key: 'deposit', Icon: ShieldCheck },
  { key: 'violations', Icon: AlertCircle },
];

export function HomePolicy() {
  const t = useTranslations('home.policy');

  return (
    <section
      id="policy"
      className="relative py-24 sm:py-32 border-t border-gold-400/10 overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.18), transparent 55%)',
        }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-foreground/60 leading-relaxed">{t('intro')}</p>
        </motion.div>

        {/* Sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map(({ key, Icon }, i) => {
            const items = t.raw(`sections.${key}.items`) as Record<string, string>;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={cn(
                  'rounded-3xl border border-gold-400/15 bg-card/60 backdrop-blur-xl p-6 sm:p-7',
                  'hover:border-gold-400/40 hover:shadow-gold transition-all duration-500',
                )}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-ink-900 shadow-gold-sm shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {t(`sections.${key}.title`)}
                  </h3>
                </div>

                <ol className="space-y-3">
                  {Object.entries(items).map(([num, text]) => (
                    <li
                      key={num}
                      className="flex gap-3 text-sm sm:text-[0.95rem] text-foreground/70 leading-relaxed"
                    >
                      <span className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold-400/40 text-gold-300 text-xs font-bold mt-0.5">
                        {num}
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            );
          })}
        </div>

        {/* Signature footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 rounded-3xl border border-gold-400/20 bg-card/40 backdrop-blur-xl px-8 py-6">
            <p className="text-gold-gradient font-semibold text-base sm:text-lg">
              {t('signature')}
            </p>
            <p className="text-foreground/80 font-bold text-lg sm:text-xl">
              {t('manager')}
            </p>
            <a
              href={`tel:+201123311000`}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-gold-300 transition-colors"
              dir="ltr"
            >
              <Phone className="h-4 w-4" />
              {t('phone')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomePolicy;
