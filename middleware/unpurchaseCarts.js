"use strict";
exports.__esModule = true;
exports.checkUnpurachaseCart = void 0;
var cartModel_1 = require("../models/cartModel");
//With the user email that wants to log in, I will search inside the carts which one contain a purchaseDate = "null", if no one contains that date I will create a new cart
function checkUnpurachaseCart(req, res, next) {
    try {
        var email = req.body.email;
        var cart = new cartModel_1.Carts();
        var unpurchaseCart = cart.searchUnpurchaseCart(email);
        req.unpurchaseCart = unpurchaseCart;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.checkUnpurachaseCart = checkUnpurachaseCart;
