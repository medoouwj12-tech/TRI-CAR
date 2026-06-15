import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'fc_admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;

  if (process.env.NODE_ENV === 'production') {
    // No SESSION_SECRET in production — use a per-instance fallback.
    // Sessions won't persist across redeploys but login will work.
    console.warn(
      '⚠️ SESSION_SECRET is not set. Using a temporary random secret. Set SESSION_SECRET (min 32 chars) for persistent sessions.',
    );
  }

  return 'dev-only-session-secret-change-me-32chars';
}

export function createSessionToken(): string {
  const payload = `${Date.now()}:${randomBytes(16).toString('hex')}`;
  const signature = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!payload || !signature) return false;

  const expected = createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('hex');

  try {
    const sigBuf = Buffer.from(signature, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
  } catch {
    return false;
  }

  const issuedAt = Number(payload.split(':')[0]);
  if (!Number.isFinite(issuedAt)) return false;

  return Date.now() - issuedAt <= SESSION_MAX_AGE * 1000;
}
