import pool from '@/lib/db';

export async function createDonation(
  amount: number, 
  type: 'GIVEN' | 'RECEIVED', 
  donorName: string, 
  recipientName: string, 
  location?: string,
  donatedAt?: string
) {
  const result = await pool().query(
    `INSERT INTO donations (
      id, amount, currency, description, category, type, status, 
      "donorId", "recipientId", "recipientName", "donatedAt", "updatedAt", donor_name, location
    ) VALUES (
      gen_random_uuid(), $1, 'PKR', '', 'General', $2, 'COMPLETED', 
      $3, $4, $5, $6, CURRENT_TIMESTAMP, $7, $8
    ) RETURNING *`,
    [
      amount, 
      type, 
      donorName,           // Simple text for donorId 
      recipientName,       // Simple text for recipientId
      recipientName,       // recipientName field
      donatedAt ? new Date(donatedAt) : new Date(), // Custom date or current
      donorName,           // donor_name field
      location
    ]
  );
  return result.rows[0];
}

export async function getDonationsByUser(userId: string) {
  // For unified system, return all donations
  const result = await pool().query(
    'SELECT * FROM donations ORDER BY "donatedAt" DESC'
  );
  return result.rows;
}

export async function getRecentDonations(userId: string, limit: number = 5) {
  // For unified system, show recent given and received donations from all users
  const given = await pool().query(
    'SELECT *, \'given\' as donation_type FROM donations WHERE type = \'GIVEN\' ORDER BY "donatedAt" DESC LIMIT $1',
    [limit]
  );
  
  const received = await pool().query(
    'SELECT *, \'received\' as donation_type FROM donations WHERE type = \'RECEIVED\' ORDER BY "donatedAt" DESC LIMIT $1',
    [limit]
  );
  
  return {
    given: given.rows,
    received: received.rows
  };
}

export async function getTotalStats() {
  const given = await pool().query(
    'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE type = \'GIVEN\''
  );
  
  const received = await pool().query(
    'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE type = \'RECEIVED\''
  );
  
  return {
    totalGiven: parseFloat(given.rows[0].total),
    totalReceived: parseFloat(received.rows[0].total)
  };
}

export async function getUserDonationSummary(userId: string) {
  // For unified system, show total amounts given and received across all users
  const givenResult = await pool().query(
    'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE type = \'GIVEN\'',
    []
  );
  
  const receivedResult = await pool().query(
    'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE type = \'RECEIVED\'',
    []
  );
  
  const totalGiven = parseFloat(givenResult.rows[0].total);
  const totalReceived = parseFloat(receivedResult.rows[0].total);
  
  return {
    totalGiven,
    totalReceived,
    balance: totalReceived - totalGiven
  };
}

export async function getTotalDonationCount() {
  const result = await pool().query(
    'SELECT COUNT(*) as total FROM donations'
  );
  
  return parseInt(result.rows[0].total);
}

export async function updateDonation(
  id: string,
  amount: number,
  type: 'GIVEN' | 'RECEIVED',
  donorName: string,
  recipientName: string,
  location?: string,
  donatedAt?: string
) {
  const result = await pool().query(
    `UPDATE donations SET 
      amount = $2, 
      type = $3, 
      "donorId" = $4, 
      "recipientId" = $5, 
      "recipientName" = $5, 
      donor_name = $4, 
      location = $6,
      "donatedAt" = $7,
      "updatedAt" = CURRENT_TIMESTAMP
    WHERE id = $1 
    RETURNING *`,
    [
      id,
      amount,
      type,
      donorName,
      recipientName,
      location,
      donatedAt ? new Date(donatedAt) : new Date()
    ]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Donation not found');
  }
  
  return result.rows[0];
}

export async function deleteDonation(id: string) {
  const result = await pool().query(
    'DELETE FROM donations WHERE id = $1 RETURNING *',
    [id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Donation not found');
  }
  
  return result.rows[0];
}

export async function getDonationById(id: string) {
  const result = await pool().query(
    'SELECT * FROM donations WHERE id = $1',
    [id]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Donation not found');
  }
  
  return result.rows[0];
}
