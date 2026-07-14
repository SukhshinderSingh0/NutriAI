const express = require('express');
const router = express.Router();
const { generatePlan, getHistory } = require('../controllers/mealPlanController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/mealplans/generate
// @desc    Generate a new meal plan using AI and save it
// @access  Private
router.post('/generate', authMiddleware, generatePlan);

// @route   GET /api/mealplans
// @desc    Get user's meal plan history
// @access  Private
router.get('/', authMiddleware, getHistory);

module.exports = router;
