import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CarDetails } from '@/components/car-details';
import { getCarById } from '@/lib/cars';

export default async function CarPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'details' });
  const car = await getCarById(id);
  if (!car) return notFound();

  return (
    <>
      <Navbar />
      <main className="relative pt-24">
        <CarDetails car={car} />
      </main>
      <Footer />
    </>
  );
}
