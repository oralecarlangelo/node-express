import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes'

dotenv.config();

const app: Application = express();

// Use Helmet for setting various HTTP headers for security
app.use(helmet());

// Enable CORS
app.use(cors());

// Enable HTTP request logging
app.use(morgan('combined'));

// Enable response compression
app.use(compression());

// Use rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable JSON body parsing
app.use(bodyParser.json());

// Enable urlencoded body parsing
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cookie parsing
app.use(cookieParser());

// Use your routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port: string | number = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
