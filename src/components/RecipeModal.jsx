import React, { useRef, useEffect, useState } from 'react';
import { X, Clock, ChefHat, ListChecks } from 'lucide-react';
import NutritionChart from './NutritionChart';

const mealTypeColors = {
  Breakfast: 'bg-amber-500',
  Lunch: 'bg-emerald-500',
  Dinner: 'bg-indigo-500',
  Snack: 'bg-rose-400',
};

export default function RecipeModal({ meal, isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      // Reset checked state when opening with a new meal
      setCheckedIngredients(
        meal?.ingredients ? new Array(meal.ingredients.length).fill(false) : []
      );
    } else {
      dialog.close();
    }
  }, [isOpen, meal]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  if (!meal) return null;

  return (
    <dialog
      ref={dialogRef}
      className="max-w-2xl w-full mx-auto rounded-2xl border-none p-0 bg-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Hero image */}
        {meal.image && (
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full max-h-64 object-cover rounded-t-2xl"
          />
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{meal.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full text-white ${mealTypeColors[meal.type] || 'bg-gray-500'}`}
              >
                {meal.type}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                {meal.prepTime} min
              </span>
            </div>
            {meal.description && (
              <p className="text-sm text-gray-500 mt-3">{meal.description}</p>
            )}
          </div>

          {/* Nutrition Chart */}
          <div>
            <NutritionChart
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              size="sm"
            />
          </div>

          {/* Ingredients */}
          {meal.ingredients && meal.ingredients.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <ListChecks size={20} className="text-emerald-600" />
                Ingredients
              </h3>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkedIngredients[idx] || false}
                      onChange={() => toggleIngredient(idx)}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                    />
                    <span
                      className={`text-sm transition-colors ${
                        checkedIngredients[idx]
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {meal.instructions && meal.instructions.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <ChefHat size={20} className="text-emerald-600" />
                Instructions
              </h3>
              <ol className="space-y-4">
                {meal.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-gray-700 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
