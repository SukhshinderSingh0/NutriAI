const express = require('express');
const router = express.Router();
const { generatePlan, getHistory } = require('../controllers/mealPlanController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/generate', authMiddleware, generatePlan);

router.get('/', authMiddleware, getHistory);

module.exports = router;
