import { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        error: err instanceof Error ? err.message : 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : err,
    });
};

