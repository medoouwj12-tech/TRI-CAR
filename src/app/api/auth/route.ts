import { NextRequest, NextResponse } from 'next/server';
import {
  isAdmin,
  verifyAdminCredentials,
  createSessionToken,
  buildSessionCookie,
  ADMIN_COOKIE_NAME,
} from '@/lib/admin-auth';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`auth:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    );
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: 'Email and password are required' },
      { status: 400 },
    );
  }

  const valid = await verifyAdminCredentials(email, password);
  if (!valid) {
    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  const cookie = buildSessionCookie(token);
  res.cookies.set(cookie.name, cookie.value, cookie);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}

export async function GET() {
  return NextResponse.json({ isAdmin: await isAdmin() });
}
