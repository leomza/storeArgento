"use strict";
exports.__esModule = true;
exports.changeStatus = exports.allCartsPurchased = exports.finalPurchase = exports.deleteProduct = exports.infoCart = exports.addCart = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var cartModel_1 = require("../models/cartModel");
var userModel_1 = require("../models/userModel");
var productModel_1 = require("../models/productModel");
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
    try {
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
        //Get all the products and then dicrease stock
        var allProducts_1 = new productModel_1.Products();
        userCart.products.forEach(function (userProduct) {
            allProducts_1.products.forEach(function (product) {
                if (userProduct.productId === product.uuid) {
                    product.stock = product.stock - userProduct.quantity;
                    console.log(product.stock);
                }
            });
        });
        allProducts_1.updateProductsJson();
        res.send("Amazing purchase!");
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.finalPurchase = finalPurchase;
function allCartsPurchased(req, res) {
    try {
        var allCarts = new cartModel_1.Carts();
        var purchasedCarts = allCarts.searchPurchasedCarts();
        res.send({ message: "Get the information of the purchased carts correctly", purchasedCarts: purchasedCarts });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.allCartsPurchased = allCartsPurchased;
function changeStatus(req, res) {
    try {
        var _a = req.body, cartId = _a.cartId, cartStatus = _a.cartStatus;
        var allCarts = new cartModel_1.Carts();
        var userCart = allCarts.searchUserCart(cartId);
        userCart.picked = cartStatus;
        allCarts.updateCartsJson();
        res.send({ message: "The cart was updated!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.changeStatus = changeStatus;
