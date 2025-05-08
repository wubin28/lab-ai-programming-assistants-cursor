import { Router } from 'express';
import promptController from '../controllers/prompt.controller';

const router = Router();

/**
 * @route POST /api/prompt/optimize
 * @desc Optimize a prompt using DeepSeek API
 * @access Public
 */
router.post('/optimize', promptController.optimizePrompt);

export default router; 