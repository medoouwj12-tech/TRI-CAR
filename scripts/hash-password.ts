/**
 * Generate a bcrypt hash for ADMIN_PASSWORD_HASH.
 * Usage: npm run admin:hash -- "your-secure-password"
 */
import { hash } from 'bcryptjs';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:hash -- "your-password"');
  process.exit(1);
}

hash(password, 10).then((h) => {
  console.log('\nAdd to .env:\n');
  console.log(`ADMIN_PASSWORD_HASH="${h}"`);
  console.log('');
});
