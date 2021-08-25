export { };

import { Products } from '../models/productModel'

export function sendDataProduct(req, res, next) {
    try {
        const { productId } = req.body;
        const product = new Products();
        const productInfo = product.detailsProduct(productId)
        req.price = productInfo.price;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}