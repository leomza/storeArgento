"use strict";
exports.__esModule = true;
exports.login = exports.findUser = exports.registerUser = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var userModel_1 = require("../models/userModel");
var cartModel_1 = require("../models/cartModel");
function registerUser(req, res) {
    try {
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        var user = req.user;
        var allUsers = new userModel_1.Users();
        allUsers.createUser(user);
        var products = null;
        var unpurchaseCart = new cartModel_1.Cart(req.email, products);
        var allCarts = new cartModel_1.Carts();
        allCarts.addProductsToCart(unpurchaseCart);
        res.send({ message: "A new User was added", user: user, unpurchaseCart: unpurchaseCart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.registerUser = registerUser;
function findUser(req, res) {
    try {
        var allUsers = new userModel_1.Users();
        var userInfo = void 0;
        //I use req.email from the cookies 
        if (req.email) {
            userInfo = allUsers.findUser(req.email);
        }
        if (userInfo) {
            res.status(200).send({ message: "Username was found", userInfo: userInfo });
        }
        else {
            res.status(400).send("Username was not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.findUser = findUser;
function login(req, res) {
    try {
        var email = req.body.email;
        var unpurchaseCart = req.unpurchaseCart;
        //If it is a new cart I create and push the data of the user (email and empty list of products)
        if (!unpurchaseCart) {
            var products = null;
            unpurchaseCart = new cartModel_1.Cart(email, products);
            var allCarts = new cartModel_1.Carts();
            allCarts.addProductsToCart(unpurchaseCart);
        }
        ;
        res.send({ message: "Logged in successfully", unpurchaseCart: unpurchaseCart });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
