import { Router } from 'express';
const router = Router();
import { getSales, getUploadHistory } from '../controllers/salesController.js';

router.get('/upload-history', getUploadHistory);
router.get('/', getSales);

export default router;
