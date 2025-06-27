import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  title: String,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Schedule', scheduleSchema);

