import express from 'express';
import { connectDB } from './db.js';
import bcrypt from 'bcrypt';
import { PORT } from './config.js';
import mongoose from 'mongoose';

// Definir los esquemas de MongoDB
const userSchema = new mongoose.Schema({
  document: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  cellphone: { type: String, required: true },
  user_type: { type: String, required: true },
});

const quotationSchema = new mongoose.Schema({
  factory: { type: String, required: true },
  fix: { type: String, required: true },
  description_quotation: { type: String, required: true },
  subtotal: { type: Number, required: true },
  unexpected: { type: Number, required: true },
  iva: { type: Number, required: true },
  administratitive: { type: Number, required: true },
  utility: { type: Number, required: true },
  total_price: { type: Number, required: true },
  sections: [
    {
      description_sections: { type: String, required: true },
      section_price: { type: Number, required: true },
      items: [
        {
          item_name: { type: String, required: true },
          item_description: { type: String, required: true },
          item_total: { type: Number, required: true },
          quantity: { type: Number, required: true },
          unity: { type: String, required: true },
          item_value: { type: Number, required: true },
        },
      ],
    },
  ],
});

// Crear los modelos
const User = mongoose.model('User', userSchema);
const Quotation = mongoose.model('Quotation', quotationSchema);

const app = express();
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Endpoint para obtener todos los usuarios
app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Endpoint para registrar un usuario
app.post('/userregister', async (req, res) => {
    try {
      const { document, email, password, name, last_name, cellphone, user_type } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
      }
  
      const existingDocument = await User.findOne({ document });
      if (existingDocument) {
        return res.status(400).json({ message: 'La cédula ya está registrada' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
  
      const newUser = new User({
        document,
        email,
        password: hashedPassword,
        name,
        last_name,
        cellphone,
        user_type,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
  });
  
// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado con el email proporcionado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const userInfo = {
      document: user.document,
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      cellphone: user.cellphone,
      user_type: user.user_type,
    };

    res.status(200).json({ message: 'Usuario logueado correctamente', user: userInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
});

// Endpoint para obtener todas las cotizaciones
app.get('/quotations', async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error });
  }
});

// Endpoint para registrar una cotización
app.post('/quotationregister', async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.factory || !data.fix || !data.description_quotation || 
        data.subtotal === undefined || data.unexpected === undefined || 
        data.iva === undefined || data.administratitive === undefined || 
        data.utility === undefined || data.total_price === undefined || 
        !Array.isArray(data.sections)) {
      return res.status(400).json({ error: "Formato de JSON inválido" });
    }

    const newQuotation = new Quotation(data);
    await newQuotation.save();
    res.status(201).json({ message: 'Cotización almacenada correctamente', quotation: newQuotation });
  } catch (error) {
    res.status(500).json({ message: 'Error al almacenar la cotización', error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});