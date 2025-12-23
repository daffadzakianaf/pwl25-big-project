import db from '../config/db.js';

// Ambil semua campaign
export const getAll = async () => {
  const [rows] = await db.query(
    'SELECT * FROM campaigns ORDER BY created_at DESC'
  );
  return rows;
};

// Ambil campaign berdasarkan ID
export const getById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM campaigns WHERE id = ?',
    [id]
  );
  return rows[0];
};

// Tambah campaign baru
export const create = async (data) => {
  const {
    title,
    description,
    target_amount,
    start_date,
    end_date
  } = data;

  const [result] = await db.query(
    `INSERT INTO campaigns 
     (title, description, target_amount, start_date, end_date)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, target_amount, start_date, end_date]
  );

  return result.insertId;
};

// Update campaign
export const update = async (id, data) => {
  const {
    title,
    description,
    target_amount,
    start_date,
    end_date
  } = data;

  const [result] = await db.query(
    `UPDATE campaigns SET
      title = ?,
      description = ?,
      target_amount = ?,
      start_date = ?,
      end_date = ?
     WHERE id = ?`,
    [title, description, target_amount, start_date, end_date, id]
  );

  return result.affectedRows;
};

// Hapus campaign
export const remove = async (id) => {
  const [result] = await db.query(
    'DELETE FROM campaigns WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

// Tambah dana donasi ke campaign
// Dipanggil saat user melakukan donasi
export const addAmount = async (campaignId, amount) => {
  await db.query(
    `UPDATE campaigns 
     SET collected_amount = collected_amount + ?
     WHERE id = ?`,
    [amount, campaignId]
  );
};