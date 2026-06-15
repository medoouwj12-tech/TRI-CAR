const { execSync } = require('child_process');

if (process.env.DATABASE_URL) {
  console.log('🔌 DATABASE_URL found. Running Prisma database sync & seed...');
  try {
    execSync('npx prisma db push', { stdio: 'inherit' });
    execSync('npx prisma db seed', { stdio: 'inherit' });
    console.log('✅ Database setup completed successfully.');
  } catch (err) {
    console.error('❌ Database setup failed:', err.message);
    process.exit(1);
  }
} else {
  console.log('⚠️ DATABASE_URL not found. Skipping database setup and falling back to static mock data.');
}
