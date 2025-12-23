import * as Campaign from '../models/campaignModel.js';

// Ambil semua campaign donasi
export const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.getAll();
    res.json(campaigns);
  } catch (error) {
    next(error);
  }
};

// Ambil detail campaign berdasarkan ID
export const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.getById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign tidak ditemukan' });
    }
    res.json(campaign);
  } catch (error) {
    next(error);
  }
};

// Tambah campaign baru (ADMIN)
export const createCampaign = async (req, res, next) => {
  try {
    const campaignId = await Campaign.create(req.body);
    res.status(201).json({
      message: 'Campaign berhasil dibuat',
      campaign_id: campaignId
    });
  } catch (error) {
    next(error);
  }
};

// Update campaign (ADMIN)
export const updateCampaign = async (req, res, next) => {
  try {
    const updated = await Campaign.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Campaign tidak ditemukan' });
    }
    res.json({ message: 'Campaign berhasil diperbarui' });
  } catch (error) {
    next(error);
  }
};

// Hapus campaign (ADMIN)
export const deleteCampaign = async (req, res, next) => {
  try {
    const deleted = await Campaign.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Campaign tidak ditemukan' });
    }
    res.json({ message: 'Campaign berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};