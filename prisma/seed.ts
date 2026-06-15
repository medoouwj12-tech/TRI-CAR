/**
 * Seed the database with the admin user only.
 * Run with:  npx prisma db seed
 */
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('👤 Seeding admin user...');
  const email = process.env.ADMIN_EMAIL || 'admin@firstcar.eg';
  const plainPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const password = await hash(plainPassword, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: { email, password, name: 'Admin', role: Role.ADMIN },
  });
  console.log(`✓ admin: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
