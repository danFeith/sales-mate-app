
/**
 * Delete a product from the database.
 * @param {string} shop - The shop domain.
 * @param {string} shopifyProductId - The Shopify product ID.
 */
export const deleteProduct = async (shop, shopifyProductId) => {
    try {
      const deletedProduct = await Product.findOneAndDelete({
        shopifyProductId,
        shop,
      });
  
      if (deletedProduct) {
        console.log(`Product with ID ${shopifyProductId} deleted successfully for shop: ${shop}`);
      } else {
        console.log(`Product with ID ${shopifyProductId} not found for shop: ${shop}`);
      }
    } catch (error) {
      console.error(`Error deleting product for shop ${shop}:`, error.message);
    }
  };
  