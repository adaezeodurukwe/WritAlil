import express from 'express';
import userRoutes from './userRoutes';
import articleRoutes from './articleRoutes';

const router = express.Router();

router.use(userRoutes);
router.use(articleRoutes);

export default router;
