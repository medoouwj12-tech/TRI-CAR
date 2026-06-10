import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FleetGrid } from '@/components/fleet-grid';
import { getCars } from '@/lib/cars';

function FleetGridFallback() {
  return (
    <section className="container py-24">
      <div className="h-64 rounded-3xl border border-gold-400/10 bg-card/40 animate-pulse" />
    </section>
  );
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: 'fleet' });
  const cars = await getCars();

  return (
    <>
      <Navbar />
      <main className="relative pt-24">
        <Suspense fallback={<FleetGridFallback />}>
          <FleetGrid cars={cars} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
