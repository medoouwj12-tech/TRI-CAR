import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CarCard } from '@/components/car-card';
import { getCars } from '@/lib/cars';
import { ArrowRight } from 'lucide-react';

export async function FleetTeaser({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'fleet' });
  const tHome = await getTranslations({ locale, namespace: 'home.fleet' });
  const cars = await getCars();

  return (
    <section
      id="fleet-section"
      className="container py-24 sm:py-32 border-t border-gold-400/10"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
          {tHome('eyebrow')}
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
          <span className="text-foreground">{t('title')}</span>
        </h2>
        <p className="mt-4 text-foreground/60">{t('subtitle')}</p>
      </div>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/50">{tHome('empty')}</p>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/fleet"
          className="group inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-7 py-3.5 text-sm font-semibold text-gold-200 hover:bg-gold-400/5 transition-all"
        >
          {t('viewAll')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
