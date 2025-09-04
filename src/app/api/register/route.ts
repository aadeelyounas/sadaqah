import { NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/user';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);
  return NextResponse.json({ user });
}
