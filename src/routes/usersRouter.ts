import express from 'express';
import Landlord from '../controllers/userController';
import { signupUserValidation, loginUserValidation, updateUserValidation } from '../middleware/validation/userValidation';

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

router.patch(
  '/:id',
  updateUserValidation,
  landlord.update
)

export default router;
