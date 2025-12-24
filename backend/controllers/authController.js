import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as User from '../models/userModel.js';

dotenv.config();

/**
 * REGISTER USER
 * POST /auth/register
 */
export const register = async (req, res, next) => {
  console.log('MASUK REGISTER CONTROLLER');
  console.log(req.body);
  try {
    const { username, password, role } = req.body;

    // Cek user sudah ada
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    await User.create({
      username,
      password: hashedPassword,
      role: role || 'user'
    });

    res.status(201).json({ message: 'User berhasil didaftarkan' });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN USER
 * POST /auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login berhasil',
      token
    });
  } catch (error) {
    next(error);
  }
};

