import { signupUserSchema, loginUserSchema, updateUserSchema } from './schemas/userSchema';
import { validationHandler } from './validationHandler';

export const signupUserValidation = (req, res, next) => {
  return validationHandler(req.body, signupUserSchema, res, next);
};

export const loginUserValidation = (req, res, next) => {
  return validationHandler(req.body, loginUserSchema, res, next);
};

export const updateUserValidation = (req, res, next) => {
  return validationHandler(req.body, updateUserSchema, res, next);
};

