import express from 'express';
import filesRouter from './components/files/files-router';

const router = express.Router();

router.use('/', filesRouter);

export default router;
