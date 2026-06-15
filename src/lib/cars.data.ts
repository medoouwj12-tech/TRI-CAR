/**
 * Static car catalog — used as a fallback when Prisma is not connected
 * (no DATABASE_URL or empty DB). Mirrors the Prisma `Car` shape so the
 * components can switch sources transparently.
 */
import type { Car } from './cars.types';

export const STATIC_CARS: Car[] = [];

export function findCar(id: string): Car | undefined {
  return STATIC_CARS.find((c) => c.id === id);
}
