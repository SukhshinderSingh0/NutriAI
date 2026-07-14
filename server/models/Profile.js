const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // 1:1 relationship
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    heightCm: {
      type: Number,
      required: true,
      min: 50,
      max: 300,
    },
    weightKg: {
      type: Number,
      required: true,
      min: 20,
      max: 300,
    },
    activityLevel: {
      type: String,
      required: true,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
    },
    fitnessGoal: {
      type: String,
      required: true,
      enum: ['loss', 'maintenance', 'gain'],
    },
    dietaryPreferences: {
      type: [String],
      default: [],
    },
    dailyTargets: {
      calories: { type: Number, required: true },
      proteinGrams: { type: Number, required: true },
      carbGrams: { type: Number, required: true },
      fatGrams: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
