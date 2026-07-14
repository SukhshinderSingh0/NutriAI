const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', authMiddleware, getProfile);

// @route   POST /api/profile
// @desc    Calculate TDEE and save profile
// @access  Private
router.post('/', authMiddleware, createOrUpdateProfile);

module.exports = router;
