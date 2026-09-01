import { Router } from 'express';
import authRoutes from './authRoutes';
import studentRoutes from './studentRoutes';
import eventsRoutes from './events.routes';
import recommendationsRoutes from './recommendations.routes';
import interactionRoutes from './interactionRoutes';
import calendarRoutes from './calendarRoutes';
import notificationRoutes from './notificationRoutes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/events', eventsRoutes);
router.use('/recommendations', recommendationsRoutes);
router.use('/interactions', interactionRoutes);
router.use('/calendar', calendarRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
