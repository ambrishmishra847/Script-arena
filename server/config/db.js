const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // The key change is adding the dbName option to explicitly set the database name.
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'scriptArenaDB'
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
