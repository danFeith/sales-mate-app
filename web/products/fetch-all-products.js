import axios from "axios";

/**
 * Fetch all products from the Shopify REST API.
 * @param {string} shop - The shop domain.
 * @param {string} accessToken - The access token for the shop.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of products.
 */
export const fetchAllProducts = async (shop, accessToken) => {
  let hasNextPage = true;
  let products = [];
  let nextPageUrl = `https://${shop}/admin/api/2024-10/products.json?limit=50`;

  try {
    while (hasNextPage && nextPageUrl) {
      const response = await axios.get(nextPageUrl, {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      });

      // Combine fetched products with the existing array
      products = [...products, ...response.data.products];

      // Handle pagination
      const linkHeader = response.headers.link;
      if (typeof linkHeader === "string") {
        const match = linkHeader.match(/<(.*?)>; rel="next"/);
        nextPageUrl = match ? match[1] : '';
      } else {
        nextPageUrl = '';
      }

      hasNextPage = nextPageUrl !== '';
    }
  } catch (error) {
    console.error("Error fetching all products via REST API:", error.message);
    throw error;
  }

  return products;
}

