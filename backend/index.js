
// const express = require('express');
// const connectToMongo = require('./db');        // <-- change here
// var cors = require('cors');

// connectToMongo();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Available Routes
// app.use('/api/auth', require('./routes/auth'));   // <-- change here
// app.use('/api/notes', require('./routes/notes')); // <-- change here

// app.listen(port, () => {
//     console.log(`iNotebook backend listening on port ${port}`);
// });  
// index.js




// const express = require('express');
// const connectToMongo = require('./db'); // connect MongoDB
// const cors = require('cors');

// // Connect to MongoDB
// connectToMongo();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));

// // Root route for health check
// app.get('/', (req, res) => {
//     res.send('iNotebook backend is running!');
// });

// // Start server
// app.listen(port, () => {
//     console.log(`iNotebook backend listening on port ${port}`);
// });





const express = require('express');
const connectToMongo = require('./db');  
var cors = require('cors');

connectToMongo();  // connect to Atlas

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Root route (optional)
app.get('/', (req, res) => {
    res.send('iNotebook Backend is running!');
});

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`);
});
