import Joi from '@hapi/joi';

export const bookmarkSchema = Joi.object({
    propertyId: Joi.number().integer().required()
});
<<<<<<< HEAD

=======
>>>>>>> 81007df... Allow tenant to add, fetch and delete bookmarks
    