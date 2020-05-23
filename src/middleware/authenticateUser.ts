import jwt from 'jsonwebtoken';

export const authenticateUser =  (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, async (err, decoded) => {
    try {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      }
      req.headers.decoded = decoded;
      delete req.headers['token'];
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  });
};
