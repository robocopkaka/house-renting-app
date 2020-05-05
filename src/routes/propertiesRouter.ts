import express from 'express';
import PropertyController from '../controllers/propertyController';
import { addPropertyValidation, updatePropertyValidation } from '../middleware/validation/propertyValidation';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

router.post(
  '/',
  authenticateUser,
  addPropertyValidation,
  PropertyController.create
);

router.get(
  '/',
  PropertyController.fetchAll
)

router.patch(
  '/:id',
  authenticateUser,
  updatePropertyValidation,
  PropertyController.update
);

router.get(
  '/:id',
  PropertyController.fetchOne
)

router.delete(
  '/:id',
  authenticateUser,
  PropertyController.delete
);

export default router;
