const express = require('express');
const connectToMongo = require('./backend/db');
var cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;   // 🔥 यही सबसे जरूरी लाइन

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/notes', require('./backend/routes/notes'));

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`);
});
