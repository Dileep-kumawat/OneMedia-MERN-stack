import express from 'express';
const router = express.Router();

import { register, login, getProfile } from '../controllers/auth.controllers.js';
import authMiddleware from '../middleware/JWT.middleware.js';

router.route('/profile')
    .get(authMiddleware, getProfile);

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

export default router;
