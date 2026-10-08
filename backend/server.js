const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const connectDatabase = async () => {
  let mongoUri = process.env.MONGO_URI;

  if (!mongoUri || mongoUri.includes('127.0.0.1')) {
    console.log('Using MongoDB Memory Server for isolated testing...');
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  }

  await mongoose.connect(mongoUri);
  return mongoUri;
};

const startServer = async () => {
  try {
    const mongoUri = await connectDatabase();
    console.log('MongoDB connected to:', mongoUri);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exitCode = 1;
  }
};

if (require.main === module) {
  startServer();
}

module.exports = { app, connectDatabase };
