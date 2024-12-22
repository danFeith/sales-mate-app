import Products from "../db/models/productModel.js";

/**
 * Delete a product from the database.
 * @param {string} shop - The shop domain.
 * @param {string} shopifyProductId - The Shopify product ID.
 */
export const deleteProduct = async (shopId, { id: productId }, shopDomain) => {
  try {
    const deletedProduct = await Products.findOneAndDelete({
      shop_domain: shopDomain,
      id: productId
    });

    if (deletedProduct) {
      console.log(`Product with ID ${productId} deleted successfully for shop: ${shopId}`);
    } else {
      console.log(`Product with ID ${productId} not found for shop: ${shopId}`);
    }
  } catch (error) {
    console.error(`Error deleting product for shop ${shopId}:`, error.message);
  }
};
