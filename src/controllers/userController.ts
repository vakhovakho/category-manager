import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/BadRequestError';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, categories } = req.body;
        const user = await userService.createUser(email, categories);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof BadRequestError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            next(error);
        }
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

