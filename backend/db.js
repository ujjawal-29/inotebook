
const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; 

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectToMongo;
