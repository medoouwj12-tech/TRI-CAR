'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from 'lucide-react';
import { Logo } from './logo';
import { Link } from '@/i18n/routing';

const linkGroups = [
  {
    titleKey: 'company' as const,
    links: [
      { key: 'about', href: '/#about' },
      { key: 'fleet', href: '/fleet' },
      { key: 'services', href: '/#services' },
      { key: 'contact', href: '/#contact' },
    ],
  },
  {
    titleKey: 'support' as const,
    links: [
      { key: 'contact', href: '/#contact' },
      { key: 'fleet', href: '/fleet' },
      { key: 'nav.book', href: '/#booking' },
    ],
  },
];

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-gold-400/15 bg-ink-900 text-foreground/80 overflow-hidden">
      {/* Decorative gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[60rem] rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="container relative py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-5">
            <Logo size={48} />
            <p className="mt-5 max-w-sm text-foreground/60 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm">
              <a href="tel:+201557608942" className="flex items-center gap-2 hover:text-gold-300 transition-colors">
                <Phone className="h-4 w-4 text-gold-400" /> +20 155 760 8942
              </a>
              <a href="mailto:booking@firstcar.eg" className="flex items-center gap-2 hover:text-gold-300 transition-colors">
                <Mail className="h-4 w-4 text-gold-400" /> booking@firstcar.eg
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" /> Cairo, Egypt
              </span>
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.titleKey} className="md:col-span-3">
              <h4 className="text-gold-300 font-semibold tracking-wider text-sm uppercase">
                {t(group.titleKey)}
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map((l) => (
                  <li key={`${group.titleKey}-${l.href}-${l.key}`}>
                    <Link href={l.href} className="hover:text-gold-300 transition-colors">
                      {l.key.startsWith('nav.') ? tNav(l.key.slice(4) as any) : tNav(l.key as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:flex-col md:items-end gap-4">
            <h4 className="text-gold-300 font-semibold tracking-wider text-sm uppercase md:sr-only">
              {t('followUs')}
            </h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Send, label: 'WhatsApp' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 hover:border-gold-400/80 hover:text-gold-300 hover:shadow-gold-sm transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-14 pt-6 border-t border-gold-400/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/50">
          <p>© {year} فرست كار — First Car. {t('rights')}.</p>
          <p className="tracking-widest uppercase">Crafted for excellence</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
