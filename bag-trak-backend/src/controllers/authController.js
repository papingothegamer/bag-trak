const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    console.log('Login attempt received:', req.body);
    
    if (!req.body.email || !req.body.password) {
      console.log('Missing email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('Login successful for:', email);

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};