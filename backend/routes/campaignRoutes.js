import express from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign
} from '../controllers/campaignController.js';

import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

/**
 * PUBLIC / USER
 */

// GET /campaigns → tampilkan semua campaign
router.get('/', getAllCampaigns);

// GET /campaigns/:id → detail campaign
router.get('/:id', getCampaignById);

/**
 * ADMIN ONLY
 */

// POST /campaigns → tambah campaign
router.post(
  '/',
  auth,
  role('admin'),
  validate,
  createCampaign
);

// PUT /campaigns/:id → update campaign
router.put(
  '/:id',
  auth,
  role('admin'),
  validate,
  updateCampaign
);

// DELETE /campaigns/:id → hapus campaign
router.delete(
  '/:id',
  auth,
  role('admin'),
  deleteCampaign
);

export default router;
