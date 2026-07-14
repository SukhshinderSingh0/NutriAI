const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // 1:M relationship
    },
    weight: {
      type: Number,
      required: true,
      min: 20,
      max: 300,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WeightLog', weightLogSchema);
