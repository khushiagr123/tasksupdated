import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  description: String,
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  due_date: Date,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Overdue'],
    default: 'Open',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  related_entity: {
    type: {
      type: String,
      enum: ['Lead', 'Contact', 'Account', 'Opportunity'],
      required: true,
    },
    entity_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  notes: [String],
}, { timestamps: true });

taskSchema.index({ assigned_to: 1 });
taskSchema.index({ due_date: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ 'related_entity.entity_id': 1, 'related_entity.type': 1 });

export default mongoose.model('Task', taskSchema);
