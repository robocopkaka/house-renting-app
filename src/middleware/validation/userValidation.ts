import { signupUserSchema, loginUserSchema } from './schemas/userSchema';
import { validationHandler } from './validationHandler';

export const signupUserValidation = (req, res, next) => {
  return validationHandler(req.body, signupUserSchema, res, next);
};

export const loginUserValidation = (req, res, next) => {
  return validationHandler(req.body, loginUserSchema, res, next);
};
