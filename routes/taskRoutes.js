import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect, authorize } from '../middlewares/auth.js';
import { ROLES } from '../utils/role.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize(ROLES.ADMIN, ROLES.MANAGER), createTask)
  .get(protect, getTasks);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, authorize(ROLES.ADMIN, ROLES.MANAGER), updateTask)
  .delete(protect, authorize(ROLES.ADMIN), deleteTask);

export default router;
