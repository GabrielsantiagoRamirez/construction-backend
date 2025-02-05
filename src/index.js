import express from 'express';
import cors from 'cors';
import { connectDB } from './database/connection.js';
import dotenv from 'dotenv';
dotenv.config();

// Mensaje de bienvenida
console.log("Bienvenido a Vidpher API");

// Conectar a MongoDB
connectDB();

const app = express();

// Usamos el puerto proporcionado por Vercel, o 3000 como fallback
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from './routes/userRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';

app.use('/api/user', userRoutes);
app.use('/api/quotation', quotationRoutes);

// Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({ message: "Ruta de prueba" });
});

// Exportar la app para que Vercel la maneje
export default app;
