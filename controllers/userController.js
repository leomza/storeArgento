"use strict";
exports.__esModule = true;
exports.login = exports.findUser = exports.registerUser = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var userModel_1 = require("../models/userModel");
var cartModel_1 = require("../models/cartModel");
function registerUser(req, res) {
    try {
        //Get the information from the body
        var _a = req.body, username = _a.username, email = _a.email, role = _a.role;
        var hashPassword = req.hashPassword;
        //Initialice a new instance of the User
        var user = new userModel_1.User(username, email, hashPassword, role);
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        var allUsers = new userModel_1.Users();
        allUsers.createUser(user);
        var products = null;
        var unpurchaseCart = new cartModel_1.Cart(email, products);
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
        var email = req.params.email;
        var allUsers = new userModel_1.Users();
        var userInfo = void 0;
        //I use req.params from the login and req.email from the cookies 
        if (req.email) {
            userInfo = allUsers.findUser(req.email);
        }
        else {
            userInfo = allUsers.findUser(email);
        }
        res.send({ message: "Username was found", userInfo: userInfo });
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
