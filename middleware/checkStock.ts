export { };

import { Products } from '../models/productModel';
import { Carts } from '../models/cartModel';

export function checkStockProduct(req, res, next) {
    try {
        const { productId, quantity } = req.body;
        const product = new Products();
        const productInfo = product.detailsProduct(productId)

        if (parseInt(quantity) > productInfo.stock) {
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

export function checkStockCart(req, res, next) {
    try {
        const { cartId } = req.body;

        //Get the cart of the user
        const carts = new Carts();
        const cartUser = carts.searchUserCart(cartId)

        //Get all the products
        const products = new Products();

        cartUser.products.forEach(userProduct => {
            products.products.forEach(product => {
                if (userProduct.productId === product.uuid && userProduct.quantity > product.stock) {
                    console.log(cartUser);
                    res.status(400).send(`Not enough stock of the product ${product.name}`);
                    return;
                }
            })
        });
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}