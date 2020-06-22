import { bookmarkSchema } from './schemas/bookmarkSchema';
import {validationHandler} from "./validationHandler";

export const bookmarkValidation = (req, res, next) => {
    return validationHandler(req.body, bookmarkSchema, res, next)
};
