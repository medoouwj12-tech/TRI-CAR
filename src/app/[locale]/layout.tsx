import type { Metadata } from 'next';
import { Cairo, Inter, Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'الحسام للسيارات | Al-Hossam Cars — Luxury Car Rental Egypt',
  description:
    'Al-Hossam Cars - الحسام للسيارات. Luxury car rental & VIP trip booking across Egypt. Premium fleet, professional chauffeurs, 24/7 concierge.',
  metadataBase: new URL('https://alhossam-cars.eg'),
  keywords: [
    'luxury car rental Egypt',
    'تأجير سيارات فاخرة',
    'Al-Hossam Cars',
    'الحسام للسيارات',
    'VIP chauffeur Cairo',
  ],
  openGraph: {
    title: 'الحسام للسيارات | Al-Hossam Cars — Luxury Car Rental Egypt',
    description:
      'A journey that matches your class. Premium fleet, VIP service, across Egypt.',
    type: 'website',
    locale: 'en_EG',
    alternateLocale: 'ar_EG',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className={locale === 'ar' ? 'font-arabic' : 'font-sans'}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
