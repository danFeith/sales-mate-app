import { initShop } from "../shops/init-shop.js";

export const onInstall = async (req, res, next) => {
    const { accessToken, shop } = res.locals.shopify.session;
    await initShop(shop, accessToken)
    next()
}