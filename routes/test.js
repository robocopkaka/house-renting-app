import express from 'express';
const router = express.Router();
import * as testController from '../controllers/testController';

router.get('/', testController.get);

export default router;