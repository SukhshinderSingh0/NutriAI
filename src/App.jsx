import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MealPlans from './pages/MealPlans';
import Login from './pages/Login';
import Signup from './pages/Signup';
import History from './pages/History';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import RecipeModal from './components/RecipeModal';
import { DietProvider, useDiet } from './context/DietContext';
import { AuthProvider } from './context/AuthContext';

function AppLayout() {
  const { selectedMeal, clearSelectedMeal } = useDiet();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container-app pt-8 pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/meal-plans" 
            element={
              <ProtectedRoute>
                <MealPlans />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto">
        <div className="container-app py-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{' '}
            <span className="gradient-text font-semibold">NutriPlan AI</span>.
            Built with ❤️ for healthier living.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Powered by Gemini AI & Spoonacular • Not a substitute for
            professional medical advice
          </p>
        </div>
      </footer>

      <RecipeModal 
        meal={selectedMeal} 
        isOpen={!!selectedMeal} 
        onClose={clearSelectedMeal} 
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DietProvider>
          <AppLayout />
        </DietProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
