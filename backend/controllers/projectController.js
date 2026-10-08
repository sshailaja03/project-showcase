const Project = require('../models/Project');
const User = require('../models/User');

const projectFields = ['title', 'description', 'tags', 'liveUrl', 'githubUrl', 'thumbnail'];

const pickProjectFields = (body) =>
  Object.fromEntries(
    projectFields
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]])
  );

exports.createProject = async (req, res) => {
  try {
    const data = pickProjectFields(req.body);
    const project = await Project.create({
      ...data,
      user: req.user.userId
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectsByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const projects = await Project.find({ user: user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = pickProjectFields(req.body);
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
