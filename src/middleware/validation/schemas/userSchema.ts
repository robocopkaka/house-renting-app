import Joi from '@hapi/joi';

const name = Joi.string().trim().min(3).max(150)
  .required();
const email = Joi.string().trim().max(100)
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required();
const password = Joi.string().min(8).max(150).trim()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required();
const phoneNumber = Joi.number().integer().required();

export const signupUserSchema = Joi.object({
  name,
  email,
  password,
  phoneNumber});

export const loginUserSchema = Joi.object({
  email,
  password
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(150),
  phoneNumber: Joi.number().integer()
});
