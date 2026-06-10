import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

async function guardAdmin(): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const guard = await guardAdmin();
  if (guard) return guard;
  try {
    const cars = await prisma.car.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ ok: true, cars });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'DB error' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const guard = await guardAdmin();
  if (guard) return guard;
  const body = await req.json();
  try {
    const car = await prisma.car.create({
      data: {
        make: body.make,
        model: body.model,
        year: Number(body.year) || new Date().getFullYear(),
        category: body.category || 'LUXURY',
        pricePerDay: Number(body.pricePerDay) || 0,
        pricePerHour: body.pricePerHour ? Number(body.pricePerHour) : null,
        imageUrl: body.imageUrl,
        gallery: body.gallery || [],
        withDriver: Boolean(body.withDriver),
        isAvailable: body.isAvailable !== false,
        seats: Number(body.seats) || 4,
        transmission: body.transmission || 'AUTOMATIC',
        fuelType: body.fuelType || 'GASOLINE',
        features: body.features || [],
        description: body.description || null,
        featured: Boolean(body.featured),
      },
    });
    return NextResponse.json({ ok: true, car });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'DB error' },
      { status: 500 },
    );
  }
}
