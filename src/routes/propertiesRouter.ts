import express from 'express';
import PropertyController from '../controllers/propertyController';
import { addPropertyValidation, updatePropertyValidation } from '../middleware/validation/propertyValidation';
import { authenticateLandlord } from '../middleware/authenticateLandlord';
import { authenticateUser } from '../middleware/authenticateUser';


const router = express.Router();

router.post(
  '/',
  authenticateUser,
  authenticateLandlord,
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
  authenticateLandlord,
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
  authenticateLandlord,
  PropertyController.delete
);

export default router;
