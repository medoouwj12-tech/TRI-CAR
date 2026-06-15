/**
 * Cars data source. Tries Prisma if DATABASE_URL is set, otherwise
 * falls back to the static catalog. Both paths return the same shape.
 */
import { STATIC_CARS, findCar as findStatic } from './cars.data';
import type { Car } from './cars.types';

function hasDb() {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0);
}

export async function getCars(): Promise<Car[]> {
  if (!hasDb()) return STATIC_CARS;
  try {
    const { prisma } = await import('./prisma');
    const rows = await prisma.car.findMany({
      where: { isAvailable: true },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    if (rows.length === 0) return STATIC_CARS;
    return rows.map(toCar);
  } catch {
    return STATIC_CARS;
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  if (!hasDb()) return findStatic(id) ?? null;
  try {
    const { prisma } = await import('./prisma');
    const row = await prisma.car.findUnique({ where: { id } });
    return row ? toCar(row) : (findStatic(id) ?? null);
  } catch {
    return findStatic(id) ?? null;
  }
}

export async function getFeaturedCars(): Promise<Car[]> {
  const all = await getCars();
  return all.filter((c) => c.featured);
}

function toCar(row: any): Car {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    category: row.category,
    pricePerDay: Number(row.pricePerDay),
    pricePerHour: row.pricePerHour ? Number(row.pricePerHour) : null,
    pricePerWeek: row.pricePerWeek ? Number(row.pricePerWeek) : 0,
    pricePerMonth: row.pricePerMonth ? Number(row.pricePerMonth) : 0,
    imageUrl: row.imageUrl,
    gallery: row.gallery ?? [],
    withDriver: row.withDriver,
    isAvailable: row.isAvailable,
    seats: row.seats,
    transmission: row.transmission,
    fuelType: row.fuelType,
    features: row.features ?? [],
    description: row.description,
    featured: row.featured,
  };
}

export type { Car };
export { STATIC_CARS };
