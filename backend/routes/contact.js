const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const validateContact = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('subject').trim().isLength({ min: 3, max: 100 }).withMessage('Subject must be 3-100 characters'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be 10-1000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    });

    await contact.save();
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Vasanth will get back to you soon.'
    });
  } catch (err) {
    console.error('Contact save error:', err);
    res.status(500).json({ success: false, error: 'Failed to save message. Please try again.' });
  }
});

// GET /api/contact - Get all messages (protected in production)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
