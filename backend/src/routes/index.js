import { Router } from 'express';
const router = Router();

import salesRoutes from './salesRoutes.js';
import uploadRoutes from './uploadRoutes.js';

// Use sales routes for /api/sales
router.use('/sales', salesRoutes);

// Use upload routes for /api/upload
router.use('/upload', uploadRoutes);

export default router;
