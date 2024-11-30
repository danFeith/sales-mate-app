import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Shopify shop ID
  name: { type: String, required: true },
  email: { type: String },
  domain: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
  country: { type: String },
  currency: { type: String },
  shop_owner: { type: String },
  plan_name: { type: String },
  phone: { type: String },
  access_token: { type: String }
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
