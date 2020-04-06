import express from 'express';
import Landlord from '../controllers/userController';
import { signupUserValidation, loginUserValidation } from '../middleware/validation/userValidation';

const router = express.Router();
const landlord = new Landlord();

router.post(
  '/signup',
  signupUserValidation,
  landlord.signUp
);

router.post(
  '/login',
  loginUserValidation,
  landlord.login
);

export default router;
