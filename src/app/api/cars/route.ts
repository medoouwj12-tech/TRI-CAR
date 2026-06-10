import { NextRequest, NextResponse } from 'next/server';
import { getCars } from '@/lib/cars';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cars = await getCars();
  return NextResponse.json({ cars });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // For now, since admin auth + DB CRUD happens via the admin route, this is a no-op.
  // The real implementation lives in /api/admin/cars.
  return NextResponse.json({ ok: true, echo: body }, { status: 201 });
}
