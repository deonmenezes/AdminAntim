import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  category: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { 
    type: mongoose.Schema.Types.Mixed, // Changed from Decimal128 to Mixed to support both numbers and strings
    get: (v: mongoose.Schema.Types.Mixed) => { 
      return typeof v === 'object' && v !== null ? parseFloat(v.toString()) : v 
    }
  },
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;