import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import prisma from './config/prisma.client';


dotenv.config();

const app: Application = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

app.use(express.json());

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || '*'
}));

app.use(morgan('dev'));


app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is healthy' });
});


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Ad Performance Monitoring System API',
    version: '1.0.0',
    documentation: '/api/v1/docs',
    healthcheck: '/health'
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma disconnected. Shutting down...');
  process.exit(0);
});

export default app;
