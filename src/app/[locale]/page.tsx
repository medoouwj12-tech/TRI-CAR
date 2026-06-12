import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { FleetTeaser } from '@/components/fleet-teaser';
import { HomeServices } from '@/components/home-services';
import { HomeAbout } from '@/components/home-about';
import { HomePolicy } from '@/components/home-policy';
import { HomeContact } from '@/components/home-contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale, namespace: 'hero' });

  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <FleetTeaser locale={locale} />
        <HomeServices />
        <HomeAbout />
        <HomePolicy />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
