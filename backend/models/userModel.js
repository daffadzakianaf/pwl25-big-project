import db from '../config/db.js';

/**
 * Cari user berdasarkan username
 */
export const findByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

/**
 * Simpan user baru
 */
export const create = async (data) => {
  const { username, password, role } = data;

  const [result] = await db.query(
    `INSERT INTO users (username, password, role)
     VALUES (?, ?, ?)`,
    [username, password, role]
  );

  return result.insertId;
};
