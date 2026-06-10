import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const bookings = await prisma.bookingRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { car: { select: { make: true, model: true, imageUrl: true } } },
    });
    const stats = {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === 'PENDING').length,
      confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
      completed: bookings.filter((b) => b.status === 'COMPLETED').length,
    };
    return NextResponse.json({ ok: true, bookings, stats });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'DB error', bookings: [], stats: {} },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  try {
    const b = await prisma.bookingRequest.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ ok: true, booking: b });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'DB error' },
      { status: 500 },
    );
  }
}
