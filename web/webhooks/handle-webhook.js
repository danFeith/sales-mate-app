import Conversation from "../db/models/conversationsModel.js";
import ProcessedWebhook from "../db/models/processedWebhookModel.js";
import Shop from "../db/models/shopModel.js";

export const handleProductWebhook = async (shopDomain, webhookId, topic, body, processLogic) => {

    console.log(`${topic} topic has been called!, webhookId: ${webhookId}, shopDomain: ${shopDomain}`)

    try {
        // Check if webhook ID has already been processed
        const alreadyProcessed = await ProcessedWebhook.findOne({ webhookId });

        if (alreadyProcessed) {
            console.log(`Webhook ${webhookId} has already been processed. Skipping.`);
            return; // Skip processing
        }

        // Get the related shopId 
        const shop = await Shop.findOne({ domain: shopDomain }, { id: 1, domain: 1 }).lean()

        if (!shop) {
            console.log(`Shop with domain ${shopDomain} not found. Skipping webhook ${webhookId}.`);
            return;
        }

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
        await processLogic(shop.id, payload, shop.domain);

        // Update all conversation documents related to this shopDomain
        const updateConversationsResult = await Conversation.updateMany(
            { shop_domain: shopDomain },
            { $set: { synced: false } }
        );

        console.log(`Updated ${updateConversationsResult.modifiedCount} conversation(s) for shopDomain: ${shopDomain}. Synced set to false.`);

        console.log(`Webhook ${webhookId} processed successfully.`);
    } catch (error) {
        console.error(`Error processing webhook ${webhookId}:`, error.message);
        // Optionally handle failure, like retrying processLogic or rolling back
    }
};
