import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/routing';
import { isAdmin } from '@/lib/admin-auth';
import { AdminDashboard } from '@/components/admin-dashboard';

// Must be dynamic: requires auth cookie + live DB data on every request
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdmin())) {
    redirect({ href: '/admin', locale });
  }

  return <AdminDashboard />;
}
