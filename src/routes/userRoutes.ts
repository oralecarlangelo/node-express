import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { createUser, getUsers } from '../controllers/userController';
const router = Router();

// User Routes
router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);
export default router;
