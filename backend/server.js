const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

const startServer = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;
    
    // Fallback to memory server if local connection is configured or if no URI
    if (!mongoUri || mongoUri.includes('127.0.0.1')) {
      console.log('Using MongoDB Memory Server for isolated testing...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected to:', mongoUri);

    // Routes
    const apiRoutes = require('./routes/api');
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
