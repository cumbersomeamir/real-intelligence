/**
 * @file Agent route definitions.
 */

import { Router } from 'express';
import {
  listAgents,
  getAgentDetail,
  triggerAgent,
  updateAgentConfig,
  agentLogs,
  toggleAgent
} from '../controllers/agentController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';
import { asyncHandler } from '../utils/helpers.js';

const router = Router();

router.use(authenticate, authorize('admin'));
router.get('/', asyncHandler(listAgents));
router.get('/:name', asyncHandler(getAgentDetail));
router.post('/:name/trigger', asyncHandler(triggerAgent));
router.patch('/:name/config', asyncHandler(updateAgentConfig));
router.get('/:name/logs', asyncHandler(agentLogs));
router.post('/:name/toggle', asyncHandler(toggleAgent));

export default router;
