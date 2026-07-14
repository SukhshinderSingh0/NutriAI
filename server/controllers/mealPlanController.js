const MealPlan = require('../models/MealPlan');
const Profile = require('../models/Profile');
const { generateMealPlanWithAI, enrichMealPlan, hasGeminiKey } = require('../utils/api');
const { generateSevenDayMock, MOCK_MEAL_PLAN } = require('../data/mockData');

exports.generatePlan = async (req, res) => {
  try {
    const { durationDays, dietPreference } = req.body;

    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please complete setup first.' });
    }

    let plan = null;
    let isMock = false;

    // Use AI if keys exist
    if (hasGeminiKey()) {
      const promptProfile = {
        targetCalories: profile.dailyTargets.calories,
        macros: {
          protein: profile.dailyTargets.proteinGrams,
          carbs: profile.dailyTargets.carbGrams,
          fat: profile.dailyTargets.fatGrams,
        },
        dietPreference: profile.dietaryPreferences[0] || dietPreference,
        goal: profile.fitnessGoal
      };
      plan = await generateMealPlanWithAI(promptProfile, durationDays);
    }

    if (!plan) {
      isMock = true;
      plan = durationDays === 7 ? generateSevenDayMock() : { ...MOCK_MEAL_PLAN };
    }

    const enrichedPlan = await enrichMealPlan(plan, dietPreference);

    // Save to database
    const mealPlanDoc = await MealPlan.create({
      user: req.user.id,
      durationDays,
      meals: enrichedPlan.days
    });

    res.status(201).json({ plan: mealPlanDoc, isMock });
  } catch (error) {
    console.error('Generate Plan Error:', error);
    res.status(500).json({ message: 'Server error generating meal plan.' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const plans = await MealPlan.find({ user: req.user.id }).sort({ generatedAt: -1 });
    res.status(200).json({ plans });
  } catch (error) {
    console.error('Fetch History Error:', error);
    res.status(500).json({ message: 'Server error fetching meal plans.' });
  }
};
