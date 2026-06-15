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
  Image as ImageIcon,
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
              if (!confirm(t('confirmDeleteCar') || 'Delete this car?')) return;
              await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
              fetchAll();
            }}
            onRefresh={fetchAll}
          />
        )}
        {tab === 'bookings' && (
          <BookingsView bookings={bookings} loading={loading} onRefresh={fetchAll} />
        )}

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
  onRefresh,
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

  const handleToggle = async (car: Car, field: 'isAvailable' | 'featured') => {
    try {
      const res = await fetch(`/api/admin/cars/${car.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [field]: !car[field],
        }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

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
                className="h-14 w-20 rounded-lg bg-cover bg-center shrink-0 border border-gold-400/20"
                style={{ backgroundImage: `url(${c.imageUrl})` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {c.make} {c.model}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-gold-300">
                  {c.category} · {c.year} · {c.seats} seats
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs">
                  <span className="text-foreground/50">
                    {formatCurrency(c.pricePerDay, 'en')} / day
                  </span>
                  <span className="text-foreground/20">•</span>
                  <button
                    onClick={() => handleToggle(c, 'isAvailable')}
                    className={cn(
                      'text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all',
                      c.isAvailable
                        ? 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5 hover:border-emerald-500/60 hover:bg-emerald-500/10'
                        : 'border-red-500/30 text-red-300 bg-red-500/5 hover:border-red-500/60 hover:bg-red-500/10',
                    )}
                  >
                    {c.isAvailable ? t('stats.available') : t('unavailable')}
                  </button>
                  <span className="text-foreground/20">•</span>
                  <button
                    onClick={() => handleToggle(c, 'featured')}
                    className={cn(
                      'inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all',
                      c.featured
                        ? 'border-gold-400/40 text-gold-200 bg-gold-400/10 hover:border-gold-400/70 hover:bg-gold-400/20'
                        : 'border-foreground/20 text-foreground/40 hover:border-foreground/40 hover:bg-foreground/5',
                    )}
                  >
                    <Star className={cn('h-2.5 w-2.5', c.featured && 'fill-gold-300 text-gold-300')} />
                    {t('featured')}
                  </button>
                </div>
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

function BookingsView({
  bookings,
  loading,
  onRefresh,
}: {
  bookings: any[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const t = useTranslations('admin');

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDeleteBooking') || 'Delete this booking?')) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gold-gradient mb-6">{t('bookings')}</h1>
      {loading ? (
        <p className="text-foreground/50">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-foreground/50">No booking requests yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            // Format phone number for WhatsApp Egypt (+20)
            let cleanPhone = b.phone.replace(/\D/g, '');
            if (!cleanPhone.startsWith('20') && !cleanPhone.startsWith('+')) {
              if (cleanPhone.startsWith('01')) {
                cleanPhone = '20' + cleanPhone.substring(1);
              } else {
                cleanPhone = '20' + cleanPhone;
              }
            }
            const carName = b.car ? `${b.car.make} ${b.car.model}` : '';
            const msg = `مرحباً ${b.name}، نتواصل معك من شركة فرست كار للسيارات بخصوص طلب حجز السيارة ${carName}.`;
            const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

            return (
              <div
                key={b.id}
                className="rounded-2xl border border-gold-400/15 bg-card/60 backdrop-blur-xl p-5 hover:border-gold-400/30 transition-all flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">{b.name}</p>
                    <StatusPill status={b.status} />
                  </div>
                  <p className="text-xs text-gold-300">
                    {b.car ? `${b.car.make} ${b.car.model}` : b.carId}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-foreground/60">
                    <p>📅 {new Date(b.date).toLocaleString()} · {b.passengers} pax</p>
                    <p>📍 {b.pickupLocation} → {b.dropoffLocation}</p>
                    {b.email && <p>✉️ {b.email}</p>}
                    {b.notes && <p className="italic text-foreground/40 sm:col-span-2">📝 {b.notes}</p>}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <a
                      href={`tel:${b.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-200"
                    >
                      <Phone className="h-3 w-3" />
                      {b.phone}
                    </a>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      💬 {t('whatsappChat')}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 border-t border-gold-400/10 md:border-t-0 pt-3 md:pt-0">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/40">{t('changeStatus')}</span>
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className="bg-ink-900 border border-gold-400/20 text-xs text-foreground/80 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gold-400/60"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="mt-4 p-2 border border-red-500/20 text-red-400 hover:border-red-500/50 hover:bg-red-500/10 rounded-xl transition-all"
                    title={t('deleteBooking')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
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

function compressAndConvertToBase64(
  file: File,
  maxWidth = 1000,
  maxHeight = 667,
  quality = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
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
  const [uploading, setUploading] = React.useState(false);

  const set = (k: keyof Car, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const base64 = await compressAndConvertToBase64(files[i]);
        urls.push(base64);
      }
      if (isGallery) {
        setForm((f) => ({
          ...f,
          gallery: [...(f.gallery || []), ...urls],
        }));
      } else if (urls.length > 0) {
        set('imageUrl', urls[0]);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setSaving(true);
    const body = {
      ...form,
      pricePerWeek: Number(form.pricePerWeek) || 0,
      pricePerMonth: Number(form.pricePerMonth) || 0,
      features: [],
      seats: 4,
      transmission: 'AUTOMATIC',
      fuelType: 'GASOLINE',
      withDriver: false,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/80 backdrop-blur-md text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gold-400/30 bg-card p-6 shadow-gold-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gold-gradient">
            {car ? 'تعديل سيارة' : 'إضافة سيارة جديدة'}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gold-400/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Inp label="الماركة (مثال: Mercedes-Benz)" value={String(form.make ?? '')} onChange={(v) => set('make', v)} />
          <Inp label="الموديل (مثال: S-Class)" value={String(form.model ?? '')} onChange={(v) => set('model', v)} />
          <Inp label="السنة (مثال: 2024)" type="number" value={String(form.year ?? '')} onChange={(v) => set('year', Number(v))} />
          <Sel
            label="الفئة"
            value={String(form.category ?? 'LUXURY')}
            onChange={(v) => set('category', v as any)}
            options={['SEDAN', 'SUV', 'LUXURY', 'SPORTS', 'VAN', 'ELECTRIC']}
          />
          <Inp
            label="سعر الإيجار اليومي"
            type="number"
            value={String(form.pricePerDay ?? '')}
            onChange={(v) => set('pricePerDay', Number(v))}
          />
          <Inp
            label="سعر الإيجار الأسبوعي"
            type="number"
            value={String(form.pricePerWeek ?? '')}
            onChange={(v) => set('pricePerWeek', Number(v))}
          />
          <Inp
            label="سعر الإيجار الشهري"
            type="number"
            value={String(form.pricePerMonth ?? '')}
            onChange={(v) => set('pricePerMonth', Number(v))}
          />

          {/* Main Image Upload Zone */}
          <div className="sm:col-span-2 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-foreground/50">الصورة الرئيسية للسيارة</span>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-gold-400/20 bg-background/40">
              {form.imageUrl ? (
                <div className="relative h-24 w-36 rounded-xl overflow-hidden border border-gold-400/30 shrink-0">
                  <img src={form.imageUrl} alt="Car preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => set('imageUrl', '')}
                    className="absolute top-1 right-1 rounded-full p-1 bg-ink-900/80 hover:bg-ink-900 text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-24 w-36 rounded-xl border-2 border-dashed border-gold-400/30 flex items-center justify-center text-foreground/30 shrink-0">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}
              <div className="flex-1 w-full text-center sm:text-left">
                <label className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gold-gradient text-ink-900 font-bold text-xs cursor-pointer shadow-gold hover:shadow-gold-lg transition-all">
                  {uploading ? 'جاري الرفع...' : 'رفع صورة من الجهاز'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-[10px] text-foreground/40 mt-1">اضغط للرفع وسيتم ضغطها تلقائياً</p>
              </div>
            </div>
            {/* Fallback URL input */}
            <Inp label="أو الصق رابط مباشر للصورة" value={String(form.imageUrl ?? '')} onChange={(v) => set('imageUrl', v)} />
          </div>

          {/* Gallery Upload Grid */}
          <div className="sm:col-span-2 space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-foreground/50">صور إضافية للمعرض (اختياري)</span>
            <div className="p-4 rounded-2xl border border-gold-400/20 bg-background/40 space-y-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(form.gallery || []).map((url, index) => (
                  <div key={url + index} className="relative h-16 rounded-lg overflow-hidden border border-gold-400/20">
                    <img src={url} alt={`Gallery ${index}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = (form.gallery || []).filter((_, i) => i !== index);
                        set('gallery', newGallery);
                      }}
                      className="absolute top-1 right-1 rounded-full p-0.5 bg-ink-900/80 hover:bg-ink-900 text-red-400"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                ))}
                <label className="h-16 rounded-lg border-2 border-dashed border-gold-400/30 hover:border-gold-400/60 flex flex-col items-center justify-center cursor-pointer text-foreground/40 transition-all">
                  <Plus className="h-5 w-5" />
                  <span className="text-[8px] font-bold mt-1">إضافة صورة</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <Inp label="الوصف والتفاصيل الإضافية (اختياري)" value={String(form.description ?? '')} onChange={(v) => set('description', v)} />
          </div>
          
          <div className="flex flex-wrap gap-4 sm:col-span-2 mt-2">
            <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.isAvailable}
                onChange={(e) => set('isAvailable', e.target.checked)}
                className="accent-gold-400"
              />
              متاحة للإيجار
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="accent-gold-400"
              />
              عرض في الصفحة الرئيسية (مميزة)
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-gold-400/10 pt-4">
          <button
            onClick={onClose}
            className="rounded-full border border-gold-400/30 px-5 py-2 text-sm font-semibold text-gold-200 hover:bg-gold-400/5 transition-all"
          >
            إلغاء
          </button>
          <button
            onClick={save}
            disabled={saving || uploading}
            className="rounded-full bg-gold-gradient text-ink-900 px-6 py-2 text-sm font-bold shadow-gold hover:shadow-gold-lg transition-all disabled:opacity-60"
          >
            {saving ? 'جاري الحفظ...' : 'حفظ السيارة'}
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
        className="mt-1 w-full rounded-xl border border-gold-400/20 bg-background/40 px-3 py-2 text-sm focus:outline-none focus:border-gold-400/60 text-foreground"
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
