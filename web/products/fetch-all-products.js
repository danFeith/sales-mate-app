import axios from "axios";

/**
 * Fetch all products from the Shopify GraphQL API.
 * @param {string} shop - The shop domain.
 * @param {string} accessToken - The access token for the shop.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of products with specified fields.
 */
export const fetchAllProducts = async (shop, accessToken) => {
  const products = [];
  let hasNextPage = true;
  let endCursor = null;

  try {
    while (hasNextPage) {
      const query = `
        query ($endCursor: String) {
          products(first: 50, after: $endCursor) {
            edges {
              cursor
              node {
                id
                title
                bodyHtml
                handle
                productType
                tags
                vendor
                createdAt
                updatedAt
                options {
                  id
                  name
                  position
                  values
                }
                images(first: 10) {
                  edges {
                    node {
                      id
                      width
                      height
                      src
                    }
                  }
                }
                variants(first: 50) {
                  edges {
                    node {
                      id
                      title
                      price
                      compareAtPrice
                      position
                      sku
                      barcode
                      inventoryPolicy
                      inventoryQuantity
                      taxable
                      createdAt
                      updatedAt
                      product {
                        id
                      }
                    }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

      const response = await axios.post(
        `https://${shop}/admin/api/2024-10/graphql.json`,
        {
          query,
          variables: { endCursor },
        },
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.data.products;

      // Extract products from the response
      products.push(
        ...data.edges.map(edge => {
          const product = edge.node;
          product.images = product.images.edges.map(imageEdge => imageEdge.node);
          product.variants = product.variants.edges.map(variantEdge => variantEdge.node);
          return product;
        })
      );

      // Update pagination info
      hasNextPage = data.pageInfo.hasNextPage;
      endCursor = data.pageInfo.endCursor;
    }
  } catch (error) {
    console.error("Error fetching all products via GraphQL API:", error.message);
    throw error;
  }

  return products;
};
