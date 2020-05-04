import jwt from 'jsonwebtoken';
import User from "../models/User";

export const authenticateUser =  (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, async (err, decoded) => {
    try {
      const user = await User.findByPk(decoded.id);

      if (user.role != 'landlord') {
        return res.status(401).json({ message: 'Unauthorized user' })
      }

      req.headers['landlordId'] = decoded.id;
      delete req.headers['token'];
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
  });
};
