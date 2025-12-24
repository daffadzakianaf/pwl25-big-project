import db from '../config/db.js';

/**
 * Ambil semua data donasi
 */
export async function getAllDonations() {
  const [rows] = await db.query(`
    SELECT 
      d.id,
      u.username,
      c.title AS campaign,
      d.amount,
      d.payment_method,
      d.status,
      d.donated_at
    FROM donations d
    JOIN users u ON d.user_id = u.id
    JOIN campaigns c ON d.campaign_id = c.id
    ORDER BY d.donated_at DESC
  `);
  return rows;
}

/**
 * Ambil donasi berdasarkan ID
 */
export async function getDonationById(id) {
  const [rows] = await db.query(
    'SELECT * FROM donations WHERE id = ?',
    [id]
  );
  return rows[0];
}

/**
 * Tambah donasi baru
 */
export async function createDonation(data) {
  const { user_id, campaign_id, amount, payment_method, status } = data;

  const [result] = await db.query(
    `INSERT INTO donations 
    (user_id, campaign_id, amount, payment_method, status)
    VALUES (?, ?, ?, ?, ?)`,
    [user_id, campaign_id, amount, payment_method, status || 'pending']
  );

  return {
    id: result.insertId,
    ...data
  };
}

/**
 * Update status donasi
 */
export async function updateDonationStatus(id, status) {
  const [result] = await db.query(
    'UPDATE donations SET status = ? WHERE id = ?',
    [status, id]
  );

  return result.affectedRows > 0;
}

/**
 * Hapus donasi
 */
export async function deleteDonation(id) {
  const [result] = await db.query(
    'DELETE FROM donations WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
}
