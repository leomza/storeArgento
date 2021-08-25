"use strict";
exports.__esModule = true;
exports.deleteProduct = exports.infoCart = exports.addCart = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var cartModel_1 = require("../models/cartModel");
//Function to create a new Cart
function addCart(req, res) {
    try {
        //Get the information from the body
        var _a = req.body, quantity = _a.quantity, productId = _a.productId, cartId = _a.cartId;
        //Initialice a new instance of the product that is going to purchase
        var productToPurchase = new cartModel_1.PurchaseProduct(productId, quantity, req.price);
        //Initialice a new instance of the carts
        var allCarts = new cartModel_1.Carts();
        //Look for the cart of the user
        var userCart = allCarts.searchUserCart(cartId);
        userCart.products.push(productToPurchase);
        allCarts.updateCartsJson();
        res.send({ message: "A new product was added to the cart", userCart: userCart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.addCart = addCart;
function infoCart(req, res) {
    try {
        var cartId = req.params.cartId;
        var allCarts = new cartModel_1.Carts();
        var userCart = allCarts.searchUserCart(cartId);
        res.send({ message: "Get the information of the cart correctly", userCart: userCart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.infoCart = infoCart;
function deleteProduct(req, res) {
    try {
        var _a = req.params, productId = _a.productId, cartId = _a.cartId;
        var allCarts = new cartModel_1.Carts();
        var productDelete = allCarts.removeProductsFromUserCart(productId, cartId);
        res.send({ message: "Poof! Your product has been deleted!", productDelete: productDelete });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteProduct = deleteProduct;
