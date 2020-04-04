import express from 'express';
import Landlord from '../controllers/landlordController';
import validation from '../middleware/validation';

const router = express.Router();
const landlord = new Landlord();

router.post(
  '/signup',
  validation.checkUserInput,
  landlord.signUp
);

router.post(
  '/login',
  landlord.login
);

export default router;
