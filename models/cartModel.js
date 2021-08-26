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
    function Cart(userEmail, products) {
        this.uuid = uuidv4();
        this.userEmail = userEmail;
        this.products = (products === null) ? [] : products; //when the user push add here
        this.totalAmount = 0;
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
    Carts.prototype.addProductsToCart = function (cart) {
        try {
            this.carts.push(cart);
            this.updateCartsJson();
        }
        catch (error) {
            console.error(error);
        }
    };
    Carts.prototype.searchUnpurchaseCart = function (userEmail) {
        try {
            var unpurchaseCart = this.carts.find(function (cart) { return (cart.userEmail === userEmail) && (cart.purchasedDate === null); });
            return unpurchaseCart;
        }
        catch (error) {
            console.error(error);
        }
    };
    Carts.prototype.searchUserCart = function (cartId) {
        try {
            var userCart = this.carts.find(function (cart) { return cart.uuid === cartId; });
            return userCart;
        }
        catch (error) {
            console.error(error);
        }
    };
    Carts.prototype.removeProductsFromUserCart = function (productId, cartId) {
        try {
            var userCart = this.searchUserCart(cartId);
            userCart.products = userCart.products.filter(function (product) { return product.productId !== productId; });
        }
        catch (error) {
            console.error(error);
        }
    };
    Carts.prototype.searchProductInCart = function (productId, userCart) {
        try {
            var productExist = userCart.products.find(function (product) { return product.productId === productId; });
            return productExist;
        }
        catch (error) {
            console.error(error);
        }
    };
    Carts.prototype.updateTotalAmount = function (userCart) {
        userCart.totalAmount = 0;
        userCart.products.forEach(function (product) {
            userCart.totalAmount = userCart.totalAmount + product.totalPrice;
        });
    };
    Carts.prototype.setPurchaseDate = function (userCart) {
        userCart.purchasedDate = Date.now();
    };
    Carts.prototype.searchPurchasedCarts = function () {
        try {
            var purchaseCarts = this.carts.filter(function (cart) { return cart.purchasedDate !== null; });
            return purchaseCarts;
        }
        catch (error) {
            console.error(error);
        }
    };
    return Carts;
}());
exports.Carts = Carts;
