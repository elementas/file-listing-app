import { Router } from 'express';
import { listFiles, scanFiles, downloadState } from './files-controller';

const router = Router();

router.get('/list', listFiles);
router.get('/scan', scanFiles);
router.get('/download-state', downloadState);

export default router;
