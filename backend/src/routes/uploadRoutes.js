import express from 'express';
import { upload, uploadFile } from '../controllers/uploadController.js';

const router = express.Router();

// Define routes for file uploads
router.post('/', upload.single('file'), uploadFile);

export default router;
