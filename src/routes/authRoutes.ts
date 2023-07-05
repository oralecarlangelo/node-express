import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { LoginUserDto, RegisterUserDto } from '../dto/UserDto';

const router = Router();

router.post('/register', validationMiddleware(RegisterUserDto), registerUser);

router.post('/login', validationMiddleware(LoginUserDto),loginUser);

export default router;
