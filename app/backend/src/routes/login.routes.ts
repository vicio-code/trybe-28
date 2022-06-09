import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();

router.post('/login', loginValidation, loginController.login);
router.get('/login/validate', loginController.validate);

export default router;
