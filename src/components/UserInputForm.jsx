import React, { useState } from 'react';
import {
  User,
  Scale as WeightIcon,
  Ruler,
  Activity,
  Target,
  Utensils,
  Calendar,
  Loader2,
} from 'lucide-react';

const ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Lightly Active' },
  { value: 'moderate', label: 'Moderately Active' },
  { value: 'active', label: 'Very Active' },
  { value: 'veryActive', label: 'Extra Active' },
];

const GOAL_OPTIONS = [
  { value: 'weightLoss', label: 'Weight Loss' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'muscleGain', label: 'Muscle Gain' },
];

const DIET_OPTIONS = [
  { value: 'none', label: 'No Restrictions' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'gluten-free', label: 'Gluten-Free' },
];

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none transition-all duration-200';
const inputErrorClass =
  'w-full rounded-xl border border-red-400 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all duration-200';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function UserInputForm({ onSubmit, isLoading }) {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintenance');
  const [dietPreference, setDietPreference] = useState('none');
  const [planDuration, setPlanDuration] = useState(3);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!age || age < 18 || age > 100) newErrors.age = 'Age must be between 18 and 100.';
    if (!weight || weight <= 0) newErrors.weight = 'Weight must be greater than 0.';
    if (!height || height <= 0) newErrors.height = 'Height must be greater than 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      age,
      gender,
      weight,
      height,
      weightUnit,
      heightUnit,
      activityLevel,
      goal,
      dietPreference,
      planDuration,
    });
  };

  const handleDietSelect = (value) => {
    if (value === 'none') {
      setDietPreference('none');
    } else {
      setDietPreference(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl"
    >
      {/* Section 1 – Personal Info */}
      <fieldset className="mb-8">
        <legend className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <User className="w-5 h-5 text-emerald-500" />
          Personal Info
        </legend>

        <div className="space-y-5">
          {/* Age */}
          <div>
            <label htmlFor="age" className={labelClass}>
              Age
            </label>
            <div className="relative">
              <input
                id="age"
                type="number"
                min={18}
                max={100}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={errors.age ? inputErrorClass : inputClass}
                placeholder="Enter your age"
              />
            </div>
            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <span className={labelClass}>Gender</span>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 w-fit">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  gender === 'male'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                  gender === 'female'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Section 2 – Body Metrics */}
      <fieldset className="mb-8">
        <legend className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <WeightIcon className="w-5 h-5 text-emerald-500" />
          Body Metrics
        </legend>

        <div className="space-y-5">
          {/* Weight */}
          <div>
            <label htmlFor="weight" className={labelClass}>
              Weight
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="weight"
                  type="number"
                  min={0}
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className={errors.weight ? inputErrorClass : inputClass}
                  placeholder="Enter weight"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setWeightUnit((u) => (u === 'kg' ? 'lbs' : 'kg'))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-emerald-300 transition-all duration-200 min-w-[60px]"
              >
                {weightUnit}
              </button>
            </div>
            {errors.weight && (
              <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label htmlFor="height" className={labelClass}>
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-emerald-500" />
                Height
              </span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="height"
                  type="number"
                  min={0}
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className={errors.height ? inputErrorClass : inputClass}
                  placeholder="Enter height"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setHeightUnit((u) => (u === 'cm' ? 'in' : 'cm'))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:border-emerald-300 transition-all duration-200 min-w-[60px]"
              >
                {heightUnit}
              </button>
            </div>
            {errors.height && (
              <p className="mt-1 text-sm text-red-500">{errors.height}</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 3 – Activity & Goals */}
      <fieldset className="mb-8">
        <legend className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Activity className="w-5 h-5 text-emerald-500" />
          Activity &amp; Goals
        </legend>

        <div className="space-y-5">
          {/* Activity Level */}
          <div>
            <label htmlFor="activityLevel" className={labelClass}>
              Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className={inputClass}
            >
              {ACTIVITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Fitness Goal */}
          <div>
            <label htmlFor="goal" className={labelClass}>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-500" />
                Fitness Goal
              </span>
            </label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className={inputClass}
            >
              {GOAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Section 4 – Dietary Preference */}
      <fieldset className="mb-8">
        <legend className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Utensils className="w-5 h-5 text-emerald-500" />
          Dietary Preference
        </legend>

        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleDietSelect(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                dietPreference === opt.value
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-emerald-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Section 5 – Plan Duration */}
      <fieldset className="mb-8">
        <legend className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <Calendar className="w-5 h-5 text-emerald-500" />
          Plan Duration
        </legend>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPlanDuration(3)}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              planDuration === 3
                ? 'bg-emerald-500 text-white shadow-md'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
            }`}
          >
            3-Day Plan
          </button>
          <button
            type="button"
            onClick={() => setPlanDuration(7)}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              planDuration === 7
                ? 'bg-emerald-500 text-white shadow-md'
                : 'border border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
            }`}
          >
            7-Day Plan
          </button>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex justify-center sm:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ${
            isLoading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating…
            </span>
          ) : (
            '✨ Generate My Meal Plan'
          )}
        </button>
      </div>
    </form>
  );
}
