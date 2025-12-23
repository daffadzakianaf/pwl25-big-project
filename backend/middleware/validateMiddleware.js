export default function validate(req, res, next) {
  for (const key in req.body) {
    if (!req.body[key]) {
      return res.status(400).json({ message: `${key} tidak boleh kosong` });
    }
  }
  next();
}
