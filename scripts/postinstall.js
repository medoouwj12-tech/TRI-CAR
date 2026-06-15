const { execSync } = require('child_process');

// Ensure DATABASE_URL is defined during prisma generate to prevent validation crash
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://dummy_user:dummy_pass@localhost:5432/dummy_db';

console.log('📦 Running postinstall database client generation...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully.');
} catch (err) {
  console.error('❌ Prisma client generation failed:', err.message);
  process.exit(1);
}
