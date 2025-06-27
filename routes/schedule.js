import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';

const router = express.Router();

router.use(auth);

router.post('/', createSchedule);
router.get('/', getSchedules);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;

