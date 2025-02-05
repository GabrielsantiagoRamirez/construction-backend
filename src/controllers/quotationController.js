import Quotation from '../models/quotation.js';

// Endpoint para obtener todas las cotizaciones
const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error });
  }
};

// Endpoint para registrar una cotización
const registerQuotation = async (req, res) => {
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
};


export { getQuotations, registerQuotation };