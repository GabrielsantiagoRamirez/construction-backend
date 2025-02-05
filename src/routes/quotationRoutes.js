import express from 'express';
import { getQuotations, registerQuotation } from '../controllers/quotationController.js';


const router = express.Router();


router.get('/quotations', getQuotations);
router.post('/register/quotation', registerQuotation);

export default router;