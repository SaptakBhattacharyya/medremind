const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  dosage: { type: String },
  frequency: { type: String },
  category: { type: String, enum: ['Antibiotic', 'Painkiller', 'Vitamin', 'Antacid', 'Other'], default: 'Other' },
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Medicine', medicineSchema);
