/**
 * API Service Layer (Backend)
 * Handles communication with Gemini and Spoonacular APIs.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || '';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';
const SPOONACULAR_BASE = 'https://api.spoonacular.com';

async function generateMealPlanWithAI(profile, days = 3) {
  if (!GEMINI_API_KEY) {
    console.log('Gemini API key not found in env.');
    return null;
  }

  const prompt = `You are a professional nutritionist and meal planner. Create a detailed ${days}-day meal plan for a person with the following profile:

- Daily Calorie Target: ${profile.targetCalories} kcal
- Protein Target: ${profile.macros.protein}g
- Carbs Target: ${profile.macros.carbs}g  
- Fat Target: ${profile.macros.fat}g
- Dietary Preference: ${profile.dietPreference || 'No restrictions'}
- Fitness Goal: ${profile.goal}

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "days": [
    {
      "day": 1,
      "meals": [
        {
          "type": "Breakfast",
          "name": "Meal Name",
          "description": "Brief description",
          "calories": 400,
          "protein": 30,
          "carbs": 40,
          "fat": 15,
          "prepTime": 15,
          "ingredients": ["ingredient 1", "ingredient 2"],
          "instructions": ["Step 1", "Step 2"],
          "searchQuery": "specific recipe search term for Spoonacular"
        }
      ]
    }
  ]
}

Each day must have exactly 4 meals: Breakfast, Lunch, Dinner, and Snack.
The total daily macros should approximately match the targets.
Make meals practical, delicious, and diverse across days.
Include 4-8 ingredients and 3-6 step instructions for each meal.
The "searchQuery" should be a specific, searchable recipe name.`;

  const MAX_RETRIES = 3;
  const RETRY_DELAYS = [2000, 5000, 10000]; // 2s, 5s, 10s

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          if (attempt < MAX_RETRIES) {
            const delay = RETRY_DELAYS[attempt];
            console.warn(`Gemini 429 rate limit – retrying in ${delay / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})…`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue; // retry
          }
          console.warn('Gemini API rate limit reached after all retries.');
          return null;
        }
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Could not parse meal plan from Gemini response');
    } catch (error) {
      if (attempt < MAX_RETRIES && error.message?.includes('fetch')) {
        const delay = RETRY_DELAYS[attempt];
        console.warn(`Gemini network error – retrying in ${delay / 1000}s: ${error.message}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      console.warn('Gemini API request failed:', error.message);
      return null;
    }
  }
  return null;
}

// Circuit breaker: once Spoonacular returns 402, skip all further calls this session
let spoonacularDisabled = false;

async function searchRecipe(query, diet = '', targetCalories = 500) {
  if (!SPOONACULAR_API_KEY || spoonacularDisabled) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      query,
      number: '1',
      addRecipeNutrition: 'true',
      ...(diet && diet !== 'none' ? { diet } : {}),
      minCalories: Math.max(50, targetCalories - 150),
      maxCalories: targetCalories + 150,
    });

    const response = await fetch(`${SPOONACULAR_BASE}/recipes/complexSearch?${params}`);
    if (!response.ok) {
      if (response.status === 402) {
        console.warn('Spoonacular daily quota exceeded (402). Disabling for this session.');
        spoonacularDisabled = true;
        return null;
      }
      throw new Error(`Spoonacular error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Spoonacular search error:', error.message);
    return null;
  }
}

async function getRecipeDetails(id) {
  if (!SPOONACULAR_API_KEY) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      includeNutrition: 'true',
    });

    const response = await fetch(`${SPOONACULAR_BASE}/recipes/${id}/information?${params}`);
    if (!response.ok) throw new Error(`Spoonacular error: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Spoonacular detail error:', error);
    return null;
  }
}
/**
 * Curated fallback food images by meal type.
 * Each array has several options to avoid repetition.
 */
const FALLBACK_IMAGES = {
  Breakfast: [
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=480&h=320&fit=crop',
  ],
  Lunch: [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=480&h=320&fit=crop',
  ],
  Dinner: [
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=480&h=320&fit=crop',
  ],
  Snack: [
    'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=480&h=320&fit=crop',
    'https://images.unsplash.com/photo-1604908177522-51d28fd26417?w=480&h=320&fit=crop',
  ],
};

function getFallbackImage(mealName, mealType) {
  const images = FALLBACK_IMAGES[mealType] || FALLBACK_IMAGES.Lunch;
  // Use a simple hash of the meal name to pick a consistent image
  let hash = 0;
  for (let i = 0; i < mealName.length; i++) {
    hash = ((hash << 5) - hash + mealName.charCodeAt(i)) | 0;
  }
  return images[Math.abs(hash) % images.length];
}

async function enrichMealPlan(mealPlan, diet = '') {
  const enrichedDays = await Promise.all(
    mealPlan.days.map(async (day) => {
      const enrichedMeals = await Promise.all(
        day.meals.map(async (meal) => {
          // Try Spoonacular first if key exists
          if (SPOONACULAR_API_KEY) {
            const recipe = await searchRecipe(meal.searchQuery || meal.name, diet, meal.calories);
            if (recipe) {
              return {
                ...meal,
                spoonacularId: recipe.id,
                image: recipe.image,
                sourceUrl: recipe.sourceUrl,
              };
            }
          }
          // Fallback: use Unsplash image if no image exists
          if (!meal.image) {
            return { ...meal, image: getFallbackImage(meal.name || meal.type, meal.type) };
          }
          return meal;
        })
      );
      return { ...day, meals: enrichedMeals };
    })
  );

  return { ...mealPlan, days: enrichedDays };
}

function hasGeminiKey() {
  return !!GEMINI_API_KEY;
}

function hasSpoonacularKey() {
  return !!SPOONACULAR_API_KEY;
}

module.exports = {
  generateMealPlanWithAI,
  searchRecipe,
  getRecipeDetails,
  enrichMealPlan,
  hasGeminiKey,
  hasSpoonacularKey
};
