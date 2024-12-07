import ShopifySession from '../db/models/shopifySession.js';
import shopify from '../shopify.js'


export const registerWebhooksForAllShops = async () => {
    try {
        const shopifySessions = await ShopifySession.find({}).lean()

        for (const session of shopifySessions) {
            await registerShopWebhooks(session.shop, session.accessToken);
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
