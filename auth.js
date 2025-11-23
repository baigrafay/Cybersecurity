
const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({ error: 'Password must be 8+ chars' });
    }
    
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasUpper || !hasSpecial) {
      return res.status(400).json({ error: 'Password must include uppercase & special char' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({ name: validator.escape(name), email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
