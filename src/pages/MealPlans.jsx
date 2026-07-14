import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import MealPlanView from '../components/MealPlanView';
import { useDiet } from '../context/DietContext';

export default function MealPlans() {
  const { mealPlan, selectMeal, isMockData } = useDiet();

  if (!mealPlan) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">No Meal Plan Found</h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          You haven't generated a meal plan yet. Head over to the Dashboard to enter your details and let our AI craft the perfect nutrition plan for you.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      {isMockData && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start animate-fade-in">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Using sample meal plan.</strong> The Gemini AI is temporarily rate-limited (free tier). The plan below is a curated sample — still nutritionally balanced and fully usable! Wait a minute and try again for a personalized AI-generated plan.
          </p>
        </div>
      )}
      <MealPlanView mealPlan={mealPlan} onSelectMeal={selectMeal} />
    </div>
  );
}
