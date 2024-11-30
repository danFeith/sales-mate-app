import mongoose from "mongoose";

const processedWebhookSchema = new mongoose.Schema({
  webhookId: { type: String, required: true, unique: true }, // Unique webhook ID
  shopId: { type: Number, required: true }, // Shopify shop ID
  shopDomain: { type: String, required: true }, // Shopify shop domain
  topic: { type: String, required: true }, // Webhook topic name (e.g., 'PRODUCTS_CREATE')
  payload: { type: Object, required: true }, // Explicitly store JSON payload
  processedAt: { type: Date, default: Date.now }, // Timestamp for cleanup
});

const ProcessedWebhook = mongoose.model("ProcessedWebhook", processedWebhookSchema);

export default ProcessedWebhook;
