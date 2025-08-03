const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/onemedia');
    console.log('MongoDB connected : ',instance.connection.host);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;