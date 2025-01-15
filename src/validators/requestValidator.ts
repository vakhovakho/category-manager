import { Request, Response, NextFunction } from 'express';

export const validateCreateUserRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { email, categories } = req.body;

    if (!email || typeof email !== 'string') {
        res.status(400).json({ error: "Invalid or missing 'email' field" });
        return; // Explicit return to prevent further execution
    }

    if (!Array.isArray(categories) || categories.some((c) => typeof c !== 'number')) {
        res.status(400).json({
            error: "Invalid or missing 'categories' field. It should be an array of numbers",
        });
        return; // Explicit return to prevent further execution
    }

    next(); // If validation passes, call the next middleware/controller
};

