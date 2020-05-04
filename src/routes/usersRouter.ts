import express from 'express';
import User from '../controllers/userController';
import { signupUserValidation, loginUserValidation, updateUserValidation } from '../middleware/validation/userValidation';

const router = express.Router();
const user = new User();

router.post(
  '/signup',
  signupUserValidation,
  user.signUp
);

router.post(
  '/login',
  loginUserValidation,
  user.login
);

router.patch(
  '/:id',
  updateUserValidation,
  user.update
);

export default router;
