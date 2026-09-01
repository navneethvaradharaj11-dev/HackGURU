import { Router } from 'express';
import { StudentController } from '../controllers/studentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const studentController = new StudentController();

// Global interests catalogue
router.get('/interests', studentController.getInterests);

// Student profile & interests/skills endpoints
router.get('/students/me', authMiddleware, studentController.getMe);
router.put('/students/me', authMiddleware, studentController.updateMe);

router.get('/students/me/interests', authMiddleware, studentController.getMyInterests);
router.put('/students/me/interests', authMiddleware, studentController.updateMyInterests);

router.get('/students/me/skills', authMiddleware, studentController.getMySkills);

export default router;
