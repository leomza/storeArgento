"use strict";
exports.__esModule = true;
exports.Cart = exports.Product = exports.readJsonCarts = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var productsJsonPath = path.resolve(__dirname, "./carts.json");
//Function to read the JSON of created carts
exports.readJsonCarts = function () {
    try {
        var carts = fs.readFileSync(productsJsonPath);
        return JSON.parse(carts);
        ;
    }
    catch (error) {
        console.error(error);
    }
};
var Product = /** @class */ (function () {
    function Product(picture, name, description, price, stock) {
        this.uuid = uuidv4();
        this.picture = picture;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
    return Product;
}());
exports.Product = Product;
var Cart = /** @class */ (function () {
    function Cart() {
        this.uuid = uuidv4();
        this.products = [];
        this.createdDate = Date.now();
        this.purchasedDate = null;
    }
    return Cart;
}());
exports.Cart = Cart;
