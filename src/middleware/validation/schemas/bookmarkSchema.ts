import Joi from '@hapi/joi';

export const bookmarkSchema = Joi.object({
    propertyId: Joi.number().integer().required()
});
    