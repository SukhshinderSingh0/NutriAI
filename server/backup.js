const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
// Import models
const User = require('./models/User');
const Profile = require('./models/Profile');
const MealPlan = require('./models/MealPlan');
async function exportDatabase() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect("mongodb+srv://sukhshinderchouhan_db_user:Xy7vQD4NqHv1vsuZ@nutridb.cw9n94g.mongodb.net/");
    console.log('Connected! Fetching data...');
    const users = await User.find({}).lean();
    const profiles = await Profile.find({}).lean();
    const mealPlans = await MealPlan.find({}).lean();
    const backupData = {
      timestamp: new Date().toISOString(),
      collections: {
        users,
        profiles,
        mealPlans
      }
    };
    fs.writeFileSync('database_backup.json', JSON.stringify(backupData, null, 2));
    
    console.log('\n✅ SUCCESS!');
    console.log(`Exported ${users.length} users, ${profiles.length} profiles, and ${mealPlans.length} meal plans.`);
    console.log('Data saved to: server/database_backup.json');
    
    process.exit(0);
  } catch (error) {
    console.error('Error exporting database:', error);
    process.exit(1);
  }
}
exportDatabase();

