import { NextResponse } from 'next/server';
import { createDonation, getDonationsByUser, getRecentDonations, getUserDonationSummary, getTotalDonationCount, updateDonation, deleteDonation } from '@/lib/donation';

export async function POST(request: Request) {
  const { amount, type, donorName, recipientName, location, donatedAt } = await request.json();
  
  if (!amount || !type || !donorName || !recipientName) {
    return NextResponse.json({ error: 'Amount, type, donor name, and recipient name are required' }, { status: 400 });
  }

  if (amount <= 0) {
    return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 });
  }

  if (!['GIVEN', 'RECEIVED'].includes(type)) {
    return NextResponse.json({ error: 'Type must be GIVEN or RECEIVED' }, { status: 400 });
  }

  const donation = await createDonation(amount, type, donorName, recipientName, location, donatedAt);
  return NextResponse.json({ donation });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');
  const type = url.searchParams.get('type');
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  if (type === 'recent') {
    const recentDonations = await getRecentDonations(userId);
    return NextResponse.json({ recentDonations });
  }

  if (type === 'summary') {
    const summary = await getUserDonationSummary(userId);
    return NextResponse.json({ summary });
  }

  if (type === 'count') {
    const totalCount = await getTotalDonationCount();
    return NextResponse.json({ totalCount });
  }

  if (type === 'all') {
    const donations = await getDonationsByUser(userId);
    return NextResponse.json({ donations });
  }

  const donations = await getDonationsByUser(userId);
  return NextResponse.json({ donations });
}

export async function PUT(request: Request) {
  const { id, amount, type, donorName, recipientName, location, donatedAt } = await request.json();
  
  if (!id || !amount || !type || !donorName || !recipientName) {
    return NextResponse.json({ error: 'ID, amount, type, donor name, and recipient name are required' }, { status: 400 });
  }

  if (!['GIVEN', 'RECEIVED'].includes(type)) {
    return NextResponse.json({ error: 'Type must be GIVEN or RECEIVED' }, { status: 400 });
  }

  try {
    const donation = await updateDonation(id, amount, type, donorName, recipientName, location, donatedAt);
    return NextResponse.json({ donation });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Donation ID is required' }, { status: 400 });
  }

  try {
    const donation = await deleteDonation(id);
    return NextResponse.json({ message: 'Donation deleted successfully', donation });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
