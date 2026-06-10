/**
 * Seed the database with the same 8 luxury cars used in the static
 * catalog. Run with:  npx prisma db seed
 */
import { PrismaClient, Category, Transmission, FuelType, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const cars = [
  {
    id: 'mercedes-s-class-2024',
    make: 'Mercedes-Benz',
    model: 'S-Class S500',
    year: 2024,
    category: Category.LUXURY,
    pricePerDay: 4500,
    pricePerHour: 600,
    imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
    gallery: ['https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80'],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    features: ['Leather', 'Massage Seats', 'Burmester Sound', 'Air Suspension'],
    description: 'قمة الفخامة الألمانية.',
    featured: true,
  },
  {
    id: 'bmw-7-series-2024',
    make: 'BMW',
    model: '760i xDrive',
    year: 2024,
    category: Category.LUXURY,
    pricePerDay: 4200,
    pricePerHour: 550,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    features: ['Executive Lounge', 'Theater Screen'],
    description: 'الـ Flagship sedan من BMW.',
    featured: true,
  },
  {
    id: 'range-rover-autobiography-2024',
    make: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    category: Category.SUV,
    pricePerDay: 5500,
    pricePerHour: 750,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    features: ['Executive Seats', 'Meridian Sound', 'Air Suspension'],
    description: 'سيارة SUV فارهة بطول إضافي.',
    featured: true,
  },
  {
    id: 'mercedes-v-class-2024',
    make: 'Mercedes-Benz',
    model: 'V-Class Exclusive',
    year: 2024,
    category: Category.VAN,
    pricePerDay: 3800,
    pricePerHour: 500,
    imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 7,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.DIESEL,
    features: ['Captain Seats', 'Conference Mode'],
    description: 'الخيار المثالي للعائلات الكبيرة.',
    featured: false,
  },
  {
    id: 'porsche-cayenne-2024',
    make: 'Porsche',
    model: 'Cayenne Turbo GT',
    year: 2024,
    category: Category.SPORTS,
    pricePerDay: 6500,
    pricePerHour: 900,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    features: ['Sport Chrono', 'Carbon Brakes'],
    description: 'SUV رياضي خالص.',
    featured: false,
  },
  {
    id: 'toyota-camry-2024',
    make: 'Toyota',
    model: 'Camry GLE Hybrid',
    year: 2024,
    category: Category.SEDAN,
    pricePerDay: 1500,
    pricePerHour: 200,
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: false,
    isAvailable: true,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.HYBRID,
    features: ['Hybrid', 'Apple CarPlay'],
    description: 'سيدان هجين اقتصادية.',
    featured: false,
  },
  {
    id: 'cadillac-escalade-2024',
    make: 'Cadillac',
    model: 'Escalade Platinum',
    year: 2024,
    category: Category.SUV,
    pricePerDay: 6000,
    pricePerHour: 800,
    imageUrl: 'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 7,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.GASOLINE,
    features: ['38" OLED', 'AKG Studio', 'Super Cruise'],
    description: 'وحش الطرق الأمريكية.',
    featured: true,
  },
  {
    id: 'tesla-model-s-2024',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: Category.ELECTRIC,
    pricePerDay: 5000,
    pricePerHour: 700,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    withDriver: true,
    isAvailable: true,
    seats: 5,
    transmission: Transmission.AUTOMATIC,
    fuelType: FuelType.ELECTRIC,
    features: ['0-100 in 2.1s', 'Autopilot'],
    description: 'أسرع سيارة إنتاجية في العالم.',
    featured: false,
  },
];

async function main() {
  console.log('🚗 Seeding cars...');
  for (const c of cars) {
    await prisma.car.upsert({
      where: { id: c.id },
      update: c,
      create: c,
    });
  }
  console.log(`✓ ${cars.length} cars`);

  console.log('👤 Seeding admin user...');
  const email = process.env.ADMIN_EMAIL || 'admin@firstcar.eg';
  const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const password = await hash(plainPassword, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: { email, password, name: 'Admin', role: Role.ADMIN },
  });
  console.log(`✓ admin: ${email} (password from ADMIN_PASSWORD env)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
