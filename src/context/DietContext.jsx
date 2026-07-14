import { createContext, useState, useCallback, useContext } from 'react';
import api from '../utils/axiosConfig';

const DietContext = createContext(null);

export function DietProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [tdeeResults, setTdeeResults] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMockData, setIsMockData] = useState(false);

  // Expose a setter so History can load a past plan
  const setLoadedMealPlan = useCallback((plan) => {
    setMealPlan(plan);
  }, []);

  const generatePlan = useCallback(async (formData, onSuccess) => {
    setError(null);
    setIsLoading(true);
    setIsMockData(false);

    try {
      // Step 1: Save Profile & Get Metrics
      const profileResponse = await api.post('/api/profile', formData);
      setTdeeResults(profileResponse.data.metrics);
      setUserProfile(formData);

      // Step 2: Generate Meal Plan
      const planResponse = await api.post('/api/mealplans/generate', {
        durationDays: formData.planDuration,
        dietPreference: formData.dietPreference
      });

      const rawPlan = planResponse.data.plan;
      // Normalize: backend stores days under "meals" field, frontend expects "days"
      const normalizedPlan = {
        ...rawPlan,
        days: rawPlan.days || rawPlan.meals || [],
      };
      setMealPlan(normalizedPlan);
      setIsMockData(planResponse.data.isMock);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error generating meal plan:', err);
      const message = err.response?.data?.message || 'Something went wrong while generating your meal plan. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectMeal = useCallback((meal) => {
    // If it's a mock meal without full Spoonacular detail, format it so RecipeModal doesn't crash
    const detail = meal.spoonacularId ? meal : {
      ...meal,
      id: Math.floor(Math.random() * 100000),
      title: meal.name,
      readyInMinutes: meal.prepTime,
      summary: meal.description,
      extendedIngredients: (meal.ingredients || []).map((ing, i) => ({ id: i, original: ing })),
      analyzedInstructions: [{ steps: (meal.instructions || []).map((inst, i) => ({ number: i + 1, step: inst })) }],
      nutrition: {
        nutrients: [
          { name: 'Calories', amount: meal.calories, unit: 'kcal' },
          { name: 'Protein', amount: meal.protein, unit: 'g' },
          { name: 'Carbohydrates', amount: meal.carbs, unit: 'g' },
          { name: 'Fat', amount: meal.fat, unit: 'g' },
        ],
      },
    };
    setSelectedMeal(detail);
  }, []);

  const clearSelectedMeal = useCallback(() => {
    setSelectedMeal(null);
  }, []);

  const value = {
    userProfile,
    tdeeResults,
    mealPlan,
    selectedMeal,
    isLoading,
    error,
    isMockData,
    setMealPlan: setLoadedMealPlan,
    generatePlan,
    selectMeal,
    clearSelectedMeal
  };

  return <DietContext.Provider value={value}>{children}</DietContext.Provider>;
}

export function useDiet() {
  const context = useContext(DietContext);
  if (!context) {
    throw new Error('useDiet must be used within a DietProvider');
  }
  return context;
}
