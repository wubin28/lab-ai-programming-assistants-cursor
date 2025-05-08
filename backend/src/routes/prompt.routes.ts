import { Router } from 'express';
import promptController from '../controllers/prompt.controller';

const router = Router();

/**
 * @route POST /api/prompt/optimize
 * @desc Optimize a prompt using DeepSeek API
 * @access Public
 */
router.post('/optimize', promptController.optimizePrompt);

/**
 * @route POST /api/prompt/optimize/stream
 * @desc Optimize a prompt using DeepSeek API with streaming response
 * @access Public
 */
router.post('/optimize/stream', promptController.streamOptimizePrompt);

export default router; 