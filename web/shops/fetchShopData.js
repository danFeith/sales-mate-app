import axios from "axios";

/**
 * Fetch shop data from the Shopify REST API.
 * @param {string} shop - The shop domain.
 * @param {string} accessToken - The access token for the shop.
 * @returns {Promise<Object>} - Returns a promise that resolves to the shop data.
 */
export async function fetchShopData(shop, accessToken) {
  try {
    const response = await axios.get(`https://${shop}/admin/api/2024-10/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    const shopData = response.data.shop;
    console.log(`Fetched shop data: ${shopData.name}`);
    return shopData;
  } catch (error) {
    console.error("Error fetching shop data:", error.message);
    throw error;
  }
}
