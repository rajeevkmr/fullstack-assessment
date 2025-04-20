import { Schema, model } from 'mongoose';

const salesSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    trim: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  product: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  orderDate: {
    type: Date,
    required: true,
    trim: true,
  },
});

export default model('Sales', salesSchema);
