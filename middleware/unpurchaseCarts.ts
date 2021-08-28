export { };

import { Carts } from '../models/cartModel'

//With the user email that wants to log in, I will search inside the carts which one contain a purchaseDate = "null", if no one contains that date I will create a new cart
export function checkUnpurachaseCart(req, res, next) {
    try {
        const { email } = req.body;
        const cart = new Carts();
        const unpurchaseCart = cart.searchUnpurchaseCart(email);
        req.unpurchaseCart = unpurchaseCart;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
