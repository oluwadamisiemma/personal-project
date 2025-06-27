import Schedule from '../models/Schedule.js';

export const createSchedule = async (req, res) => {
  const schedule = await Schedule.create({ ...req.body, user: req.user.id });
  res.json(schedule);
};

export const getSchedules = async (req, res) => {
  const schedules = await Schedule.find({ user: req.user.id });
  res.json(schedules);
};

export const updateSchedule = async (req, res) => {
  const updated = await Schedule.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteSchedule = async (req, res) => {
  await Schedule.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Deleted' });
};
