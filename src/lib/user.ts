import pool from '@/lib/db';

export async function createUser(email: string, passwordHash: string) {
  const result = await pool().query(
    'INSERT INTO users (id, email, password_hash, "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, email',
    [email, passwordHash]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await pool().query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}
