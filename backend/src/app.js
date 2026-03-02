/**
 * @file Express app setup.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes/index.js';
import { corsOptions } from './config/cors.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { publicLimiter } from './middleware/rateLimiter.js';
import { aiQuery } from './controllers/analyticsController.js';
import { asyncHandler } from './utils/helpers.js';

/** Express application instance. */
export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(xss());
app.use(mongoSanitize());
app.use(requestLogger);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.post('/api/ai/query', publicLimiter, asyncHandler(aiQuery));
app.use('/api', publicLimiter, routes);

app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use(errorHandler);
