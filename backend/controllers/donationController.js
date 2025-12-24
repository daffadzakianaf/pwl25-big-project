import * as Donation from '../models/donationModel.js';

/**
 * GET /donations
 * Admin: lihat semua donasi
 */
export async function getDonations(req, res, next) {
  try {
    const donations = await Donation.getAllDonations();
    res.json(donations);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /donations/:id
 * Detail donasi
 */
export async function getDonation(req, res, next) {
  try {
    const donation = await Donation.getDonationById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donasi tidak ditemukan' });
    }
    res.json(donation);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /donations
 * User melakukan donasi
 */
export async function createDonation(req, res, next) {
  try {
    const donationData = {
      user_id: req.user.id, // dari authMiddleware
      campaign_id: req.body.campaign_id,
      amount: req.body.amount,
      payment_method: req.body.payment_method,
      status: 'pending'
    };

    const newDonation = await Donation.createDonation(donationData);
    res.status(201).json({
      message: 'Donasi berhasil dibuat',
      data: newDonation
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /donations/:id
 * Admin update status donasi
 */
export async function updateDonationStatus(req, res, next) {
  try {
    const updated = await Donation.updateDonationStatus(
      req.params.id,
      req.body.status
    );

    if (!updated) {
      return res.status(404).json({ message: 'Donasi tidak ditemukan' });
    }

    res.json({ message: 'Status donasi berhasil diperbarui' });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /donations/:id
 * Admin hapus donasi
 */
export async function deleteDonation(req, res, next) {
  try {
    const deleted = await Donation.deleteDonation(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Donasi tidak ditemukan' });
    }

    res.json({ message: 'Donasi berhasil dihapus' });
  } catch (err) {
    next(err);
  }
}
