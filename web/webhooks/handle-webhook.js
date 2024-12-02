import ProcessedWebhook from "../db/models/processedWebhookModel.js";
import Shop from "../db/models/shopModel.js";

export const handleWebhook = async (shopDomain, webhookId, topic, body, processLogic) => {

    console.log(`${topic} topic has been called!, webhookId: ${webhookId}, shopDomain: ${shopDomain}`)

    try {
        // Check if webhook ID has already been processed
        const alreadyProcessed = await ProcessedWebhook.findOne({ webhookId });

        if (alreadyProcessed) {
            console.log(`Webhook ${webhookId} has already been processed. Skipping.`);
            return; // Skip processing
        }

        // Get the related shopId 
        const shop = await Shop.findOne({ domain: shopDomain }, { id: 1 }).lean()

        const payload = JSON.parse(body)

        // Save the webhook ID and related metadata
        await ProcessedWebhook.create({
            webhookId,
            shopId: shop.id,
            shopDomain,
            topic,
            payload
        });

        // Call your business logic for processing the webhook
        await processLogic(shop.id, payload);

        console.log(`Webhook ${webhookId} processed successfully.`);
    } catch (error) {
        console.error(`Error processing webhook ${webhookId}:`, error.message);
        // Optionally handle failure, like retrying processLogic or rolling back
    }
};
