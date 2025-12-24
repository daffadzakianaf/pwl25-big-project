import express from 'express';
import {
  getDonations,
  getDonation,
  createDonation,
  updateDonationStatus,
  deleteDonation
} from '../controllers/donationController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = express.Router();

/**
 * ADMIN
 * GET /donations
 * Lihat semua donasi
 */
router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  getDonations
);

/**
 * ADMIN
 * GET /donations/:id
 * Detail donasi
 */
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  getDonation
);

/**
 * USER
 * POST /donations
 * Buat donasi
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('user'),
  validate(['campaign_id', 'amount', 'payment_method']),
  createDonation
);

/**
 * ADMIN
 * PUT /donations/:id
 * Update status donasi
 */
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validate(['status']),
  updateDonationStatus
);

/**
 * ADMIN
 * DELETE /donations/:id
 * Hapus donasi
 */
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  deleteDonation
);

export default router;
