import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { User, Activity, Target, Settings, Scale, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile');
        setProfileData(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Profile not found. You need to complete your setup first.');
        } else {
          setError('Failed to load profile data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500">Manage your personal metrics and nutrition goals</p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50 font-medium py-2 px-4 rounded-xl transition-colors"
        >
          <Settings className="w-4 h-4" />
          Update Metrics
        </Link>
      </div>

      {error ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-6 rounded-2xl flex flex-col items-center text-center">
          <Shield className="w-12 h-12 mb-3 text-amber-500" />
          <h3 className="text-lg font-semibold mb-2">{error}</h3>
          <p className="mb-4 text-amber-600">Head over to the dashboard to set up your profile and generate your first meal plan.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Go to Setup
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Details */}
          <div className="glass-card rounded-2xl p-6 md:col-span-1 border-t-4 border-t-indigo-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Account</h2>
                <p className="text-sm text-gray-500">User details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500 block mb-1">Email</span>
                <span className="font-medium text-gray-800">{user?.email}</span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 block mb-1">Member Since</span>
                <span className="font-medium text-gray-800">
                  {new Date(profileData.updatedAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Physical Metrics */}
          <div className="glass-card rounded-2xl p-6 md:col-span-2 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Biometrics</h2>
                <p className="text-sm text-gray-500">Current physical stats</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Age</span>
                <span className="text-xl font-bold text-gray-800">{profileData.age}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Gender</span>
                <span className="text-xl font-bold text-gray-800 capitalize">{profileData.gender}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Weight</span>
                <span className="text-xl font-bold text-gray-800">{Math.round(profileData.weightKg)} kg</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Height</span>
                <span className="text-xl font-bold text-gray-800">{Math.round(profileData.heightCm)} cm</span>
              </div>
            </div>
          </div>

          {/* Targets & Goals */}
          <div className="glass-card rounded-2xl p-6 md:col-span-3 border-t-4 border-t-amber-500 mt-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Nutrition Targets</h2>
                <p className="text-sm text-gray-500">Calculated based on a <strong className="capitalize">{profileData.activityLevel}</strong> activity level aiming for <strong className="capitalize">{profileData.fitnessGoal?.replace(/([A-Z])/g, ' $1').trim()}</strong></p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3 bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-6 text-white text-center shadow-lg">
                <span className="block text-amber-100 font-medium mb-1">Daily Calories</span>
                <span className="text-5xl font-extrabold tracking-tight block mb-2">{profileData.dailyTargets?.calories || 0}</span>
                <span className="text-sm text-amber-100">kcal / day</span>
              </div>
              
              <div className="w-full md:w-2/3 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <span className="block text-sm text-blue-600 font-medium mb-1">Protein</span>
                  <span className="text-3xl font-bold text-blue-700">{profileData.dailyTargets?.proteinGrams || 0}g</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <span className="block text-sm text-amber-600 font-medium mb-1">Carbs</span>
                  <span className="text-3xl font-bold text-amber-700">{profileData.dailyTargets?.carbGrams || 0}g</span>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                  <span className="block text-sm text-rose-600 font-medium mb-1">Fat</span>
                  <span className="text-3xl font-bold text-rose-700">{profileData.dailyTargets?.fatGrams || 0}g</span>
                </div>
              </div>
            </div>
            
            {profileData.dietaryPreferences?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.dietaryPreferences.map(pref => (
                    <span key={pref} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
