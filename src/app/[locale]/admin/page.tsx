import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { isAdmin } from '@/lib/admin-auth';
import { Navbar } from '@/components/navbar';
import { AdminLogin } from '@/components/admin-login';

// Must be dynamic: redirects based on auth cookie
export const dynamic = 'force-dynamic';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (await isAdmin()) {
    redirect({ href: '/admin/dashboard', locale });
  }

  return (
    <>
      <Navbar />
      <AdminLogin />
    </>
  );
}
