import Products from "../db/models/productModel.js";

export const updateProduct = async (shopId, payload, shopDomain) => {
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
    // Find and update the product, or insert it if it doesn't exist
    const updatedProduct = await Products.findOneAndUpdate(
      { id, shop_domain: shopDomain }, // Match by Shopify product ID and shop ID
      {
        id,
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
        shop_id: payload.shop_id, // Ensure the shop ID is updated
        shop_domain: shopDomain
      },
      { new: true, upsert: true } // Return the updated document or insert a new one
    );

    console.log(`Product "${title}" updated successfully for shop: ${shopId}`);
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product "${title}" for shop ${shopId}:`, error.message);
    throw error;
  }
};
