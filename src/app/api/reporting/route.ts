import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  // Total donations given and received
  const total = await pool.query('SELECT SUM(amount) as total_amount FROM donations');
  // Top donors
  const topDonors = await pool.query('SELECT "donorId", SUM(amount) as total_given FROM donations GROUP BY "donorId" ORDER BY total_given DESC LIMIT 5');
  // Top receivers
  const topReceivers = await pool.query('SELECT "recipientId", SUM(amount) as total_received FROM donations GROUP BY "recipientId" ORDER BY total_received DESC LIMIT 5');

  return NextResponse.json({
    totalAmount: total.rows[0]?.total_amount || 0,
    topDonors: topDonors.rows,
    topReceivers: topReceivers.rows,
  });
}
