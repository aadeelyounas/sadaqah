import { Pool } from 'pg';

let pool: Pool | null = null;

// Initialize pool only when needed (not during build)
function getPool(): Pool {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  
  if (!pool) {
    throw new Error('Database connection not available');
  }
  
  return pool;
}

// Export the function instead of calling it immediately
export default getPool;
