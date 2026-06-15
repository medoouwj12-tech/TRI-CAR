import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  try {
    const car = await prisma.car.update({
      where: { id },
      data: {
        make: body.make,
        model: body.model,
        year: Number(body.year) || undefined,
        category: body.category,
        pricePerDay: body.pricePerDay ? Number(body.pricePerDay) : undefined,
        pricePerHour: body.pricePerHour ? Number(body.pricePerHour) : undefined,
        pricePerWeek: body.pricePerWeek ? Number(body.pricePerWeek) : undefined,
        pricePerMonth: body.pricePerMonth ? Number(body.pricePerMonth) : undefined,
        imageUrl: body.imageUrl,
        gallery: body.gallery,
        withDriver: body.withDriver,
        isAvailable: body.isAvailable,
        seats: body.seats ? Number(body.seats) : undefined,
        transmission: body.transmission,
        fuelType: body.fuelType,
        features: body.features,
        description: body.description,
        featured: body.featured,
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin()))
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.car.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'DB error' },
      { status: 500 },
    );
  }
}
