import jwt from 'jsonwebtoken';
import Landlord from "../models/Landlord";

export const authenticateLandlord =  (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, async (err, decoded) => {
    try {
      const landlord = await Landlord.findByPk(decoded.id);

      if (!landlord) {
        res.status(401).json({ message: 'Unauthorized user' })
      }

      req.headers['landlordId'] = decoded.id;
      delete req.headers['token'];
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized user' })
    }
  });
};
