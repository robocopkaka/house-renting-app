export const authenticateLandlord =  (req, res, next) => {
  if (req.headers.decoded.role != 'landlord') {
    return res.status(401).json({ message: 'Unauthorized user' })
  }

  req.headers['landlordId'] = req.headers.decoded.id;
  delete req.headers['token'];
  next();
};
