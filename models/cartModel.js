"use strict";
exports.__esModule = true;
exports.Carts = exports.Cart = exports.PurchaseProduct = exports.readJsonCarts = void 0;
var uuidv4 = require("uuid").v4;
var fs = require("fs");
var path = require("path");
var cartsJsonPath = path.resolve(__dirname, "./carts.json");
//Function to read the JSON of created carts
exports.readJsonCarts = function () {
    try {
        var carts = fs.readFileSync(cartsJsonPath);
        return JSON.parse(carts);
        ;
    }
    catch (error) {
        console.error(error);
    }
};
var PurchaseProduct = /** @class */ (function () {
    function PurchaseProduct(productId, quantity, price) {
        this.uuid = uuidv4();
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = (quantity * price);
    }
    return PurchaseProduct;
}());
exports.PurchaseProduct = PurchaseProduct;
var Cart = /** @class */ (function () {
    function Cart(userId, products) {
        this.uuid = uuidv4();
        this.userId = userId;
        this.products = (products === null) ? [] : products; //when the user push add here
        this.totalAmount = null;
        this.createdDate = Date.now();
        this.purchasedDate = null;
    }
    return Cart;
}());
exports.Cart = Cart;
var Carts = /** @class */ (function () {
    function Carts() {
        this.carts = exports.readJsonCarts();
    }
    Carts.prototype.updateCartsJson = function () {
        try {
            fs.writeFileSync(cartsJsonPath, JSON.stringify(this.carts));
        }
        catch (error) {
            console.error(error);
        }
    };
    return Carts;
}());
exports.Carts = Carts;
