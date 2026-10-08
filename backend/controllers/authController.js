const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateCredentials = (username, password) => {
  if (typeof username !== 'string' || typeof password !== 'string') {
    return 'Username and password are required';
  }

  const normalizedUsername = username.trim();
  if (normalizedUsername.length < 3 || normalizedUsername.length > 30) {
    return 'Username must be between 3 and 30 characters';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return null;
};

const createToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = validateCredentials(username, password);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const normalizedUsername = username.trim();
    const existingUser = await User.findOne({ username: normalizedUsername });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: normalizedUsername,
      password: hashedPassword
    });

    const token = createToken(user._id.toString());
    setAuthCookie(res, token);

    res.status(201).json({
      message: 'User registered successfully',
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationError = validateCredentials(username, password);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const user = await User.findOne({ username: username.trim() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user._id.toString());
    setAuthCookie(res, token);

    res.json({
      message: 'Logged in successfully',
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out successfully' });
};
