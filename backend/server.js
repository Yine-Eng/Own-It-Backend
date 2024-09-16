const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

// CORS middleware with specified allowed origin
const corsOptions = {
    origin: 'https://own-it-rental.vercel.app',
    methods: ['GET', 'POST'], // Specify allowed methods
    optionsSuccessStatus: 200, // For legacy browsers support
};
app.use(cors(corsOptions));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve `index.html` when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to serve the API key
app.get('/api/google-maps-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (apiKey) {
        res.json({ apiKey });
    } else {
        res.status(500).json({ error: 'API key not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});