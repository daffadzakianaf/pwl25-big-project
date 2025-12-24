import express from 'express';
import { register, login } from '../controllers/authController.js';
import validate from '../middleware/validateMiddleware.js';

const router = express.Router();

/**
 * POST /auth/register
 * Daftar user baru (admin / user)
 */
router.post('/register', validate, register);

/**
 * POST /auth/login
 * Login user dan generate JWT
 */
router.post('/login', validate, login);

export default router;
