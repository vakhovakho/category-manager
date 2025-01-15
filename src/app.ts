// src/app.ts
import express from 'express';
import cors from 'cors';
import { errorHandlerMiddleware } from './middlewares/errorHandleMiddleware';
import userRouter from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRouter);

// Error Handling Middleware
app.use(errorHandlerMiddleware);

export default app;

