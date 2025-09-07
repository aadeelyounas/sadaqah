import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const testResult = await pool().query('SELECT 1 as test');
    
    // Check if users table exists
    const tableCheck = await pool().query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'donations')
    `);
    
    return NextResponse.json({
      message: 'Database connection successful',
      connectionTest: testResult.rows[0],
      existingTables: tableCheck.rows.map(row => row.table_name),
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    }, { status: 500 });
  }
}
