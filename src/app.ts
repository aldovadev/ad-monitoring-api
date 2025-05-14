import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import prisma from './config/prisma.client';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Application = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'same-site' },
  referrerPolicy: { policy: 'no-referrer' },
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000, includeSubDomains: true },
  xssFilter: true
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
});

app.use('/api/', apiLimiter);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is healthy' });
});


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Ad Performance Monitoring System API',
    version: '1.0.0',
    documentation: '/api/v1/docs',
    healthcheck: '/api/health'
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
