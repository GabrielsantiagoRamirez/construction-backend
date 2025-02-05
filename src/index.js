import express from 'express';
import cors from 'cors';
import { connectDB } from './database/connection.js';
import dotenv from 'dotenv';
dotenv.config();

//Mensaje de Bienvenioda
console.log("Bienvenido a Vidpher API");


// Conectar a MongoDB
connectDB();

const app = express();
const port = 3000;

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: true}));


import userRoutes from './routes/userRoutes.js'; 
import quotationRoutes from './routes/quotationRoutes.js';



app.use('/api/user', userRoutes);
app.use('/api/quotation', quotationRoutes);

//ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    return res.status(200).json({message: "Ruta de prueba"});
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})