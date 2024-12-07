import mongoose from "mongoose";

const shopifySessionSchema = new mongoose.Schema({
  id: { type: Number},
  shop: { type: String},
  state: { type: String },
  isOnline: { type: Boolean },
  scope: { type: String },
  accessToken: { type: String },
});

const ShopifySession = mongoose.model("shopify_sessions", shopifySessionSchema);

export default ShopifySession;
