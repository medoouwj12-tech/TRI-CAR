'use client';

import * as React from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Lock, Mail, KeyRound, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function AdminLogin() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (!j.ok) {
        setErr(t('invalidCredentials'));
      } else {
        router.push('/admin/dashboard');
      }
    } catch (e: any) {
      setErr(e?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-ink-900 px-4 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.25), transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl border border-gold-400/30 bg-card/80 backdrop-blur-xl p-8 shadow-gold"
      >
        <div className="flex justify-center mb-6">
          <Logo size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-1">
          <span className="text-gold-gradient">{t('login')}</span>
        </h1>
        <p className="text-center text-xs text-foreground/50 mb-6">
          First Car Admin Panel
        </p>

        <div className="space-y-3">
          <Field icon={Mail} label={t('email')}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
              dir="ltr"
              required
            />
          </Field>
          <Field icon={KeyRound} label={t('password')}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm focus:outline-none"
              dir="ltr"
              required
            />
          </Field>
        </div>

        {err && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            <AlertCircle className="h-3.5 w-3.5" />
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full',
            'bg-gold-gradient text-ink-900 px-5 py-3 text-sm font-bold shadow-gold',
            'hover:shadow-gold-lg transition-all hover:scale-[1.02] active:scale-[0.98]',
            'disabled:opacity-60',
          )}
        >
          <Lock className="h-4 w-4" />
          {loading ? '...' : t('signIn')}
        </button>

        <p className="mt-5 text-center text-[10px] text-foreground/40">
          {process.env.NODE_ENV === 'development' ? t('devHint') : t('secureHint')}
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-foreground/50 hover:text-gold-300 transition-colors"
          >
            {t('backToSite')}
          </Link>
        </div>
      </motion.form>
    </main>
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
    <label className="flex items-center gap-3 rounded-2xl border border-gold-400/20 bg-background/40 px-3.5 py-2.5 focus-within:border-gold-400/50 focus-within:shadow-gold-sm transition-all">
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

export default AdminLogin;
