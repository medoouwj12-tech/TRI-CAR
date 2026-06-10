'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
  LayoutDashboard,
  Car as CarIcon,
  CalendarCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
} from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import type { Car } from '@/lib/cars.types';

type Tab = 'stats' | 'cars' | 'bookings';

export function AdminDashboard() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>('stats');
  const [cars, setCars] = React.useState<Car[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>({});
  const [editing, setEditing] = React.useState<Car | null>(null);
  const [adding, setAdding] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  const fetchAll = React.useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [c, b] = await Promise.all([
        fetch('/api/cars').then((r) => r.json()),
        fetch('/api/admin/bookings').then((r) => r.json()),
      ]);
      setCars(c.cars || []);
      setBookings(b.bookings || []);
      setStats(b.stats || {});
    } catch (e: any) {
      setErr(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-ink-900 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-64 lg:fixed lg:inset-y-0 lg:right-0 border-l border-gold-400/15 bg-card/60 backdrop-blur-xl p-5 flex flex-col">
        <div className="mb-8">
          <Logo size={40} />
        </div>
        <nav className="space-y-1 flex-1">
          <SideItem active={tab === 'stats'} onClick={() => setTab('stats')} icon={LayoutDashboard}>
            {t('dashboard')}
          </SideItem>
          <SideItem active={tab === 'cars'} onClick={() => setTab('cars')} icon={CarIcon}>
            {t('cars')}
          </SideItem>
          <SideItem active={tab === 'bookings'} onClick={() => setTab('bookings')} icon={CalendarCheck}>
            {t('bookings')}
          </SideItem>
        </nav>
        <button
          onClick={logout}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gold-400/20 px-3 py-2 text-xs text-foreground/70 hover:border-gold-400/50 hover:text-gold-200"
        >
          <LogOut className="h-3.5 w-3.5" />
          {t('logout')}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:mr-64 p-5 sm:p-8">
        {err && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {err}
          </div>
        )}

        {tab === 'stats' && <StatsView cars={cars} bookings={bookings} stats={stats} loading={loading} />}
        {tab === 'cars' && (
          <CarsView
            cars={cars}
            loading={loading}
            onAdd={() => setAdding(true)}
            onEdit={(c) => setEditing(c)}
            onDelete={async (id) => {
              if (!confirm('Delete this car?')) return;
              await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
              fetchAll();
            }}
            onRefresh={fetchAll}
          />
        )}
        {tab === 'bookings' && <BookingsView bookings={bookings} loading={loading} />}

        {/* Modal */}
        {(editing || adding) && (
          <CarFormModal
            car={editing}
            onClose={() => {
              setEditing(null);
              setAdding(false);
            }}
            onSaved={() => {
              setEditing(null);
              setAdding(false);
              fetchAll();
            }}
          />
        )}
      </main>
    </div>
  );
}

function SideItem({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all',
        active
          ? 'bg-gold-gradient text-ink-900 shadow-gold-sm'
          : 'text-foreground/70 hover:bg-gold-400/5 hover:text-gold-200',
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

function StatsView({
  cars,
  bookings,
  stats,
  loading,
}: {
  cars: Car[];
  bookings: any[];
  stats: any;
  loading: boolean;
}) {
  const t = useTranslations('admin.stats');
  const totalRevenue = bookings.reduce((s, b) => {
    const car = cars.find((c) => c.id === b.carId);
    return s + (car?.pricePerDay || 0);
  }, 0);

  const items = [
    { label: t('totalCars'), value: cars.length, icon: CarIcon },
    { label: t('available'), value: cars.filter((c) => c.isAvailable).length, icon: CheckCircle2 },
    { label: t('withDriver'), value: cars.filter((c) => c.withDriver).length, icon: Star },
    { label: t('bookings'), value: bookings.length, icon: CalendarCheck },
    { label: t('pending'), value: stats.pending ?? 0, icon: Clock },
    {
      label: t('revenue'),
      value: formatCurrency(totalRevenue, 'en'),
      icon: Phone,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gold-gradient mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gold-400/15 bg-card/60 backdrop-blur-xl p-5"
          >
            <it.icon className="h-5 w-5 text-gold-300" />
            <p className="mt-3 text-2xl font-extrabold text-gold-gradient">{loading ? '…' : it.value}</p>
            <p className="text-xs text-foreground/50 mt-1">{it.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CarsView({
  cars,
  loading,
  onAdd,
  onEdit,
  onDelete,
}: {
  cars: Car[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (c: Car) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}) {
  const t = useTranslations('admin');
  const [q, setQ] = React.useState('');
  const filtered = cars.filter(
    (c) =>
      !q ||
      `${c.make} ${c.model}`.toLowerCase().includes(q.toLowerCase()) ||
      c.category.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gold-gradient">{t('cars')}</h1>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient text-ink-900 px-4 py-2 text-xs font-bold shadow-gold hover:shadow-gold-lg transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          {t('addCar')}
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-gold-400/20 bg-card/60 px-3.5 py-2.5">
        <Search className="h-4 w-4 text-gold-300" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search cars…"
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-foreground/50">Loading…</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-2xl border border-gold-400/15 bg-card/60 p-3 hover:border-gold-400/40 transition-all"
            >
              <div
                className="h-14 w-20 rounded-lg bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${c.imageUrl})` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {c.make} {c.model}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-gold-300">
                  {c.category} · {c.year} · {c.seats} seats
                </p>
                <p className="text-xs text-foreground/50">
                  {formatCurrency(c.pricePerDay, 'en')} / day
                </p>
              </div>
              <div className="flex items-center gap-1">
                <IconBtn onClick={() => onEdit(c)} label="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn onClick={() => onDelete(c.id)} label="Delete" danger>
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all',
        danger
          ? 'border-red-500/30 text-red-300 hover:bg-red-500/10'
          : 'border-gold-400/20 text-foreground/70 hover:border-gold-400/60 hover:text-gold-200',
      )}
    >
      {children}
    </button>
  );
}

function BookingsView({ bookings, loading }: { bookings: any[]; loading: boolean }) {
  const t = useTranslations('admin');
  return (
    <div>
      <h1 className="text-2xl font-bold text-gold-gradient mb-6">{t('bookings')}</h1>
      {loading ? (
        <p className="text-foreground/50">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-foreground/50">No booking requests yet.</p>
      ) : (
        <div className="space-y-2">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-gold-400/15 bg-card/60 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold">{b.name}</p>
                  <p className="text-xs text-foreground/60">
                    {b.car ? `${b.car.make} ${b.car.model}` : b.carId}
                  </p>
                  <p className="mt-2 text-xs text-foreground/70">
                    {new Date(b.date).toLocaleString()} · {b.passengers} pax
                  </p>
                  <p className="text-xs text-foreground/50">
                    {b.pickupLocation} → {b.dropoffLocation}
                  </p>
                  <a
                    href={`tel:${b.phone}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold-300"
                  >
                    <Phone className="h-3 w-3" />
                    {b.phone}
                  </a>
                </div>
                <StatusPill status={b.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { icon: any; cls: string }> = {
    PENDING: { icon: Clock, cls: 'border-yellow-500/30 text-yellow-300 bg-yellow-500/5' },
    CONFIRMED: { icon: CheckCircle2, cls: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5' },
    COMPLETED: { icon: CheckCircle2, cls: 'border-gold-400/30 text-gold-200 bg-gold-400/5' },
    CANCELLED: { icon: XCircle, cls: 'border-red-500/30 text-red-300 bg-red-500/5' },
    CONTACTED: { icon: Phone, cls: 'border-blue-500/30 text-blue-300 bg-blue-500/5' },
  };
  const m = map[status] || map.PENDING;
  const Icon = m.icon;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest',
        m.cls,
      )}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

function CarFormModal({
  car,
  onClose,
  onSaved,
}: {
  car: Car | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const t = useTranslations('admin');
  const [form, setForm] = React.useState<Partial<Car>>(
    car ?? {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'LUXURY',
      pricePerDay: 0,
      imageUrl: '',
      seats: 4,
      transmission: 'AUTOMATIC',
      fuelType: 'GASOLINE',
      withDriver: true,
      isAvailable: true,
      featured: false,
      features: [],
      gallery: [],
    },
  );
  const [featuresStr, setFeaturesStr] = React.useState((car?.features || []).join(', '));
  const [saving, setSaving] = React.useState(false);

  const set = (k: keyof Car, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    const body = {
      ...form,
      features: featuresStr.split(',').map((s) => s.trim()).filter(Boolean),
    };
    const url = car ? `/api/admin/cars/${car.id}` : '/api/admin/cars';
    const method = car ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold-400/30 bg-card p-6 shadow-gold-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gold-gradient">
            {car ? t('editCar') : t('addCar')}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gold-400/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Inp label="Make" value={String(form.make ?? '')} onChange={(v) => set('make', v)} />
          <Inp label="Model" value={String(form.model ?? '')} onChange={(v) => set('model', v)} />
          <Inp label="Year" type="number" value={String(form.year ?? '')} onChange={(v) => set('year', Number(v))} />
          <Sel
            label="Category"
            value={String(form.category)}
            onChange={(v) => set('category', v as any)}
            options={['SEDAN', 'SUV', 'LUXURY', 'SPORTS', 'VAN', 'ELECTRIC']}
          />
          <Inp
            label="Price / day"
            type="number"
            value={String(form.pricePerDay ?? '')}
            onChange={(v) => set('pricePerDay', Number(v))}
          />
          <Inp
            label="Seats"
            type="number"
            value={String(form.seats ?? '')}
            onChange={(v) => set('seats', Number(v))}
          />
          <Inp
            label="Image URL"
            value={String(form.imageUrl ?? '')}
            onChange={(v) => set('imageUrl', v)}
            className="sm:col-span-2"
          />
          <Inp
            label="Features (comma separated)"
            value={featuresStr}
            onChange={setFeaturesStr}
            className="sm:col-span-2"
          />
          <Sel
            label="Transmission"
            value={String(form.transmission)}
            onChange={(v) => set('transmission', v as any)}
            options={['AUTOMATIC', 'MANUAL']}
          />
          <Sel
            label="Fuel"
            value={String(form.fuelType)}
            onChange={(v) => set('fuelType', v as any)}
            options={['GASOLINE', 'DIESEL', 'HYBRID', 'ELECTRIC']}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.withDriver}
              onChange={(e) => set('withDriver', e.target.checked)}
            />
            With driver
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.isAvailable}
              onChange={(e) => set('isAvailable', e.target.checked)}
            />
            Available
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => set('featured', e.target.checked)}
            />
            Featured
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-gold-400/30 px-5 py-2 text-sm font-semibold text-gold-200 hover:bg-gold-400/5"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-gold-gradient text-ink-900 px-6 py-2 text-sm font-bold shadow-gold hover:shadow-gold-lg transition-all disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Inp({
  label,
  value,
  onChange,
  type = 'text',
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="text-[10px] uppercase tracking-widest text-foreground/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-gold-400/20 bg-background/40 px-3 py-2 text-sm focus:outline-none focus:border-gold-400/60"
      />
    </label>
  );
}

function Sel({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-foreground/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-gold-400/20 bg-background/40 px-3 py-2 text-sm focus:outline-none focus:border-gold-400/60"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-900">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default AdminDashboard;
