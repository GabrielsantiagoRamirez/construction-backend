import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Exportar las variables de entorno
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 3000;

console.log('MONGO_URI:', MONGO_URI);
console.log('PORT:', PORT);