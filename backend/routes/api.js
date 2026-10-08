const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const User = require('../models/User');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.get('/auth/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select('username');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    userId: user._id,
    username: user.username
  });
});

// User routes
router.get('/users/:username', userController.getUserByUsername);
router.put('/users/me', authMiddleware, userController.updateProfile);

// Project routes
router.get('/projects/:username', projectController.getProjectsByUser);
router.post('/projects', authMiddleware, projectController.createProject);
router.put('/projects/:id', authMiddleware, projectController.updateProject);
router.delete('/projects/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
