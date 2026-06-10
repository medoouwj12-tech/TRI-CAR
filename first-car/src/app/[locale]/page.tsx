import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';

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
      </main>
      <Footer />
    </>
  );
}

async function FleetTeaser({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'fleet' });
  return (
    <section
      id="fleet-section"
      className="container py-24 sm:py-32 border-t border-gold-400/10"
    >
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-300">
          {locale === 'ar' ? 'الأسطول' : 'The Fleet'}
        </span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
          <span className="text-foreground">{t('title')}</span>
        </h2>
        <p className="mt-4 text-foreground/60">{t('subtitle')}</p>
        <p className="mt-12 text-sm text-foreground/40 italic">
          {locale === 'ar'
            ? '— وحدات الأسطول قادمة في المرحلة التالية —'
            : '— Fleet grid arrives in the next module —'}
        </p>
      </div>
    </section>
  );
}
