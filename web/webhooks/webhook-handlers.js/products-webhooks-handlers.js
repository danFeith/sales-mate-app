import { DeliveryMethod } from "@shopify/shopify-api";
import { handleWebhook } from "../handle-webhook.js";
import { saveProduct } from "../../products/save-product.js";
import { deleteProduct } from "../../products/delete-product.js";
import { updateProduct } from "../../products/update-product.js";

/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
export const productsWebhooksHandlers = {

    PRODUCTS_CREATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shopDomain, body, webhookId) => {
            await handleWebhook(shopDomain, webhookId, topic, body, saveProduct)
        }
    },
    PRODUCTS_DELETE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shopDomain, body, webhookId) => {
            await handleWebhook(shopDomain, webhookId, topic, body, deleteProduct)
        },
    },
    PRODUCTS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shopDomain, body, webhookId) => {
            await handleWebhook(shopDomain, webhookId, topic, body, updateProduct)
        },
    },
}