const express = require('express');
const connectToMongo = require('./backend/db'); // <- backend folder में db.js
var cors = require('cors');

connectToMongo(); // MongoDB connect
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./backend/routes/auth')); // <- backend folder में routes
app.use('/api/notes', require('./backend/routes/notes')); // <- backend folder में routes

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
