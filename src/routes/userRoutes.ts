// src/routes/user.routes.ts
import { Router } from 'express';
import { validateCreateUserRequest } from '../validators/requestValidator';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * Create a user and assign categories
 * POST /users
 * Body: { email: string, categories: number[] }
 */
router.post('/create', validateCreateUserRequest, userController.createUser);

/**
 * Fetch a user with her/his categories
 * GET /users/:id
 */
router.get('/:id', userController.getUser);

export default router;

