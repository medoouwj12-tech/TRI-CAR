'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function HomeContact() {
  const t = useTranslations('home.contact');
  const [sent, setSent] = React.useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const message = String(fd.get('message') || '').trim();

    const text =
      `${t('whatsappIntro')}\n` +
      `${t('fields.name')}: ${name}\n` +
      `${t('fields.phone')}: ${phone}\n` +
      `${t('fields.message')}: ${message}`;

    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-gold-400/10">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <ContactItem icon={Phone} label={t('info.phone')} value="+20 112 331 1000" href="tel:+201123311000" />
            <ContactItem icon={Mail} label={t('info.email')} value="info@alhossam-cars.eg" href="mailto:info@alhossam-cars.eg" />
            <ContactItem icon={MapPin} label={t('info.address')} value={t('info.addressValue')} />
            <a
              href={buildWhatsAppUrl(t('whatsappDefault'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-ink-900 px-5 py-3 text-sm font-bold shadow-gold hover:shadow-gold-lg transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              {t('whatsappCta')}
            </a>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-3xl border border-gold-400/20 bg-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-4"
          >
            <Field name="name" label={t('fields.name')} required />
            <Field name="phone" label={t('fields.phone')} required dir="ltr" />
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                {t('fields.message')}
              </span>
              <textarea
                name="message"
                rows={4}
                required
                className="mt-1.5 w-full rounded-2xl border border-gold-400/20 bg-background/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 focus:shadow-gold-sm transition-all resize-none"
              />
            </label>
            <button
              type="submit"
              className={cn(
                'w-full rounded-full bg-gold-gradient text-ink-900 py-3.5 text-sm font-bold shadow-gold',
                'hover:shadow-gold-lg transition-all hover:scale-[1.01] active:scale-[0.99]',
              )}
            >
              {t('submit')}
            </button>
            {sent && (
              <p className="text-xs text-gold-300 text-center">{t('sent')}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-gold-400/15 bg-background/30 px-4 py-3">
      <Icon className="h-4 w-4 text-gold-300 mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] uppercase tracking-widest text-foreground/50">{label}</p>
        <p className="text-sm text-foreground/80 mt-0.5">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:opacity-90 transition-opacity">
        {inner}
      </a>
    );
  }
  return inner;
}

function Field({
  name,
  label,
  required,
  dir,
}: {
  name: string;
  label: string;
  required?: boolean;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-foreground/50">{label}</span>
      <input
        name={name}
        required={required}
        dir={dir}
        className="mt-1.5 w-full rounded-2xl border border-gold-400/20 bg-background/40 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 focus:shadow-gold-sm transition-all"
      />
    </label>
  );
}
