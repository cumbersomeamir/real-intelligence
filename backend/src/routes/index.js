/**
 * @file API route aggregator.
 */

import { Router } from 'express';
import authRoutes from './authRoutes.js';
import propertyRoutes from './propertyRoutes.js';
import dealRoutes from './dealRoutes.js';
import buyerRoutes from './buyerRoutes.js';
import microLocationRoutes from './microLocationRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import scraperRoutes from './scraperRoutes.js';
import revenueRoutes from './revenueRoutes.js';
import reportRoutes from './reportRoutes.js';
import agentRoutes from './agentRoutes.js';
import socialRoutes from './socialRoutes.js';
import whatsappRoutes from './whatsappRoutes.js';
import blogRoutes from './blogRoutes.js';
import webhookRoutes from './webhookRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/deals', dealRoutes);
router.use('/buyers', buyerRoutes);
router.use('/micro-locations', microLocationRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/scraper', scraperRoutes);
router.use('/revenue', revenueRoutes);
router.use('/reports', reportRoutes);
router.use('/agents', agentRoutes);
router.use('/social', socialRoutes);
router.use('/whatsapp', whatsappRoutes);
router.use('/blog', blogRoutes);
router.use('/webhooks', webhookRoutes);

export default router;
