import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE GLOBAL
========================= */
app.use(express.json()); // WAJIB untuk Postman JSON
app.use(express.urlencoded({ extended: true }));

/* =========================
   TEST SERVER
========================= */
app.get('/', (req, res) => {
  res.send('API Donasi Berjalan 🚀');
});

/* =========================
   ROUTES
========================= */
app.use('/auth', authRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/donations', donationRoutes);

/* =========================
   ERROR HANDLER (PALING BAWAH)
========================= */
app.use(errorHandler);

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
