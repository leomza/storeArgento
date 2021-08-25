"use strict";
exports.__esModule = true;
exports.sendDataProduct = void 0;
var productModel_1 = require("../models/productModel");
function sendDataProduct(req, res, next) {
    try {
        var productId = req.body.productId;
        var product = new productModel_1.Products();
        var productInfo = product.detailsProduct(productId);
        req.price = productInfo.price;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.sendDataProduct = sendDataProduct;
