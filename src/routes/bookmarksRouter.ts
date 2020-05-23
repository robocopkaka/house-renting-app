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

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 81007df... Allow tenant to add, fetch and delete bookmarks
