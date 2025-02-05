import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Eventos de conexión
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB Atlas');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};