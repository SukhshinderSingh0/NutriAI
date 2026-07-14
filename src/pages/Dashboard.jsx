import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInputForm from '../components/UserInputForm';
import CalorieDisplay from '../components/CalorieDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDiet } from '../context/DietContext';

export default function Dashboard() {
  const { userProfile, tdeeResults, isLoading, error, generatePlan } = useDiet();
  const navigate = useNavigate();

  const handleFormSubmit = (formData) => {
    generatePlan(formData, () => {
      // On success, redirect to meal plans page to see the generated plan
      navigate('/meal-plans');
    });
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
        <p className="text-gray-500">
          Enter your details below to calculate your metrics and generate a personalized meal plan.
        </p>
      </div>

      <section className="mb-12">
        <UserInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </section>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center animate-slide-down">
          {error}
        </div>
      )}

      {isLoading && (
        <section className="py-16">
          <LoadingSpinner />
        </section>
      )}

      {/* If we already have results (e.g., they came back from the meal plan page), show the calorie display here too */}
      {!isLoading && tdeeResults && (
        <section className="mb-16">
          <CalorieDisplay
            bmr={tdeeResults.bmr}
            tdee={tdeeResults.tdee}
            targetCalories={tdeeResults.targetCalories}
            macros={tdeeResults.macros}
            goal={userProfile?.goal}
          />
        </section>
      )}
    </div>
  );
}
