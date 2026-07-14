const mongoose = require('mongoose');

const mealSubSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  prepTime: { type: Number },
  image: { type: String },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
  spoonacularId: { type: Number },
});

const daySubSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  meals: [mealSubSchema],
});

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // 1:M relationship
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    durationDays: {
      type: Number,
      required: true,
      enum: [3, 7],
    },
    meals: [daySubSchema], // Array of day subdocuments
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
