export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { PurchaseProduct, Cart, Carts } from "../models/cartModel";

//Function to create a new Cart
export function addCart(req, res) {
    try {
        //Get the information from the body
        const { quantity, productId, cartId } = req.body;

        //Initialice a new instance of the product that is going to purchase
        const productToPurchase = new PurchaseProduct(productId, quantity, req.price);

        //Initialice a new instance of the carts
        const allCarts = new Carts()

        //Look for the cart of the user
        const userCart = allCarts.searchUserCart(cartId);
        userCart.products.push(productToPurchase);
        allCarts.updateCartsJson();

        res.send({ message: "A new product was added to the cart", userCart });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}