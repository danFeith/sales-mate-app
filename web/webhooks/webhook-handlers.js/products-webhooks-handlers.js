import { DeliveryMethod } from "@shopify/shopify-api";
import { handleWebhook } from "../handle-webhook.js";
import { saveProduct } from "../../products/save-product.js";

/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
export const productsWebhooksHandlers = {

    PRODUCTS_CREATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shopDomain, body, webhookId) => {
            await handleWebhook(shopDomain, webhookId, topic, body, async (shopId, payload) => {
                console.log("PRODUCT_CREATE topic has been called!!")
                await saveProduct(shopId, JSON.parse(body))
            })
        },
    },
    PRODUCTS_DELETE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shopDomain, body, webhookId) => {
            await handleWebhook(shopDomain, webhookId, topic, body, async (shopId, payload) => {
                console.log("PRODUCT_DELETE topic has been called!!")
                console.log("payload", payload)
            })
        },
    },
}