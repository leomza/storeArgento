var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Get the UUID from the cart in the URL
var url_string = window.location.href;
var url = new URL(url_string);
var cartId = url.searchParams.get("cartId");
//This variable will determinate the rol of the User in the client side
var rolUser;
//Function to redirect back to the other page
function redirectBack() {
    try {
        window.location.href = "./03 - products.html?cartId=" + cartId;
    }
    catch (error) {
        console.error(error);
    }
}
;
//Function to render the data of the user
try {
    var userTitle_1 = document.querySelector('#nameUser');
    function renderUserDetails() {
        return __awaiter(this, void 0, void 0, function () {
            var userDetails, _a, username, role, toRender;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get('/user/info')];
                    case 1:
                        userDetails = _b.sent();
                        _a = userDetails.data.userInfo, username = _a.username, role = _a.role;
                        toRender = "<h1>Enjoy your buy <span class=\"nameUser__title\">" + username + "!</span></h1>";
                        userTitle_1.innerHTML = toRender;
                        //With this I will set the role of the user that is logged in (I will use this to manage the DOM in the client side, also in the server side I will do validation through cookies with role)
                        rolUser = role;
                        return [2 /*return*/];
                }
            });
        });
    }
    ;
}
catch (error) {
    console.error(error);
}
//I render the cart of the user
function renderCart() {
    return __awaiter(this, void 0, Promise, function () {
        var table, renderInfo, totalAmount, html, finalAmount, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    table = document.querySelector('.table');
                    if (!table)
                        throw new Error('There is a problem finding table from HTML');
                    return [4 /*yield*/, getInformationToRender()];
                case 1:
                    renderInfo = _a.sent();
                    totalAmount = renderInfo.totalAmount;
                    html = renderInfo.products.map(function (element) {
                        return ("<tr>\n            <td><img class=\"table__image\" src=\"" + element.picture + "\" alt=\"\"></td>\n            <td>" + element.name + "</td> \n            <td>" + element.description + "</td>\n            <td>" + element.quantity + "</td>  \n            <td>$" + element.price + "</td> \n            <td>$" + element.totalPrice + "</td> \n            <td>\n            <i class=\"fas fa-trash table__remove\" onclick='removeFromCart(\"" + element.productId + "\" )' title=\"Remove\"></i>\n            </td>\n            </tr>");
                    }).join('');
                    table.innerHTML = html;
                    finalAmount = document.querySelector('#finalAmount');
                    if (!finalAmount)
                        throw new Error('There is a problem finding the total amount from the HTML');
                    finalAmount.innerHTML = "TOTAL AMOUNT: $" + totalAmount;
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getInformationToRender() {
    return __awaiter(this, void 0, void 0, function () {
        var cartInfo, totalAmount, userCart, productInfo, _loop_1, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/cart/infoCart/" + cartId)];
                case 1:
                    cartInfo = _a.sent();
                    totalAmount = cartInfo.data.userCart.totalAmount;
                    if (totalAmount === 0) {
                        buttonPurchase.disabled = true;
                    }
                    userCart = cartInfo.data.userCart;
                    return [4 /*yield*/, axios.get("/products/allProducts/")];
                case 2:
                    productInfo = _a.sent();
                    _loop_1 = function (index) {
                        var elementt = userCart.products[index];
                        productInfo.data.allProducts.products.forEach(function (element) {
                            if (element.uuid === elementt.productId) {
                                Object.assign(userCart.products[index], element);
                            }
                        });
                    };
                    //Add the information of the product to the userCart
                    for (index = 0; index < userCart.products.length; index++) {
                        _loop_1(index);
                    }
                    ;
                    return [2 /*return*/, userCart];
            }
        });
    });
}
//Function to remove a product from the cart
function removeFromCart(productId) {
    try {
        swal({
            title: "Are you sure?",
            text: "It would be a shame to delete this amazing product!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(function (willDelete) {
            if (willDelete) {
                deleteItem(productId);
            }
            else {
                swal("Your product is safe!");
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function deleteItem(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var productDelete, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios["delete"]("/cart/deleteProduct/" + productId + "/" + cartId)];
                case 1:
                    productDelete = _a.sent();
                    swal(productDelete.data.message, {
                        icon: "success"
                    });
                    renderCart();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var buttonPurchase = document.querySelector('#purchase');
buttonPurchase.addEventListener('click', doPurchase);
function doPurchase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            swal({
                title: "Last question!",
                text: "Do you want to continue buying or purchase your items?",
                icon: "info",
                buttons: ["Continue buying", "Prepare my products!"]
            }).then(function (goToCart) {
                if (goToCart) {
                    purchase();
                    window.location.href = "./index.html";
                }
            });
            return [2 /*return*/];
        });
    });
}
function purchase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("/cart/purchase", { cartId: cartId })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
