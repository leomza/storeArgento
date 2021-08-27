export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { PurchaseProduct, Carts } from "../models/cartModel";
import { Users } from "../models/userModel";
import { Products } from "../models/productModel";

//Function to create a new Cart
export function addCart(req, res) {
    try {
        //Get the information from the body
        const { quantity, productId, cartId } = req.body;

        //Initialice a new instance of the carts
        const allCarts = new Carts()

        //Look for the cart of the user
        const userCart = allCarts.searchUserCart(cartId);

        //Search if the product already exist in the cart, if not create a new one
        const productExist = allCarts.searchProductInCart(productId, userCart);
        let productToPurchase;

        if (productExist) {
            //Have to parse because they are Strings
            productExist.quantity = parseInt(productExist.quantity) + parseInt(quantity);
            productExist.totalPrice = productExist.quantity * productExist.price;
        } else {
            //Initialice a new instance of the product that is going to purchase
            productToPurchase = new PurchaseProduct(productId, quantity, req.price);
            userCart.products.push(productToPurchase);
        }
        allCarts.updateTotalAmount(userCart);
        allCarts.updateCartsJson();

        res.send({ message: "A new product was added to the cart", userCart });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function infoCart(req, res) {
    try {
        const { cartId } = req.params;
        const allCarts = new Carts();
        const userCart = allCarts.searchUserCart(cartId)
        res.send({ message: "Get the information of the cart correctly", userCart });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function deleteProduct(req, res) {
    try {
        const { productId, cartId } = req.params;
        const allCarts = new Carts();
        const productDelete = allCarts.removeProductsFromUserCart(productId, cartId);
        const userCart = allCarts.searchUserCart(cartId);
        allCarts.updateTotalAmount(userCart);
        allCarts.updateCartsJson();
        res.send({ message: "Poof! Your product has been deleted!", productDelete });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function finalPurchase(req, res) {
    try {
        const userEmail = req.email;
        const { cartId } = req.body;

        //Set the date of the purchase in the cart
        const allCarts = new Carts();
        const userCart = allCarts.searchUserCart(cartId);
        allCarts.setPurchaseDate(userCart);
        allCarts.updateCartsJson();

        //Set the id of the cart in the user
        const allUsers = new Users();
        const userInfo = allUsers.findUser(userEmail);
        allUsers.addPurchasedCart(userInfo, cartId);
        allUsers.updateUsersJson();

        //Get all the products and then dicrease stock
        const allProducts = new Products();
        userCart.products.forEach(userProduct => {
            allProducts.products.forEach(product => {
                if (userProduct.productId === product.uuid) {
                    product.stock = product.stock - userProduct.quantity;
                }
            })
        });
        allProducts.updateProductsJson();

        res.send("Amazing purchase!");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function allCartsPurchased(req, res) {
    try {
        const allCarts = new Carts();
        const purchasedCarts = allCarts.searchPurchasedCarts();
        res.send({ message: "Get the information of the purchased carts correctly", purchasedCarts });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function changeStatus(req, res) {
    try {
        const { cartId, cartStatus } = req.body;
        const allCarts = new Carts();
        const userCart = allCarts.searchUserCart(cartId);
        userCart.picked = cartStatus;
        allCarts.updateCartsJson();
        res.send({ message: "The cart was updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}