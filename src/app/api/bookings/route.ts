import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limited = rateLimit(`booking:${ip}`, { limit: 20, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many booking requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    );
  }

  try {
    const body = await req.json();
    const {
      carId,
      name,
      phone,
      email,
      pickupLocation,
      dropoffLocation,
      date,
      passengers,
      notes,
    } = body;

    if (!carId || !name || !phone || !pickupLocation || !dropoffLocation || !date) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (typeof phone !== 'string' || phone.replace(/\D/g, '').length < 8) {
      return NextResponse.json(
        { ok: false, error: 'Invalid phone number' },
        { status: 400 },
      );
    }

    try {
      const created = await prisma.bookingRequest.create({
        data: {
          carId,
          name: String(name).slice(0, 120),
          phone: String(phone).slice(0, 30),
          email: email ? String(email).slice(0, 120) : null,
          pickupLocation: String(pickupLocation).slice(0, 200),
          dropoffLocation: String(dropoffLocation).slice(0, 200),
          date: new Date(date),
          passengers: Math.min(Math.max(Number(passengers) || 1, 1), 20),
          notes: notes ? String(notes).slice(0, 500) : null,
        },
      });
      return NextResponse.json({ ok: true, id: created.id });
    } catch {
      return NextResponse.json({ ok: true, persisted: false });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
