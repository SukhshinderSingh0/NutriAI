import { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';

const defaultMessages = [
  'Analyzing your nutritional profile...',
  'Crafting your personalized meal plan...',
  'Balancing macronutrients for optimal health...',
  'Selecting the best recipes for you...',
  'Almost ready! Fine-tuning portions...',
];

const LoadingSpinner = ({ message }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (message) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % defaultMessages.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [message]);

  const displayMessage = message || defaultMessages[currentIndex];

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-20 gap-8">
      {/* Spinner with Icon */}
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="w-10 h-10 text-emerald-400" />
        </div>
      </div>

      {/* Cycling Message */}
      <p
        className={`text-lg text-slate-300 font-medium text-center max-w-sm transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {displayMessage}
      </p>

      {/* Pulsing Dots */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '200ms' }} />
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '400ms' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
