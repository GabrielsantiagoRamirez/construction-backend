import bcrypt from 'bcrypt';
import User from '../models/user.js';

const registerUser = async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(password, 10);

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
    console.error('Error al registrar el usuario:', error);  // Agregar más detalles sobre el error
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};


const loginUser = async (req, res) => {
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
};

export { registerUser, loginUser };
