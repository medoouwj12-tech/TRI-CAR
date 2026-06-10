import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - the ones starting with `/api`, `/_next`, `/_vercel`, `/_admin`
  // - the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|_admin|.*\\..*).*)'],
};
