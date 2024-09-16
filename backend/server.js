const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

// CORS middleware with specified allowed origin
app.use(cors({
    origin: 'https://own-it-rental.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed Headers
    optionsSuccessStatus: 204 // For legacy browsers support
}));

// Allow preflight requests for all routes
app.options('*', cors());

// Apply CORS headers to all routes globally
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://own-it-rental.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve `index.html` when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to serve the API key
app.get('/api/google-maps-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (apiKey) {
        res.setHeader('Access-Control-Allow-Origin', 'https://own-it-rental.vercel.app'); // Added CORS headers manually for this route
        res.json({ apiKey });
    } else {
        res.status(500).json({ error: 'API key not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});