const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, 'your-secret-key', { expiresIn: '30d' });
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', { email, password });

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (!isMatch) {
      console.log('Password did not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('Login successful, token generated');

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete existing test user and create new one
router.post('/create-test-user', async (req, res) => {
  try {
    // First, delete any existing test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Deleted existing test user');

    // Generate password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    console.log('Created hashed password');

    // Create new user with hashed password
    const testUser = new User({
      email: 'test@example.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      settings: {
        language: 'en',
        notifications: true,
        theme: 'light'
      },
      verified: true
    });

    await testUser.save();
    console.log('Created new test user with hashed password');
    
    res.json({ 
      message: 'Test user created successfully',
      credentials: {
        email: 'test@example.com',
        password: 'password123'
      }
    });
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Temporary route to check user details
router.get('/check-test-user', async (req, res) => {
  try {
    const user = await User.findOne({ email: 'test@example.com' });
    if (user) {
      res.json({
        exists: true,
        email: user.email,
        hasPassword: !!user.password,
        passwordLength: user.password.length
      });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
