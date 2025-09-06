import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validateRegisterInput, validateLoginInput } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

router.post('/register', validateRegisterInput, authController.register);
router.post('/login', validateLoginInput, authController.login);
router.get('/me', authenticate, authController.getCurrentUser);

export default router;
