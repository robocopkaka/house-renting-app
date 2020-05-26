import express from 'express';
import BookmarkController from '../controllers/bookmarkController'
import { authenticateUser } from '../middleware/authenticateUser';
import { authenticateTenant } from '../middleware/authenticateTenant';
import { bookmarkValidation } from '../middleware/validation/bookmarkValidation';

const router = express.Router();

router.post(
    '/',
    authenticateUser,
    authenticateTenant,
    bookmarkValidation,
    BookmarkController.create
);

router.get(
    '/',
    authenticateUser,
    authenticateTenant,
    BookmarkController.fetchAll
);

router.delete(
    '/',
    authenticateUser,
    authenticateTenant,
    bookmarkValidation,
    BookmarkController.delete
);

export default router;
