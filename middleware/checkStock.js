"use strict";
exports.__esModule = true;
exports.checkStockCart = exports.checkStockProduct = void 0;
var productModel_1 = require("../models/productModel");
var cartModel_1 = require("../models/cartModel");
function checkStockProduct(req, res, next) {
    try {
        var _a = req.body, productId = _a.productId, quantity = _a.quantity;
        var product = new productModel_1.Products();
        var productInfo = product.detailsProduct(productId);
        if (parseInt(quantity) > productInfo.stock) {
            res.status(400).send('Not enough stock of the product');
            return;
        }
        else {
            req.price = productInfo.price;
            next();
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.checkStockProduct = checkStockProduct;
function checkStockCart(req, res, next) {
    try {
        var cartId = req.body.cartId;
        //Get the cart of the user
        var carts = new cartModel_1.Carts();
        var cartUser_1 = carts.searchUserCart(cartId);
        //Get all the products
        var products_1 = new productModel_1.Products();
        cartUser_1.products.forEach(function (userProduct) {
            products_1.products.forEach(function (product) {
                if (userProduct.productId === product.uuid && userProduct.quantity > product.stock) {
                    console.log(cartUser_1);
                    res.status(400).send("Not enough stock of the product " + product.name);
                    return;
                }
            });
        });
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.checkStockCart = checkStockCart;
