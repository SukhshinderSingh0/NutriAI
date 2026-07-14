import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { Loader2, Calendar, ChevronRight } from 'lucide-react';
import { useDiet } from '../context/DietContext';

export default function History() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setMealPlan } = useDiet();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/mealplans');
        setPlans(response.data.plans);
      } catch (err) {
        setError('Failed to load meal plan history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const loadPlan = (plan) => {
    // Normalize: backend stores days under "meals", frontend expects "days"
    const normalized = {
      ...plan,
      days: plan.days || plan.meals || [],
    };
    setMealPlan(normalized);
    navigate('/meal-plans');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
        <p className="text-gray-500 max-w-lg mx-auto">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-12 animate-fade-in max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Saved Meal Plans</h2>
      
      {plans.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No plans yet</h3>
          <p className="text-gray-500 mt-2 mb-6">You haven't generated any meal plans.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Create Your First Plan
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan) => (
            <div 
              key={plan._id} 
              className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => loadPlan(plan)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {plan.durationDays}-Day Meal Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Generated on {new Date(plan.generatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                View Plan <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
