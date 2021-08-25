"use strict";
exports.__esModule = true;
exports.finalPurchase = exports.deleteProduct = exports.infoCart = exports.addCart = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var cartModel_1 = require("../models/cartModel");
var userModel_1 = require("../models/userModel");
//Function to create a new Cart
function addCart(req, res) {
    try {
        //Get the information from the body
        var _a = req.body, quantity = _a.quantity, productId = _a.productId, cartId = _a.cartId;
        //Initialice a new instance of the carts
        var allCarts = new cartModel_1.Carts();
        //Look for the cart of the user
        var userCart = allCarts.searchUserCart(cartId);
        //Search if the product already exist in the cart, if not create a new one
        var productExist = allCarts.searchProductInCart(productId, userCart);
        var productToPurchase = void 0;
        if (productExist) {
            //Have to parse because they are Strings
            productExist.quantity = parseInt(productExist.quantity) + parseInt(quantity);
            productExist.totalPrice = productExist.quantity * productExist.price;
        }
        else {
            //Initialice a new instance of the product that is going to purchase
            productToPurchase = new cartModel_1.PurchaseProduct(productId, quantity, req.price);
            userCart.products.push(productToPurchase);
        }
        allCarts.updateTotalAmount(userCart);
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
        var userCart = allCarts.searchUserCart(cartId);
        allCarts.updateTotalAmount(userCart);
        allCarts.updateCartsJson();
        res.send({ message: "Poof! Your product has been deleted!", productDelete: productDelete });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.deleteProduct = deleteProduct;
function finalPurchase(req, res) {
    var userEmail = req.email;
    var cartId = req.body.cartId;
    //Set the date of the purchase in the cart
    var allCarts = new cartModel_1.Carts();
    var userCart = allCarts.searchUserCart(cartId);
    allCarts.setPurchaseDate(userCart);
    allCarts.updateCartsJson();
    //Set the id of the cart in the user
    var allUsers = new userModel_1.Users();
    var userInfo = allUsers.findUser(userEmail);
    allUsers.addPurchasedCart(userInfo, cartId);
    allUsers.updateUsersJson();
}
exports.finalPurchase = finalPurchase;
