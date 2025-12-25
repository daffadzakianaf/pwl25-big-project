import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

dotenv.config();

const app = express();

app.use(express.json()); // ⬅️ WAJIB
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API berjalan');
});

app.use('/auth', authRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/donations', donationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});
