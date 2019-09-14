import express from 'express';
import userRoutes from './userRoutes';

const router = express.Router();

router.use(userRoutes);

export default router;
