const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // Must be set in Render

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI); 
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectToMongo;
