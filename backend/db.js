
// const mongoose = require('mongoose');

// const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; 

// const connectToMongo = () => {
//     mongoose.connect(mongoURI)
//         .then(() => console.log('MongoDB connected successfully'))
//         .catch((err) => console.error('MongoDB connection error:', err));
// };

// module.exports = connectToMongo;


// db.js



// const mongoose = require('mongoose');

// // MongoDB URI from Render Environment Variables
// const mongoURI = process.env.MONGO_URI;

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 30000 // Timeout 30s
//     })
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch((err) => console.error('MongoDB connection error:', err));
// };

// module.exports = connectToMongo;






// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGO_URI; // Atlas URI from Render env

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI); // no extra options needed in Mongoose v7+
//         console.log('MongoDB connected successfully');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//     }
// };

// module.exports = connectToMongo;


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
