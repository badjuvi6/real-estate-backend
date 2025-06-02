// real-estate-app/backend/routes/contact.js
const express = require('express');
const router = express.Router();

// POST /api/contact route
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // For now, we'll just log the message.
    // In a real application, you would save this to a database
    // or send it to an email service (e.g., Nodemailer).
    console.log('--- Received Contact Message ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('------------------------------');

    // Send a success response back to the frontend
    res.status(200).json({ message: 'Message received successfully!' });
});

module.exports = router;