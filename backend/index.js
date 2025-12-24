import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

/**
 * Middleware global
 */
app.use(express.json());

/**
 * Routes
 */
app.use('/auth', authRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/donations', donationRoutes);

/**
 * Health check (opsional tapi bagus untuk demo)
 */
app.get('/', (req, res) => {
  res.json({ message: 'Donasi API is running 🚀' });
});

/**
 * Error handler (HARUS PALING BAWAH)
 */
app.use(errorHandler);

/**
 * Server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
