export interface User {
  id: string;
  email: string;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  description: string;
  category: string;
  type: 'GIVEN' | 'RECEIVED';
  status: string;
  donorId: string;
  recipientId: string;
  recipientName: string;
  donatedAt: string;
  createdAt: string;
  updatedAt: string;
  donor_name: string;
  location?: string;
}

export interface DonationSummary {
  totalGiven: number;
  totalReceived: number;
  balance: number;
}

export interface RecentDonations {
  given: Donation[];
  received: Donation[];
}

export interface Report {
  totalAmount: number;
  topDonors: Array<{
    donorId: string;
    total_given: number;
  }>;
  topReceivers: Array<{
    recipientId: string;
    total_received: number;
  }>;
}
