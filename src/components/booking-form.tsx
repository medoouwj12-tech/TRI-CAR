'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Check, Calendar, MapPin, User, Phone, Users, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { loadSearchPrefs } from '@/lib/search-prefs';
import type { Car } from '@/lib/cars.types';
import { cn } from '@/lib/utils';

type Step = 0 | 1 | 2 | 3;

interface FormState {
  name: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  passengers: number;
  notes: string;
}

const initial: FormState = {
  name: '',
  phone: '',
  email: '',
  pickupLocation: '',
  dropoffLocation: '',
  date: '',
  time: '',
  passengers: 1,
  notes: '',
};

export function BookingForm({ car }: { car: Car }) {
  const t = useTranslations('booking');
  const tFleet = useTranslations('fleet');
  const locale = useLocale();
  const [step, setStep] = React.useState<Step>(0);
  const [data, setData] = React.useState<FormState>(initial);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    const prefs = loadSearchPrefs();
    if (!prefs) return;
    setData((d) => ({
      ...d,
      pickupLocation: prefs.pickupLocation || d.pickupLocation,
      dropoffLocation: prefs.dropoffLocation || d.dropoffLocation,
      date: prefs.date || d.date,
      passengers: prefs.passengers || d.passengers,
    }));
  }, []);

  const set = (k: keyof FormState, v: any) => setData((d) => ({ ...d, [k]: v }));

  const canNext = (() => {
    if (step === 1) return data.name.trim().length >= 2 && data.phone.trim().length >= 8;
    if (step === 2)
      return (
        data.pickupLocation.trim().length >= 2 &&
        data.dropoffLocation.trim().length >= 2 &&
        !!data.date
      );
    return true;
  })();

  const submit = async () => {
    setSubmitting(true);

    // Build WhatsApp message in the exact requested format
    const message =
      `مرحباً، أرغب في حجز سيارة من فرست كار.\n` +
      `الاسم: ${data.name}\n` +
      `العربية: ${car.make} ${car.model}\n` +
      `عدد الركاب: ${data.passengers}\n` +
      `من: ${data.pickupLocation}\n` +
      `إلى: ${data.dropoffLocation}\n` +
      `التاريخ: ${data.date}${data.time ? ' ' + data.time : ''}` +
      (data.notes ? `\nملاحظات: ${data.notes}` : '');

    // Try to persist to DB (best-effort, won't break UX if it fails)
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car.id,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          pickupLocation: data.pickupLocation,
          dropoffLocation: data.dropoffLocation,
          date: data.date,
          passengers: data.passengers,
          notes: data.notes || null,
        }),
      });
    } catch {
      /* noop */
    }

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
    setTimeout(() => setSubmitting(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="rounded-3xl border border-gold-400/20 bg-card/80 backdrop-blur-xl p-5 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-4 w-4 text-gold-300" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-gold-300">
          {t('title')}
        </h3>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1.5 mb-5">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-500',
              s <= step ? 'bg-gold-gradient' : 'bg-gold-400/15',
            )}
          />
        ))}
      </div>

      <div className="text-[10px] uppercase tracking-widest text-foreground/50 mb-4">
        {t('step')} {step + 1} {t('of')} 4 · {t(`steps.${['car', 'details', 'trip', 'review'][step]}`)}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {step === 0 && (
            <div className="rounded-2xl border border-gold-400/20 bg-background/30 p-4 flex items-center gap-3">
              <div className="h-12 w-16 rounded-lg bg-ink-700 flex items-center justify-center text-gold-300 font-bold text-xs shrink-0">
                {car.make.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-gold-300">
                  {tFleet(`categories.${car.category}`)}
                </p>
                <p className="text-sm font-bold truncate">
                  {car.make} {car.model}
                </p>
                <p className="text-xs text-foreground/50">
                  {car.year} · {car.seats} {tFleet('seats')}
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <Field icon={User} label={t('fields.name')}>
                <input
                  value={data.name}
                  onChange={(e) => set('name', e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                  placeholder="أحمد محمد"
                />
              </Field>
              <Field icon={Phone} label={t('fields.phone')}>
                <input
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  type="tel"
                  className="w-full bg-transparent text-sm focus:outline-none"
                  placeholder="+20 1xx xxx xxxx"
                  dir="ltr"
                />
              </Field>
              <Field icon={User} label={t('fields.email')}>
                <input
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  type="email"
                  className="w-full bg-transparent text-sm focus:outline-none"
                  placeholder="optional"
                  dir="ltr"
                />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <Field icon={MapPin} label={t('fields.pickup')}>
                <input
                  value={data.pickupLocation}
                  onChange={(e) => set('pickupLocation', e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                  placeholder="Cairo Airport"
                />
              </Field>
              <Field icon={MapPin} label={t('fields.dropoff')}>
                <input
                  value={data.dropoffLocation}
                  onChange={(e) => set('dropoffLocation', e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                  placeholder="New Capital"
                />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                <Field icon={Calendar} label={t('fields.date')}>
                  <input
                    value={data.date}
                    onChange={(e) => set('date', e.target.value)}
                    type="date"
                    className="w-full bg-transparent text-sm focus:outline-none [color-scheme:dark]"
                  />
                </Field>
                <Field icon={Calendar} label={t('fields.time')}>
                  <input
                    value={data.time}
                    onChange={(e) => set('time', e.target.value)}
                    type="time"
                    className="w-full bg-transparent text-sm focus:outline-none [color-scheme:dark]"
                  />
                </Field>
              </div>
              <Field icon={Users} label={t('fields.passengers')}>
                <select
                  value={data.passengers}
                  onChange={(e) => set('passengers', parseInt(e.target.value, 10))}
                  className="w-full bg-transparent text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  {Array.from({ length: car.seats }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-ink-900">
                      {i + 1}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          {step === 3 && (
            <div className="space-y-2 text-sm">
              <Row k={t('review.car')} v={`${car.make} ${car.model}`} />
              <Row k={t('review.name')} v={data.name} />
              <Row k={t('review.phone')} v={data.phone} />
              <Row k={t('fields.pickup')} v={data.pickupLocation} />
              <Row k={t('fields.dropoff')} v={data.dropoffLocation} />
              <Row
                k={t('fields.date')}
                v={`${data.date}${data.time ? ' · ' + data.time : ''}`}
              />
              <Row k={t('review.passengers')} v={String(data.passengers)} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-5 flex items-center gap-2">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="flex-1 rounded-full border border-gold-400/30 px-4 py-2.5 text-xs font-semibold text-gold-200 hover:bg-gold-400/5 transition-all"
          >
            {t('back')}
          </button>
        )}
        {step < 3 ? (
          <button
            disabled={!canNext}
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold-gradient text-ink-900 px-4 py-2.5 text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('next')}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={submitting}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold-gradient text-ink-900 px-4 py-2.5 text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all disabled:opacity-60"
          >
            {submitting ? <Check className="h-3.5 w-3.5" /> : <MessageCircle className="h-3.5 w-3.5" />}
            {submitting ? t('success') : t('submit')}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-gold-400/15 bg-background/30 px-3.5 py-2.5 focus-within:border-gold-400/50 focus-within:shadow-gold-sm transition-all">
      <Icon className="h-4 w-4 text-gold-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="block text-[9px] uppercase tracking-widest text-foreground/50">
          {label}
        </span>
        <div className="mt-0.5">{children}</div>
      </div>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-gold-400/10 last:border-0">
      <span className="text-[10px] uppercase tracking-widest text-foreground/50 shrink-0">
        {k}
      </span>
      <span className="text-sm font-semibold text-foreground text-right">{v || '—'}</span>
    </div>
  );
}
