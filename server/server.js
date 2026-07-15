require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/mealplans', mealPlanRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'AI Diet Planner API is running' });
});

// Database Connection & Server Start
const startServer = async () => {
  // Start the server first so Railway knows we are alive
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });

  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoURI) {
      console.warn('WARNING: MONGO_URI is not defined in the environment variables.');
      console.warn('Server is running, but database connections will fail.');
    } else {
      // Connect to MongoDB asynchronously
      await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of hanging
      });
      console.log('✅ Connected to MongoDB successfully.');
    }
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    // Don't kill the server, just log the error so we can see it in Railway
  }
};

startServer();
