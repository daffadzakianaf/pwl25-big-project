const validate = (fields = []) => {
  return (req, res, next) => {
    // DEBUG LOG
    console.log('VALIDATE MIDDLEWARE MASUK');
    console.log('REQ BODY:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Request body tidak boleh kosong'
      });
    }

    if (fields.length > 0) {
      const missing = fields.filter(field => !req.body[field]);
      if (missing.length > 0) {
        return res.status(400).json({
          message: `Field wajib diisi: ${missing.join(', ')}`
        });
      }
    }

    // WAJIB ADA
    next();
  };
};

export default validate;

