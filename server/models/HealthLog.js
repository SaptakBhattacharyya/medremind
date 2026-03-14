const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, required: true, default: Date.now },
  mood: { type: String, enum: ['great', 'good', 'okay', 'bad', 'terrible'] },
  weight: { type: Number },
  bloodPressure: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthLog', healthLogSchema);
