const validate = (requiredFields = []) => {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body kosong'
      });
    }

    for (const field of requiredFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ''
      ) {
        return res.status(400).json({
          message: `Field '${field}' wajib diisi`
        });
      }
    }

    next();
  };
};

export default validate;


