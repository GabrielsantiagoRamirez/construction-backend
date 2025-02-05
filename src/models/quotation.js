import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const { Schema, model } = mongoose;


const QuotationSchema = new mongoose.Schema({
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

QuotationSchema.plugin(mongoosePaginate);

export default model('Quotation', QuotationSchema);