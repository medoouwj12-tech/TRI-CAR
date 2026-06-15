/**
 * Admin authentication — bcrypt passwords + HMAC-signed session cookie.
 */
import { compare, hash } from 'bcryptjs';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE,
  createSessionToken,
  verifySessionToken,
} from './session';

function hasDb(): boolean {
  return Boolean(process.env.DATABASE_URL?.length);
}

let cachedDevPasswordHash: string | null = null;

async function verifyEnvCredentials(
  normalizedEmail: string,
  password: string,
): Promise<boolean> {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@alhossam-cars.eg').toLowerCase();
  const fallbackEmail = 'admin@firstcar.eg';

  if (normalizedEmail !== adminEmail && normalizedEmail !== fallbackEmail) {
    return false;
  }

  if (process.env.ADMIN_PASSWORD_HASH) {
    return compare(password, process.env.ADMIN_PASSWORD_HASH);
  }

  if (process.env.NODE_ENV === 'production') {
    if (hasDb()) {
      try {
        const { prisma } = await import('./prisma');
        const count = await prisma.user.count();
        if (count > 0) return false;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  if (!cachedDevPasswordHash) {
    cachedDevPasswordHash = await hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  }
  return compare(password, cachedDevPasswordHash);
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  if (hasDb()) {
    try {
      const { prisma } = await import('./prisma');
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
      if (user) return compare(password, user.password);
    } catch {
      /* fall through to env credentials */
    }
  }

  return verifyEnvCredentials(normalizedEmail, password);
}

export async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export function buildSessionCookie(token: string) {
  return {
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  };
}

export { ADMIN_COOKIE_NAME, createSessionToken };
