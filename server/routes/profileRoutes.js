const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getProfile);
router.post('/', authMiddleware, createOrUpdateProfile);

module.exports = router;
