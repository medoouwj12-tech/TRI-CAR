/**
 * Static car catalog — used as a fallback when Prisma is not connected
 * (no DATABASE_URL or empty DB). Mirrors the Prisma `Car` shape so the
 * components can switch sources transparently.
 */
import type { Car } from './cars.types';

export const STATIC_CARS: Car[] = [
  {
    id: 'mercedes-s-class-2024',
    make: 'Mercedes-Benz',
    model: 'S-Class S500',
    year: 2024,
    category: 'LUXURY',
    pricePerDay: 4500,
    pricePerHour: 600,
    imageUrl:
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1617814086367-b1d2a1d3d0e0?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: 'AUTOMATIC',
    fuelType: 'GASOLINE',
    features: ['Leather', 'Massage Seats', 'Ambient Light', 'Burmester Sound', 'Air Suspension'],
    description:
      'قمة الفخامة الألمانية. مقاعد جلد طبيعي مع خاصية التدليك، إضاءة محيطية بـ 64 لون، ونظام صوتي Burmester — تجربة VIP لا تُنسى.',
    featured: true,
  },
  {
    id: 'bmw-7-series-2024',
    make: 'BMW',
    model: '760i xDrive',
    year: 2024,
    category: 'LUXURY',
    pricePerDay: 4200,
    pricePerHour: 550,
    imageUrl:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1556800572-1b8aedf82fee?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: 'AUTOMATIC',
    fuelType: 'GASOLINE',
    features: ['Executive Lounge', 'Theater Screen', 'Panoramic Sky Lounge', 'Bowers & Wilkins'],
    description:
      'الـ Flagship sedan من BMW. صالون تنفيذي خلفي بشاشة عرض، سقف بانورامي، ونظام Bowers & Wilkins الصوتي.',
    featured: true,
  },
  {
    id: 'range-rover-autobiography-2024',
    make: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    category: 'SUV',
    pricePerDay: 5500,
    pricePerHour: 750,
    imageUrl:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519440400647-8a36f1d7d8b3?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 5,
    transmission: 'AUTOMATIC',
    fuelType: 'GASOLINE',
    features: ['Executive Seats', 'Meridian Sound', 'Air Suspension', 'Off-Road', 'Refrigerator'],
    description:
      'سيارة SUV فارهة بطول إضافي — مقاعد تنفيذية مع ثلاجة مدمجة ونظام Meridian الصوتي، الخيار الأمثل للرحلات الفاخرة.',
    featured: true,
  },
  {
    id: 'mercedes-v-class-2024',
    make: 'Mercedes-Benz',
    model: 'V-Class Exclusive',
    year: 2024,
    category: 'VAN',
    pricePerDay: 3800,
    pricePerHour: 500,
    imageUrl:
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 7,
    transmission: 'AUTOMATIC',
    fuelType: 'DIESEL',
    features: ['Captain Seats', 'Conference Mode', 'Privacy Glass', 'Premium Audio'],
    description:
      'الخيار المثالي للعائلات الكبيرة ورجال الأعمال. 7 مقاعد captain seats، وضع الاجتماعات، وزجاج خصوصية.',
    featured: false,
  },
  {
    id: 'porsche-cayenne-2024',
    make: 'Porsche',
    model: 'Cayenne Turbo GT',
    year: 2024,
    category: 'SPORTS',
    pricePerDay: 6500,
    pricePerHour: 900,
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 4,
    transmission: 'AUTOMATIC',
    fuelType: 'GASOLINE',
    features: ['Sport Chrono', 'Carbon Brakes', 'Sport Exhaust', 'Adaptive Air Suspension'],
    description:
      'SUV رياضي خالص بقوة 631 حصان. وضع Chrono الرياضي، فرامل كربون، وعادم رياضي — قيادة لا تُقاوم.',
    featured: false,
  },
  {
    id: 'toyota-camry-2024',
    make: 'Toyota',
    model: 'Camry GLE Hybrid',
    year: 2024,
    category: 'SEDAN',
    pricePerDay: 1500,
    pricePerHour: 200,
    imageUrl:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: false,
    isAvailable: true,
    seats: 5,
    transmission: 'AUTOMATIC',
    fuelType: 'HYBRID',
    features: ['Hybrid', 'Cruise Control', 'Rear Camera', 'Apple CarPlay'],
    description:
      'سيدان هجين اقتصادية، مثالية للتنقل اليومي. متاحة بدون سائق بترخيص أو مع سائق خاص.',
    featured: false,
  },
  {
    id: 'cadillac-escalade-2024',
    make: 'Cadillac',
    model: 'Escalade Platinum',
    year: 2024,
    category: 'SUV',
    pricePerDay: 6000,
    pricePerHour: 800,
    imageUrl:
      'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 7,
    transmission: 'AUTOMATIC',
    fuelType: 'GASOLINE',
    features: ['38" Curved OLED', 'AKG Studio', 'Super Cruise', 'Magnetic Ride'],
    description:
      'وحش الطرق الأمريكية. شاشة OLED منحنية 38 بوصة، نظام AKG Studio، و Super Cruise للقيادة الذاتية على الطرق السريعة.',
    featured: true,
  },
  {
    id: 'tesla-model-s-2024',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    category: 'ELECTRIC',
    pricePerDay: 5000,
    pricePerHour: 700,
    imageUrl:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80',
    ],
    withDriver: true,
    isAvailable: true,
    seats: 5,
    transmission: 'AUTOMATIC',
    fuelType: 'ELECTRIC',
    features: ['0-100 in 2.1s', 'Autopilot', 'Glass Roof', '22-Speaker Audio'],
    description:
      'أسرع سيارة إنتاجية في العالم. 1020 حصان، 0-100 في 2.1 ثانية، ونظام Autopilot المتقدم.',
    featured: false,
  },
];

export function findCar(id: string): Car | undefined {
  return STATIC_CARS.find((c) => c.id === id);
}
