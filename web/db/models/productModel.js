import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Product ID from Shopify
  title: { type: String, required: true },
  handle: { type: String },
  body_html: { type: String },
  vendor: { type: String },
  product_type: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  tags: { type: Array },
  variants: { type: Array }, // Array of variants
  images: { type: Array },   // Array of images
  options: { type: Array },  // Array of options
  shop_id: { type: Number, ref: "Shop", required: true }, // Use `id` field from Shop schema
  shop_domain: { type: String, required: true }, // Store domain, linked conceptually to the domain in Shop schema
});

const Products = mongoose.model("products", productsSchema);

export default Products;
