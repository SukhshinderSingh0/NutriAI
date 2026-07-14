# NutriPlan AI - Full Project Context

This document explains exactly how the AI Diet Planner is built, how the different pieces connect, and where to find things so you can easily edit the code yourself.

## 🏗️ 1. Architecture Overview
The project is built on the **MERN Stack** (MongoDB, Express, React, Node.js) and integrates with **Google Gemini AI** for intelligence.

- **Frontend (Client):** Built with React and Vite. It handles the user interface, styling (Tailwind CSS), and global state (React Context). It runs on port `5173`.
- **Backend (Server):** Built with Node.js and Express. It provides a RESTful API for the frontend to consume. It connects to the database and external APIs. It runs on port `5001`.
- **Database:** MongoDB (using Mongoose). It stores users, their physical profiles, and their generated meal plans.

---

## 📁 2. Where Everything Lives (File Structure)

### 🖥️ Frontend (`/src/` folder)
The frontend code is located in `src/`.

* **`App.jsx`**: The main entry point. It sets up the Router (navigation) and wraps the app in the global Context providers.
* **`/pages/`**: The main screens of the app.
  * `Home.jsx`: The landing page.
  * `Dashboard.jsx`: Where the user inputs their age/weight/height.
  * `MealPlans.jsx`: Where the generated meal plan is displayed.
  * `History.jsx`: Shows previously saved plans.
  * `Login.jsx` & `Signup.jsx`: Authentication pages.
* **`/components/`**: Reusable UI blocks.
  * `Header.jsx`: The top navigation bar.
  * `UserInputForm.jsx`: The form for inputting physical metrics.
  * `CalorieDisplay.jsx`: The UI that shows TDEE and Macros (Protein/Carb/Fat bars).
  * `RecipeCard.jsx`: The small card for a single meal.
  * `RecipeModal.jsx`: The popup that shows the full recipe details (ingredients & instructions).
* **`/context/`**: Global state management.
  * `AuthContext.jsx`: Manages login state (is the user logged in?) and the JWT token.
  * `DietContext.jsx`: Manages the currently generated meal plan and user metrics so they can be accessed across different pages.
* **`index.css`**: Global CSS, including custom classes like `.glass-card`.

### ⚙️ Backend (`/server/` folder)
The backend code is located in `server/`.

* **`server.js`**: The main server file. Connects to MongoDB and sets up the API routes.
* **`/models/`**: Mongoose database schemas.
  * `User.js`: Stores email and hashed password.
  * `Profile.js`: Stores the user's age, weight, height, BMR, TDEE, etc.
  * `MealPlan.js`: Stores the massive JSON object of the AI-generated meal plan.
* **`/controllers/`**: The actual logic for the API routes.
  * `authController.js`: Handles login/signup and issues JWT tokens.
  * `profileController.js`: Calculates BMR/TDEE math when the user saves their profile.
  * `mealPlanController.js`: Handles requests to generate new plans or fetch history.
* **`/utils/api.js`**: The most complex part of the backend.
  * Contains `generateMealPlanWithAI()` which sends the prompt to **Google Gemini**.
  * Contains the logic that falls back to Unsplash images if the Spoonacular API quota is hit.
* **`.env`**: Contains secret keys (MongoDB URI, Gemini Key, Spoonacular Key).

---

## 🧠 3. How the "Generate Plan" Flow Works
If you want to edit how meal plans are generated, this is the exact flow:

1. **User Clicks "Generate" (Frontend)**
   - `UserInputForm.jsx` triggers `onSubmit`.
   - `DietContext.jsx` takes the form data and sends a `POST /api/profile` request to save the metrics.
   - It then sends a `POST /api/mealplans/generate` request.
2. **Backend Receives Request**
   - `mealPlanController.js` receives the request. It fetches the user's saved profile (to know their target calories).
   - It calls `generatePlan` in `utils/api.js`.
3. **The AI Does the Work (`utils/api.js`)**
   - The backend constructs a highly specific prompt for **Gemini 3.1 Flash Lite**. The prompt tells Gemini the exact calories and macros to hit, and demands the output strictly as JSON.
   - Gemini returns the JSON text.
   - The backend parses the JSON, and runs it through an "enrichment" loop to attach beautiful food images from Unsplash based on the meal name.
4. **Saving & Returning**
   - The enriched plan is saved to the MongoDB `MealPlan` collection.
   - It is sent back to the frontend.
5. **Frontend Renders**
   - `DietContext.jsx` updates its state.
   - The user is redirected to `MealPlans.jsx`, which loops through the data and renders `RecipeCard.jsx` components.

---

## 🛠️ 4. Tips for Editing on Your Own

- **Want to change the AI's behavior?** (e.g., make it generate 5 meals instead of 4) 
  - Edit the prompt string inside `/server/utils/api.js` (around line 18).
- **Want to change the math?** (e.g., adjust the macro percentages)
  - Edit the calculation logic in `/server/controllers/profileController.js`.
- **Want to change the UI colors?**
  - Most colors are Tailwind classes directly in the React components (e.g., `bg-emerald-500`). Look inside the `/src/components/` files.
- **How to restart the backend if you change Node.js code:**
  - Go to the terminal running the backend.
  - Press `Ctrl + C` to stop it.
  - Run `node server.js` to start it again. (Frontend Vite server hot-reloads automatically, so you don't need to restart it when changing React code).
