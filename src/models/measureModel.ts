import { Schema, model } from 'mongoose';

const measureSchema = new Schema({
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, enum: ['WATER', 'GAS'], required: true },
  measure_value: { type: Number, required: true },
  measure_uuid: { type: String, required: true, unique: true },
  image_url: { type: String, required: true },
  has_confirmed: { type: Boolean, default: false }
});

export const Measure = model('Measure', measureSchema);
