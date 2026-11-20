import { Link } from 'react-router-dom';
import MealPlanView from '../components/MealPlanView';
import { useDiet } from '../context/DietContext';

export default function MealPlans() {
  const { mealPlan, selectMeal } = useDiet();

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
      <MealPlanView mealPlan={mealPlan} onSelectMeal={selectMeal} />
    </div>
  );
}
