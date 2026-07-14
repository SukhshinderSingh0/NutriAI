import React, { useEffect, useRef, useState } from 'react';
import { Beef, Wheat, Droplets } from 'lucide-react';

const GOAL_LABELS = {
  loss: 'Weight Loss',
  maintenance: 'Maintenance',
  gain: 'Muscle Gain',
};

function useAnimatedCounter(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!target || target <= 0) {
      setValue(0);
      return;
    }

    let start = null;
    const from = 0;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setValue(Math.round(from + (target - from) * easedProgress));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export default function CalorieDisplay({ bmr, tdee, targetCalories, macros, goal }) {
  const animatedCalories = useAnimatedCounter(targetCalories, 1500);

  const proteinCal = (macros?.protein || 0) * 4;
  const carbsCal = (macros?.carbs || 0) * 4;
  const fatCal = (macros?.fat || 0) * 9;
  const totalCal = proteinCal + carbsCal + fatCal;

  const proteinPct = totalCal > 0 ? ((proteinCal / totalCal) * 100).toFixed(0) : 0;
  const carbsPct = totalCal > 0 ? ((carbsCal / totalCal) * 100).toFixed(0) : 0;
  const fatPct = totalCal > 0 ? ((fatCal / totalCal) * 100).toFixed(0) : 0;

  const goalLabel = GOAL_LABELS[goal] || goal;

  const macroCards = [
    {
      name: 'Protein',
      grams: macros?.protein || 0,
      pct: proteinPct,
      Icon: Beef,
      containerClass: 'bg-blue-50 border-blue-100',
      barClass: 'bg-blue-500',
      textClass: 'text-blue-700',
      iconBg: 'bg-blue-100',
    },
    {
      name: 'Carbs',
      grams: macros?.carbs || 0,
      pct: carbsPct,
      Icon: Wheat,
      containerClass: 'bg-amber-50 border-amber-100',
      barClass: 'bg-amber-500',
      textClass: 'text-amber-700',
      iconBg: 'bg-amber-100',
    },
    {
      name: 'Fat',
      grams: macros?.fat || 0,
      pct: fatPct,
      Icon: Droplets,
      containerClass: 'bg-rose-50 border-rose-100',
      barClass: 'bg-rose-500',
      textClass: 'text-rose-700',
      iconBg: 'bg-rose-100',
    },
  ];

  return (
    <div className="animate-slide-up">
      {/* Hero Stat */}
      <div className="text-center mb-2">
        <p className="gradient-text text-5xl sm:text-6xl font-bold tabular-nums">
          {animatedCalories.toLocaleString()}
        </p>
        <p className="text-gray-500 text-base mt-2">Daily Calorie Target</p>
        <p className="text-gray-400 text-sm mt-1">
          BMR: {bmr} kcal &middot; TDEE: {tdee} kcal
        </p>

        <span className="inline-block mt-3 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-sm font-semibold">
          {goalLabel}
        </span>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {macroCards.map(({ name, grams, pct, Icon, containerClass, barClass, textClass, iconBg }) => (
          <div
            key={name}
            className={`glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 border ${containerClass}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`p-1.5 rounded-lg ${iconBg}`}>
                <Icon className={`w-4 h-4 ${textClass}`} />
              </span>
              <span className={`text-sm font-semibold ${textClass}`}>{name}</span>
            </div>

            <p className={`text-2xl font-bold ${textClass}`}>
              {grams}
              <span className="text-sm font-normal ml-1">g</span>
            </p>

            <div className="mt-3">
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${barClass} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className={`text-xs mt-1.5 font-medium ${textClass}`}>{pct}% of calories</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
