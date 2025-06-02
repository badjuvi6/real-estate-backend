// real-estate-app/backend/server.js

// Import necessary Node.js packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2; // Import Cloudinary v2 SDK

// Load environment variables from the .env file into process.env.
dotenv.config();

// --- Cloudinary Configuration ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create an Express application instance
const app = express();

// Define the port for the server to listen on.
const PORT = process.env.PORT || 3000;

// --- Middleware Setup ---
app.use(cors({
  origin: '*' // Allow all origins for testing. For production, specify your Netlify URL.
}));

app.use(express.json()); // To parse JSON bodies
// Note: Multer middleware for file uploads is usually applied directly in the route where files are expected.

// --- MongoDB Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- API Routes Setup ---
const propertiesRouter = require('./routes/properties');
app.use('/api/properties', propertiesRouter);

// NEW: Import and use the contact router
const contactRouter = require('./routes/contact'); // <--- ENSURE THIS LINE IS PRESENT
app.use('/api/contact', contactRouter);           // <--- ENSURE THIS LINE IS PRESENT

// --- Basic Root Route ---
app.get('/', (req, res) => {
    res.send('Real Estate Backend API is alive!');
});

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!', error: err.message });
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
