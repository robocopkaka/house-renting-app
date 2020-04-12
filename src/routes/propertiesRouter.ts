import express from 'express';
import PropertyController from '../controllers/propertyController';
import {addPropertyValidation, updatePropertyValidation } from '../middleware/validation/propertyValidation';
import { authenticateLandlord } from '../middleware/authenticateLandlord';

const router = express.Router();

router.post(
  '/',
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
  authenticateLandlord,
  PropertyController.delete
);

export default router;
