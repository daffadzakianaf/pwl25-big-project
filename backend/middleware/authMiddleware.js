import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function auth(req, res, next) {
  // Ambil header Authorization
  const authHeader = req.headers.authorization;

  // Cek apakah header ada
  if (!authHeader) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  // Format harus: Bearer <token>
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Format token salah' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user ke request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
}

