export type Category = 'SEDAN' | 'SUV' | 'LUXURY' | 'SPORTS' | 'VAN' | 'ELECTRIC';
export type Transmission = 'AUTOMATIC' | 'MANUAL';
export type FuelType = 'GASOLINE' | 'DIESEL' | 'HYBRID' | 'ELECTRIC';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: Category;
  pricePerDay: number;
  pricePerHour?: number | null;
  pricePerWeek: number;
  pricePerMonth: number;
  imageUrl: string;
  gallery: string[];
  withDriver: boolean;
  isAvailable: boolean;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  features: string[];
  description?: string | null;
  featured: boolean;
}
