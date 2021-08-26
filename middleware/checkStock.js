"use strict";
exports.__esModule = true;
exports.checkStock = void 0;
var productModel_1 = require("../models/productModel");
function checkStock(req, res, next) {
    try {
        var _a = req.body, productId = _a.productId, quantity = _a.quantity;
        var product = new productModel_1.Products();
        var productInfo = product.detailsProduct(productId);
        if (quantity > productInfo.stock) {
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
exports.checkStock = checkStock;
