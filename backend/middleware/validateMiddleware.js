export default function validate(req, res, next) {
  // Ambil semua value dari body
  const values = Object.values(req.body);

  // Jika body kosong
  if (!values.length) {
    return res.status(400).json({ message: 'Body request tidak boleh kosong' });
  }

  // Cek setiap field
  for (let value of values) {
    if (value === undefined || value === null || value === '') {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
  }

  next();
}

