import Products from "../db/models/productModel.js";

/**
 * Create a new product in the database.
 * @param {string} shop - The shop domain.
 * @param {object} payload - The payload from the PRODUCTS_CREATE webhook.
 */
export const saveProduct = async (shopId, payload) => {
  const {
    id,
    title,
    handle,
    body_html,
    vendor,
    product_type,
    created_at,
    updated_at,
    tags,
    variants,
    images,
    options,
  } = payload;

  try {
    const newProduct = new Products({
      id, // Shopify Product ID
      title,
      handle,
      body_html,
      vendor,
      product_type,
      created_at: new Date(created_at), // Convert to Date object
      updated_at: new Date(updated_at), // Convert to Date object
      tags,
      variants,
      images,
      options,
      shop_id: shopId, // Make sure shop_id is included in the payload
    });

    await newProduct.save();
    console.log(`Product "${title}" saved successfully for shop: ${shopId}`);
  } catch (error) {
    console.error(`Error saving product "${title}" for shop ${shopId}:`, error.message);
  }
};