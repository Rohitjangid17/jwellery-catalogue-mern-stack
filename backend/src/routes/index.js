import express from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

export default router;
