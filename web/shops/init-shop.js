import { fetchShopData } from "./fetch-shop-data.js";
import { fetchAllProducts } from "../products/fetch-all-products.js";
import Shop from "../db/models/shopModel.js";
import Products from "../db/models/productModel.js";


/**
 * Fetch shop data and all products for a given shop.
 * @param {string} shop - The shop domain.
 * @param {string} accessToken - The access token for the shop.
 * @returns {Promise<Object>} - Returns a promise that resolves to an object containing shop data and products.
 */
export async function initShop(shop, accessToken) {
    try {
        const shopData = await fetchShopData(shop, accessToken);

        // Save shop data to MongoDB
        const savedShop = await Shop.findOneAndUpdate(
            { id: shopData.id },
            {...shopData, domain: shop},
            { upsert: true, new: true }
        );

        const products = await fetchAllProducts(shop, accessToken);

        // Save products to MongoDB using bulk operations
        const bulkOps = products.map((product) => ({
            updateOne: {
                filter: { id: product.id },
                update: { ...product, shop_id: savedShop.id, shop_domain: savedShop.domain  }, 
                upsert: true, // Insert if it doesn't exist
            },
        }));
        const result = await Products.bulkWrite(bulkOps);
        console.log(`Bulk operation successful: ${result.nModified} documents updated.`);
      

        console.log(`Saved ${products.length} products for shop: ${savedShop.name}`);
        return { shopData, products };
    } catch (error) {
        console.error("Error initializing shop data and products:", error.message);
    }
}
