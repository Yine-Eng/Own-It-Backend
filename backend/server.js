const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './backend/.env' });

// CORS middleware with specified allowed origin
app.use(cors({
    origin: 'https://own-it-rental.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed Headers
    optionsSuccessStatus: 204 // For legacy browsers support
}));

// Basic route to verify the backend is running
app.get('/', (req, res) => {
    res.send('Backend is working!');
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