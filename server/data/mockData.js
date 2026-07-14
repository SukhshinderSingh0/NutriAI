/**
 * Mock Data for Demo Mode
 * Used when API keys are not configured.
 * Provides realistic meal plans with Spoonacular-style data.
 */

// Spoonacular CDN image base
const IMG = 'https://img.spoonacular.com/recipes';

const MOCK_MEAL_PLAN = {
  days: [
    {
      day: 1,
      meals: [
        {
          type: 'Breakfast',
          name: 'Greek Yogurt Parfait with Berries & Granola',
          description: 'Creamy Greek yogurt layered with fresh mixed berries, honey, and crunchy granola.',
          calories: 380,
          protein: 24,
          carbs: 48,
          fat: 10,
          prepTime: 5,
          image: `${IMG}/782585-312x231.jpg`,
          ingredients: [
            '1 cup Greek yogurt (plain, non-fat)',
            '1/2 cup mixed berries (strawberries, blueberries, raspberries)',
            '1/4 cup granola',
            '1 tbsp honey',
            '1 tbsp chia seeds',
          ],
          instructions: [
            'Add half the Greek yogurt to a glass or bowl.',
            'Layer half the berries and a sprinkle of granola on top.',
            'Add the remaining yogurt, berries, and granola.',
            'Drizzle with honey and top with chia seeds.',
            'Serve immediately for maximum crunch.',
          ],
        },
        {
          type: 'Lunch',
          name: 'Grilled Chicken Caesar Salad',
          description: 'Tender grilled chicken breast over crisp romaine with parmesan and a light Caesar dressing.',
          calories: 520,
          protein: 42,
          carbs: 18,
          fat: 32,
          prepTime: 20,
          image: `${IMG}/715415-312x231.jpg`,
          ingredients: [
            '6 oz grilled chicken breast',
            '3 cups romaine lettuce, chopped',
            '2 tbsp parmesan cheese, shaved',
            '1/2 cup cherry tomatoes, halved',
            '1/4 cup croutons',
            '2 tbsp light Caesar dressing',
          ],
          instructions: [
            'Season chicken breast with salt, pepper, and garlic powder. Grill for 6-7 minutes per side until internal temp reaches 165°F.',
            'Let chicken rest for 5 minutes, then slice thinly.',
            'Toss romaine lettuce with Caesar dressing in a large bowl.',
            'Top with sliced chicken, cherry tomatoes, croutons, and parmesan shavings.',
            'Serve immediately.',
          ],
        },
        {
          type: 'Dinner',
          name: 'Herb-Crusted Salmon with Roasted Vegetables',
          description: 'Oven-baked salmon fillet with a herb crust, served with colorful roasted seasonal vegetables.',
          calories: 580,
          protein: 38,
          carbs: 28,
          fat: 34,
          prepTime: 35,
          image: `${IMG}/659109-312x231.jpg`,
          ingredients: [
            '6 oz salmon fillet',
            '1 tbsp olive oil',
            '1 tbsp Dijon mustard',
            '2 tbsp fresh herbs (dill, parsley), chopped',
            '1/4 cup breadcrumbs',
            '1 cup broccoli florets',
            '1 medium sweet potato, cubed',
            '1/2 red bell pepper, sliced',
          ],
          instructions: [
            'Preheat oven to 400°F (200°C). Line two baking sheets with parchment paper.',
            'Toss vegetables with olive oil, salt, and pepper. Spread on one baking sheet and roast for 20 minutes.',
            'Pat salmon dry, brush with Dijon mustard.',
            'Mix breadcrumbs with chopped herbs. Press onto the mustard-coated salmon.',
            'Place salmon on the second baking sheet. Bake for 12-15 minutes until salmon flakes easily.',
            'Serve salmon alongside the roasted vegetables.',
          ],
        },
        {
          type: 'Snack',
          name: 'Apple Slices with Almond Butter',
          description: 'Crisp apple slices paired with creamy almond butter for a satisfying afternoon snack.',
          calories: 220,
          protein: 6,
          carbs: 28,
          fat: 12,
          prepTime: 3,
          image: `${IMG}/640941-312x231.jpg`,
          ingredients: [
            '1 medium apple, sliced',
            '2 tbsp almond butter',
            'Pinch of cinnamon (optional)',
          ],
          instructions: [
            'Wash and slice the apple into thin wedges.',
            'Arrange on a plate with almond butter for dipping.',
            'Sprinkle with cinnamon if desired.',
          ],
        },
      ],
    },
    {
      day: 2,
      meals: [
        {
          type: 'Breakfast',
          name: 'Spinach & Mushroom Egg White Omelette',
          description: 'Fluffy egg white omelette packed with fresh spinach, mushrooms, and a touch of feta cheese.',
          calories: 290,
          protein: 32,
          carbs: 8,
          fat: 14,
          prepTime: 12,
          image: `${IMG}/665769-312x231.jpg`,
          ingredients: [
            '5 egg whites',
            '1 cup fresh spinach',
            '1/2 cup mushrooms, sliced',
            '2 tbsp feta cheese, crumbled',
            '1 tsp olive oil',
            'Salt and pepper to taste',
          ],
          instructions: [
            'Heat olive oil in a non-stick skillet over medium heat.',
            'Sauté mushrooms for 3-4 minutes until golden.',
            'Add spinach and cook until wilted, about 1 minute. Set vegetables aside.',
            'Pour egg whites into the skillet. Cook without stirring until edges set.',
            'Add sautéed vegetables and feta to one half. Fold the omelette.',
            'Cook for another minute, then slide onto a plate.',
          ],
        },
        {
          type: 'Lunch',
          name: 'Quinoa Buddha Bowl with Tahini Dressing',
          description: 'A colorful bowl of quinoa with roasted chickpeas, avocado, veggies, and creamy tahini.',
          calories: 560,
          protein: 22,
          carbs: 62,
          fat: 26,
          prepTime: 25,
          image: `${IMG}/716426-312x231.jpg`,
          ingredients: [
            '1 cup cooked quinoa',
            '1/2 can chickpeas, drained and rinsed',
            '1/2 avocado, sliced',
            '1/2 cup cucumber, diced',
            '1/4 cup shredded carrots',
            '1/4 cup red cabbage, shredded',
            '2 tbsp tahini',
            '1 tbsp lemon juice',
            '1 tsp olive oil',
          ],
          instructions: [
            'Toss chickpeas with olive oil, cumin, and paprika. Roast at 400°F for 20 minutes.',
            'Arrange cooked quinoa as the base of your bowl.',
            'Top with roasted chickpeas, avocado slices, cucumber, carrots, and red cabbage.',
            'Whisk tahini with lemon juice and 2 tbsp water to make the dressing.',
            'Drizzle tahini dressing over the bowl and serve.',
          ],
        },
        {
          type: 'Dinner',
          name: 'Turkey Meatballs with Zucchini Noodles',
          description: 'Lean turkey meatballs in marinara sauce served over spiralized zucchini noodles.',
          calories: 480,
          protein: 40,
          carbs: 22,
          fat: 26,
          prepTime: 30,
          image: `${IMG}/632269-312x231.jpg`,
          ingredients: [
            '1 lb ground turkey',
            '1/4 cup breadcrumbs',
            '1 egg',
            '2 cloves garlic, minced',
            '1 cup marinara sauce',
            '3 medium zucchini, spiralized',
            '2 tbsp parmesan cheese',
            'Fresh basil for garnish',
          ],
          instructions: [
            'Mix ground turkey with breadcrumbs, egg, garlic, salt, and pepper.',
            'Form into 1.5-inch meatballs. Place on a lined baking sheet.',
            'Bake at 400°F for 18-20 minutes until cooked through.',
            'Warm marinara sauce in a large skillet. Add baked meatballs.',
            'In a separate pan, sauté spiralized zucchini for 2-3 minutes.',
            'Serve meatballs and sauce over zucchini noodles. Top with parmesan and basil.',
          ],
        },
        {
          type: 'Snack',
          name: 'Mixed Nuts & Dark Chocolate Trail Mix',
          description: 'A perfectly portioned mix of almonds, walnuts, cashews, and dark chocolate chips.',
          calories: 260,
          protein: 8,
          carbs: 18,
          fat: 20,
          prepTime: 2,
          image: `${IMG}/649056-312x231.jpg`,
          ingredients: [
            '10 almonds',
            '5 walnut halves',
            '8 cashews',
            '1 tbsp dark chocolate chips (70%+)',
            '1 tbsp dried cranberries',
          ],
          instructions: [
            'Combine all ingredients in a small bowl or bag.',
            'Portion to about 1/4 cup total.',
            'Enjoy as an afternoon energy boost.',
          ],
        },
      ],
    },
    {
      day: 3,
      meals: [
        {
          type: 'Breakfast',
          name: 'Overnight Oats with Banana & Peanut Butter',
          description: 'Creamy overnight oats topped with sliced banana, peanut butter, and a drizzle of honey.',
          calories: 420,
          protein: 18,
          carbs: 56,
          fat: 16,
          prepTime: 5,
          image: `${IMG}/715497-312x231.jpg`,
          ingredients: [
            '1/2 cup rolled oats',
            '1/2 cup almond milk',
            '1/4 cup Greek yogurt',
            '1 tbsp peanut butter',
            '1 small banana, sliced',
            '1 tsp honey',
            '1 tsp chia seeds',
          ],
          instructions: [
            'Combine oats, almond milk, Greek yogurt, and chia seeds in a jar.',
            'Stir well, cover, and refrigerate overnight (or at least 4 hours).',
            'In the morning, top with sliced banana and a dollop of peanut butter.',
            'Drizzle with honey and enjoy cold or warmed up.',
          ],
        },
        {
          type: 'Lunch',
          name: 'Mediterranean Grilled Chicken Wrap',
          description: 'Whole wheat wrap filled with grilled chicken, hummus, cucumber, tomatoes, and fresh herbs.',
          calories: 490,
          protein: 36,
          carbs: 42,
          fat: 20,
          prepTime: 15,
          image: `${IMG}/716432-312x231.jpg`,
          ingredients: [
            '1 large whole wheat tortilla',
            '5 oz grilled chicken, sliced',
            '2 tbsp hummus',
            '1/4 cup cucumber, diced',
            '1/4 cup tomatoes, diced',
            '2 tbsp red onion, thinly sliced',
            'Handful of mixed greens',
            '1 tbsp feta cheese, crumbled',
          ],
          instructions: [
            'Warm the tortilla in a dry skillet for 30 seconds per side.',
            'Spread hummus evenly across the center of the wrap.',
            'Layer grilled chicken, cucumber, tomatoes, onion, greens, and feta.',
            'Fold in the sides and roll tightly.',
            'Slice in half diagonally and serve.',
          ],
        },
        {
          type: 'Dinner',
          name: 'Lean Beef Stir-Fry with Brown Rice',
          description: 'Tender beef strips stir-fried with colorful bell peppers, snap peas, and a savory ginger-soy glaze.',
          calories: 550,
          protein: 38,
          carbs: 52,
          fat: 20,
          prepTime: 25,
          image: `${IMG}/664547-312x231.jpg`,
          ingredients: [
            '6 oz lean beef sirloin, thinly sliced',
            '1 cup cooked brown rice',
            '1/2 red bell pepper, sliced',
            '1/2 green bell pepper, sliced',
            '1 cup snap peas',
            '2 tbsp soy sauce (low-sodium)',
            '1 tbsp sesame oil',
            '1 tsp fresh ginger, grated',
            '2 cloves garlic, minced',
            '1 tsp cornstarch',
          ],
          instructions: [
            'Mix soy sauce, sesame oil, ginger, garlic, and cornstarch for the sauce.',
            'Heat a wok or large skillet over high heat with 1 tsp oil.',
            'Stir-fry beef strips for 2-3 minutes until browned. Remove and set aside.',
            'Stir-fry bell peppers and snap peas for 3-4 minutes until crisp-tender.',
            'Return beef to the wok. Pour sauce over and toss to coat.',
            'Serve immediately over brown rice.',
          ],
        },
        {
          type: 'Snack',
          name: 'Cottage Cheese with Pineapple',
          description: 'Low-fat cottage cheese topped with fresh pineapple chunks and a sprinkle of flaxseed.',
          calories: 180,
          protein: 20,
          carbs: 16,
          fat: 4,
          prepTime: 3,
          image: `${IMG}/658509-312x231.jpg`,
          ingredients: [
            '3/4 cup low-fat cottage cheese',
            '1/2 cup fresh pineapple chunks',
            '1 tsp ground flaxseed',
          ],
          instructions: [
            'Scoop cottage cheese into a bowl.',
            'Top with fresh pineapple chunks.',
            'Sprinkle with ground flaxseed and serve.',
          ],
        },
      ],
    },
  ],
};

/**
 * Generate extended 7-day plan by cycling and varying the 3-day base
 */
function generateSevenDayMock() {
  const baseDays = MOCK_MEAL_PLAN.days;
  const extendedDays = [];

  for (let i = 0; i < 7; i++) {
    const sourceDay = baseDays[i % baseDays.length];
    extendedDays.push({
      ...sourceDay,
      day: i + 1,
      meals: sourceDay.meals.map((meal) => ({ ...meal })),
    });
  }

  return { days: extendedDays };
}

/**
 * Get a mock recipe detail (for RecipeModal demo)
 */
function getMockRecipeDetail(meal) {
  return {
    id: Math.floor(Math.random() * 100000),
    title: meal.name,
    image: meal.image,
    readyInMinutes: meal.prepTime,
    servings: 1,
    summary: meal.description,
    extendedIngredients: (meal.ingredients || []).map((ing, i) => ({
      id: i,
      original: ing,
    })),
    analyzedInstructions: [
      {
        steps: (meal.instructions || []).map((inst, i) => ({
          number: i + 1,
          step: inst,
        })),
      },
    ],
    nutrition: {
      nutrients: [
        { name: 'Calories', amount: meal.calories, unit: 'kcal' },
        { name: 'Protein', amount: meal.protein, unit: 'g' },
        { name: 'Carbohydrates', amount: meal.carbs, unit: 'g' },
        { name: 'Fat', amount: meal.fat, unit: 'g' },
      ],
    },
  };
}

module.exports = {
  MOCK_MEAL_PLAN,
  generateSevenDayMock,
  getMockRecipeDetail
};
