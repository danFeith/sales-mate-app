import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
const ADJECTIVES = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
];
const NOUNS = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
];
export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;
export default async function productCreator(session, count = DEFAULT_PRODUCTS_COUNT) {
    const client = new shopify.api.clients.Graphql({ session });
    try {
        for (let i = 0; i < count; i++) {
            await client.request(CREATE_PRODUCTS_MUTATION, {
                variables: {
                    input: {
                        title: `${randomTitle()}`,
                    },
                },
            });
        }
    }
    catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
        }
        else {
            throw error;
        }
    }
}
function randomTitle() {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adjective} ${noun}`;
}