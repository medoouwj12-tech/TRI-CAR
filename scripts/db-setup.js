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
  console.log('⚠️ DATABASE_URL not found. Injecting dummy database URL for build validation...');
  // Inject a dummy URL to satisfy Prisma schema validation during the build
  process.env.DATABASE_URL = 'postgresql://dummy_user:dummy_pass@localhost:5432/dummy_db';
}

console.log('🚀 Starting Next.js compilation...');
try {
  execSync('npx next build', { stdio: 'inherit' });
  console.log('✅ Next.js build completed successfully.');
} catch (err) {
  console.error('❌ Next.js build failed.');
  process.exit(1);
}
