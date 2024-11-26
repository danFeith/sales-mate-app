// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import axios from "axios";
// import { getAllProductsQuery } from "./gql";
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "8000", 10);
const STATIC_PATH = process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;
const app = express();
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(shopify.config.auth.callbackPath, shopify.auth.callback(), (req, res) => {
    console.log("shop", req.query.shop);
}, shopify.redirectToShopifyOrAppRoot());
app.post(shopify.config.webhooks.path, shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers }));
// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());
app.get("/api/products/count", async (_req, res) => {
    const client = new shopify.api.clients.Graphql({
        session: res.locals.shopify.session,
    });
    const countData = await client.request(`query {
    products(first: 10, after: "eyJsYXN0X2lkIjoyMDk5NTY0MiwibGFzdF92YWx1ZSI6IjIwOTk1NjQyIn0=") {
      edges {
        node {
          id
          title
          handle
          totalInventory
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }`);
    console.log("countData", countData.data);
    res.status(200).send({ count: 100000 });
});
app.post("/api/products", async (_req, res) => {
    let status = 200;
    let error = null;
    try {
        await productCreator(res.locals.shopify.session);
    }
    catch (e) {
        console.log(`Failed to process products/create: ${e.message}`);
        status = 500;
        error = e?.message;
    }
    res.status(status).send({ success: status === 200, error });
});
app.get("/api/products/all-rest", async (_req, res) => {
    const { accessToken, shop } = res.locals.shopify.session;
    let hasNextPage = true;
    let products = [];
    let nextPageUrl = `https://${shop}/admin/api/2023-10/products.json?limit=50`; // Explicitly set type to string | null
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
                nextPageUrl = match ? match[1] : ''; // match[1] is the next page URL
            }
            else {
                nextPageUrl = '';
            }
            hasNextPage = nextPageUrl !== '';
        }
        console.log("All Products:", products);
        res.status(200).send({ products });
    }
    catch (error) {
        console.error("Error fetching all products via REST API:", error.message);
        res.status(500).send({ error: error.message });
    }
});
app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
    res
        .status(200)
        .set("Content-Type", "text/html")
        .send(readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || ""));
});
app.listen(PORT);
