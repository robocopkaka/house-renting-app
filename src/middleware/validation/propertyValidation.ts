import { addPropertySchema, updatePropertySchema } from './schemas/propertySchema';
import {validationHandler} from "./validationHandler";

export const addPropertyValidation = (req, res, next) => {
  return validationHandler(req.body, addPropertySchema, res, next)
};

export const updatePropertyValidation = (req, res, next) => {
  return validationHandler(req.body, updatePropertySchema, res, next);
};
