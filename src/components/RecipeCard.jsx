import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const mealTypeColors = {
  Breakfast: 'bg-amber-500',
  Lunch: 'bg-emerald-500',
  Dinner: 'bg-indigo-500',
  Snack: 'bg-rose-400',
};

export default function RecipeCard({ meal, onClick, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 animate-slide-up"
      style={{ animationDelay: index * 0.05 + 's' }}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative">
        {imgError ? (
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-emerald-400 to-teal-600" />
        ) : (
          <img
            src={meal.image}
            alt={meal.name}
            className="aspect-[16/9] object-cover w-full"
            onError={() => setImgError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Meal type badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${mealTypeColors[meal.type] || 'bg-gray-500'}`}
        >
          {meal.type}
        </span>

        {/* Prep time badge */}
        <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Clock size={12} />
          {meal.prepTime} min
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{meal.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{meal.description}</p>

        {/* Macro pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
            🔥 {meal.calories} kcal
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            P: {meal.protein}g
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">
            C: {meal.carbs}g
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-rose-100 text-rose-700">
            F: {meal.fat}g
          </span>
        </div>
      </div>
    </div>
  );
}
