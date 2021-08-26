export { };

import { Products } from '../models/productModel'

export function checkStock(req, res, next) {
    try {
        const { productId, quantity } = req.body;
        const product = new Products();
        const productInfo = product.detailsProduct(productId)
        if (quantity > productInfo.stock) {
            res.status(400).send('Not enough stock of the product');
            return;
        } else {
            req.price = productInfo.price;
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}