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
