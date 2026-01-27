
const express = require('express');
const connectToMongo = require('./db');        // <-- change here
var cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));   // <-- change here
app.use('/api/notes', require('./routes/notes')); // <-- change here

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`);
});  