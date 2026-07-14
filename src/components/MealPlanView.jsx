import { useState, useMemo } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import RecipeCard from './RecipeCard';

/**
 * MealPlanView — Tabbed day-by-day meal plan display
 * Shows a tab bar for day selection and a grid of RecipeCards for each day.
 */
export default function MealPlanView({ mealPlan, onSelectMeal }) {
  const [activeDay, setActiveDay] = useState(0);

  const days = mealPlan?.days || [];
  const currentDay = days[activeDay];

  // Calculate daily totals for the active day
  const dailyTotals = useMemo(() => {
    if (!currentDay) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    return currentDay.meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + (meal.calories || 0),
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [currentDay]);

  if (!days.length) return null;

  return (
    <section className="animate-slide-up">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
          <CalendarDays className="w-4 h-4" />
          {days.length}-Day Meal Plan
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Personalized Meal Plan
        </h2>
        <p className="text-gray-500 mt-2">
          Click any meal to view the full recipe and nutrition details
        </p>
      </div>

      {/* Day Tabs */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2">
          {/* Scroll left button - shown on mobile when tabs overflow */}
          <button
            onClick={() => setActiveDay((d) => Math.max(0, d - 1))}
            disabled={activeDay === 0}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 sm:hidden"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Tab bar */}
          <div className="flex-1 flex gap-1.5 overflow-x-auto scrollbar-hide p-1 bg-gray-100/80 rounded-xl">
            {days.map((day, index) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(index)}
                className={`flex-1 min-w-[4rem] py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeDay === index
                    ? 'bg-white text-emerald-700 shadow-md shadow-emerald-100/50 scale-[1.02]'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
              >
                <span className="block text-xs text-gray-400 font-normal">
                  Day
                </span>
                {day.day}
              </button>
            ))}
          </div>

          {/* Scroll right button */}
          <button
            onClick={() => setActiveDay((d) => Math.min(days.length - 1, d + 1))}
            disabled={activeDay === days.length - 1}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 transition-all duration-200 sm:hidden"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Daily Summary Bar */}
      <div className="glass-card rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Flame className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Day {currentDay.day} Total
            </p>
            <p className="text-xs text-gray-500">
              {currentDay.meals.length} meals planned
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
            🔥 {dailyTotals.calories} kcal
          </span>
          <span className="hidden sm:flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-full font-medium">
            P: {dailyTotals.protein}g
          </span>
          <span className="hidden sm:flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-full font-medium">
            C: {dailyTotals.carbs}g
          </span>
          <span className="hidden sm:flex items-center gap-1 bg-rose-50 text-rose-700 px-2.5 py-1.5 rounded-full font-medium">
            F: {dailyTotals.fat}g
          </span>
        </div>
      </div>

      {/* Meals Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        key={activeDay} // Re-mount for stagger animation on day change
      >
        {currentDay.meals.map((meal, index) => (
          <RecipeCard
            key={`${activeDay}-${meal.type}-${index}`}
            meal={meal}
            index={index}
            onClick={() => onSelectMeal(meal)}
          />
        ))}
      </div>

      {/* Day Navigation (Desktop) */}
      <div className="hidden sm:flex justify-between items-center mt-8">
        <button
          onClick={() => setActiveDay((d) => Math.max(0, d - 1))}
          disabled={activeDay === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 transition-all duration-200 font-medium text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Day
        </button>
        <span className="text-sm text-gray-400">
          Day {activeDay + 1} of {days.length}
        </span>
        <button
          onClick={() => setActiveDay((d) => Math.min(days.length - 1, d + 1))}
          disabled={activeDay === days.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 transition-all duration-200 font-medium text-sm"
        >
          Next Day
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
