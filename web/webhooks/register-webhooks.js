import Shop from '../db/models/shopModel.js';
import shopify from '../shopify.js'


export const registerWebhooksForAllShops = async () => {
    try {
        const shops = await Shop.find({}).lean(); // Fetch all shops from the database

        for (const shop of shops) {
            await registerShopWebhooks(shop.domain, shop.access_token);
        }
    } catch (error) {
        console.error('Error registering webhooks for all shops:', error.message);
    }
};

const registerShopWebhooks = async (shopDomain, accessToken) => {
    try {
        const session = shopify.api.session.customAppSession(shopDomain); // Create session
        session.accessToken = accessToken; // Attach access token
        await shopify.api.webhooks.register({ session });
    } catch (error) {
        console.error(`Error registering webhooks for ${shopDomain}:`, error.message);
    }
};
