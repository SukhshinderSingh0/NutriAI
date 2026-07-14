/**
 * TDEE (Total Daily Energy Expenditure) Calculator
 * Uses the Mifflin-St Jeor equation — the most accurate BMR formula
 * recommended by the Academy of Nutrition and Dietetics.
 */

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

const GOAL_OFFSETS = {
  weightLoss: -500,
  maintenance: 0,
  muscleGain: 300,
};

const MACRO_SPLITS = {
  weightLoss: { protein: 0.4, carbs: 0.3, fat: 0.3 },
  maintenance: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  muscleGain: { protein: 0.35, carbs: 0.45, fat: 0.2 },
};

function calculateBMR(weightKg, heightCm, age, gender) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
}

function calculateTDEE(bmr, activityLevel) {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
}

function calculateTargetCalories(tdee, goal) {
  const offset = GOAL_OFFSETS[goal] || 0;
  return Math.max(1200, Math.round(tdee + offset));
}

function calculateMacros(targetCalories, goal) {
  const split = MACRO_SPLITS[goal] || MACRO_SPLITS.maintenance;
  return {
    protein: Math.round((targetCalories * split.protein) / 4), // 4 cal/g
    carbs: Math.round((targetCalories * split.carbs) / 4),     // 4 cal/g
    fat: Math.round((targetCalories * split.fat) / 9),         // 9 cal/g
  };
}

function calculateAll(profile) {
  const { weight, height, age, gender, activityLevel, goal, weightUnit, heightUnit } = profile;

  // Convert units if needed
  const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
  const heightCm = heightUnit === 'in' ? height * 2.54 : height;

  const bmr = Math.round(calculateBMR(weightKg, heightCm, age, gender));
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const macros = calculateMacros(targetCalories, goal);

  return { bmr, tdee, targetCalories, macros };
}

module.exports = {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
  calculateMacros,
  calculateAll
};
