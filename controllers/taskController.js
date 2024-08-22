import Task from '../models/Task.js';
import { ROLES } from '../utils/role.js';

export const createTask = async (req, res, next) => {
  try {
    const { task_name, description, assigned_to, due_date, status, priority, related_entity, notes } = req.body;
    
    // Check if the related entity exists (Implement according to your setup)
    // For example: const entity = await Lead.findById(related_entity.entity_id);
    
    const task = await Task.create({
      task_name,
      description,
      assigned_to,
      due_date,
      status,
      priority,
      related_entity,
      notes,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assigned_to');
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assigned_to');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only Admin or Manager can update the task
    if (req.user.role !== ROLES.ADMIN && req.user.role !== ROLES.MANAGER && task.assigned_to.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(task, req.body);
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only Admin can delete the task
    if (req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await task.deleteOne(); // This is the correct method to delete the document
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

