import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const testResult = await pool().query('SELECT 1 as test');
    
    // Check if tables exist
    const tableCheck = await pool().query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'donations')
    `);
    
    // Check users table structure
    const usersStructure = await pool().query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    return NextResponse.json({
      databaseConnection: 'Success',
      connectionTest: testResult.rows[0],
      existingTables: tableCheck.rows.map(row => row.table_name),
      usersTableStructure: usersStructure.rows,
      databaseUrlExists: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'Not found'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      databaseUrlExists: !!process.env.DATABASE_URL,
      databaseUrlPreview: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'Not found'
    }, { status: 500 });
  }
}
