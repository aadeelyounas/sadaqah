import { NextResponse } from 'next/server';
import { getDonationById } from '@/lib/donation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const donation = await getDonationById(id);
    return NextResponse.json({ donation });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 404 });
  }
}
