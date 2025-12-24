export default function role(requiredRole) {
  return (req, res, next) => {
    // Pastikan user sudah login
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Cek role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    next();
  };
}
