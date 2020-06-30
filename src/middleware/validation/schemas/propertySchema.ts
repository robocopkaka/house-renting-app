import Joi from '@hapi/joi';

const name = Joi.string().trim().min(3).max(150).required();
const description = Joi.string().trim().min(3).required();
const propertyType = Joi.string().trim().min(3).max(20);
const address = Joi.string().trim().min(3).max(200).required();
const features = Joi.array();
const category = Joi.string().valid('rent', 'lease', 'sale', 'short-let').required();
const available = Joi.boolean();

export const addPropertySchema = Joi.object({
  name,
  description,
  propertyType,
  address,
  features,
  category,
  available
});

export const updatePropertySchema = Joi.object({
  name: Joi.string().trim().min(3).max(150),
  description: Joi.string().trim().min(3),
  propertyType,
  address: Joi.string().trim().min(3).max(200),
  features,
  category: Joi.string().trim().min(3).max(30),
  available
});
