const Profile = require('../models/Profile');
const { calculateAll } = require('../utils/tdee');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error fetching profile.' });
  }
};

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { age, gender, weight, height, weightUnit, heightUnit, activityLevel, goal, dietPreference } = req.body;

    // Run TDEE Calculations on the backend
    const metrics = calculateAll(req.body);

    const profileData = {
      user: req.user.id,
      age: Number(age),
      gender,
      weightKg: weightUnit === 'lbs' ? weight * 0.453592 : weight,
      heightCm: heightUnit === 'in' ? height * 2.54 : height,
      activityLevel,
      fitnessGoal: goal,
      dietaryPreferences: dietPreference && dietPreference !== 'none' ? [dietPreference] : [],
      dailyTargets: {
        calories: metrics.targetCalories,
        proteinGrams: metrics.macros.protein,
        carbGrams: metrics.macros.carbs,
        fatGrams: metrics.macros.fat,
      }
    };

    // Upsert Profile
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileData },
      { new: true, upsert: true }
    );

    res.status(200).json({ profile, metrics });
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({ message: 'Server error saving profile.' });
  }
};
