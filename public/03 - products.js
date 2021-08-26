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
                        toRender = "<h1>Welcome <span class=\"nameUser__title\">" + username + "!</span></h1>";
                        userTitle_1.innerHTML = toRender;
                        //With this I will set the role of the user that is logged in (I will use this to manage the DOM in the client side, also in the server side I will do validation through cookies with role)
                        rolUser = role;
                        manageDOMAccordingRol();
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
//Function to manage the rol according the rol
function manageDOMAccordingRol() {
    var buttonCreateProduct = document.getElementById('buttonCreate');
    var buttonProceedCart = document.getElementById('proceedCart');
    var buttonPurchasedCarts = document.getElementById('purchasedCarts');
    if (rolUser === 'admin') {
        buttonCreateProduct.style.display = 'flex';
        buttonPurchasedCarts.style.display = 'flex';
    }
    else {
        buttonProceedCart.style.display = 'flex';
    }
}
//Function to add a new product
try {
    var createProduct = document.querySelector('#product-form');
    createProduct.addEventListener('submit', addProduct);
    function addProduct(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, product, description, price, stock, image, newProduct, productInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ev.preventDefault();
                        _a = ev.target.elements, product = _a.product, description = _a.description, price = _a.price, stock = _a.stock;
                        product = product.value;
                        description = description.value;
                        price = price.value;
                        stock = stock.value;
                        image = document.querySelector('#previewImage').getAttribute("src");
                        if (!product || !description || !price || !stock)
                            throw new Error("Please complete all the fields");
                        ev.target.reset();
                        newProduct = { product: product, description: description, price: price, stock: stock, image: image };
                        return [4 /*yield*/, axios.post("/products/newProduct/", { newProduct: newProduct })];
                    case 1:
                        productInfo = _b.sent();
                        modalUpload.style.display = "none";
                        swal("Good job!", productInfo.data.message, "success");
                        document.querySelector('#previewImage').setAttribute('src', 'img/logoLosArgento.png');
                        renderProducts(null);
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
;
//Function to show the previous image in the form:
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                document.querySelector('#previewImage').setAttribute("src", "" + e.target.result);
            }
            catch (error) {
                console.error(error);
            }
            return e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
//I render all the products
function renderProducts(productsToShow) {
    return __awaiter(this, void 0, Promise, function () {
        var root, html, productsInfo, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    root = document.querySelector('#root');
                    root.classList.remove('error__message');
                    html = '';
                    if (!!productsToShow) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios.get("/products/allProducts")];
                case 1:
                    productsInfo = _a.sent();
                    products = productsInfo.data.allProducts.products;
                    productsToShow = products;
                    _a.label = 2;
                case 2:
                    if (rolUser === 'admin') {
                        html = productsToShow.map(function (element) {
                            return ("<div class=\"product__item__wrapper\">\n                    <img onclick=\"redirectDetailsProduct('" + element.uuid + "')\" class=\"product__item__image image--clickeable\" src = \"" + element.picture + "\" alt = \"\">\n                    <div class=\"product__item__information__wrapper\">\n                    <div><b>" + element.name.toUpperCase() + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <div><b>$" + element.price + " </b></div>\n                    <div>Stock: <b>" + element.stock + " </b></div>\n                    </div>\n                    </div>");
                        }).join('');
                    }
                    else {
                        html = productsToShow.map(function (element) {
                            return ("<div class=\"product__item__wrapper\">\n                    <img onclick=\"redirectDetailsProduct('" + element.uuid + "')\" class=\"product__item__image image--clickeable\" src = \"" + element.picture + "\" alt = \"\">\n                    <div class=\"product__item__information__wrapper\">\n                    <div><b>" + element.name.toUpperCase() + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <div><b>$" + element.price + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <button class=\"product__item__cart\" onclick=\"addToCart('" + element.uuid + "')\">Add to cart</button>\n                    <input id=\"item" + element.uuid + "\" class=\"product__item__quantity\" type=\"number\" name=\"quantity\" value=\"1\" min=\"1\">\n                    </div>\n                    </div>");
                        }).join('');
                    }
                    root.innerHTML = html;
                    if (!html) {
                        root.innerHTML = 'Product not found';
                        root.classList.add('error__message');
                    }
                    ;
                    if (rolUser === 'user') {
                        showNumberProducts();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Add in the DOM the number of products that the user is buying
function showNumberProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var numberProducts, userCart, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    numberProducts = document.getElementById('productsNumber');
                    return [4 /*yield*/, axios.get("/cart/infoCart/" + cartId)];
                case 1:
                    userCart = _a.sent();
                    numberProducts.innerHTML = userCart.data.userCart.products.length;
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
//Function to add products into the cart
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var itemQuantity, quantity, userCart, numberProducts, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    itemQuantity = document.querySelector("#item" + productId);
                    quantity = itemQuantity.value;
                    return [4 /*yield*/, axios.post("/cart/addCart/", { quantity: quantity, productId: productId, cartId: cartId })];
                case 1:
                    userCart = _a.sent();
                    numberProducts = document.getElementById('productsNumber');
                    numberProducts.innerHTML = userCart.data.userCart.products.length;
                    swal({
                        title: "Product added to your cart!",
                        text: "Do you want to continue buying or going to your cart?",
                        icon: "success",
                        buttons: ["Continue buying", "Proceed to cart"]
                    }).then(function (goToCart) {
                        if (goToCart) {
                            window.location.href = "./05 - cartList.html?cartId=" + cartId;
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    swal("Ohhh no!", "" + error_3.response.data, "warning");
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//Function when you click on a Product you will redirect to other page to see all the information of it
function redirectDetailsProduct(productId) {
    try {
        if (rolUser === 'admin') {
            window.location.href = "./04 - productDetails.html?uuid=" + productId;
        }
        else {
            window.location.href = "./04 - productDetails.html?uuid=" + productId + "&cartId=" + cartId;
        }
    }
    catch (error) {
        console.error(error);
    }
}
;
//Function when you click redirect to other page to see the cart and checkout
var buttonCheckout = document.getElementById('proceedCart');
buttonCheckout.addEventListener('click', redirectCheckout);
function redirectCheckout() {
    try {
        window.location.href = "./05 - cartList.html?cartId=" + cartId;
    }
    catch (error) {
        console.error(error);
    }
}
;
//Function to do a filter in the search input
function handleSearch() {
    return __awaiter(this, void 0, void 0, function () {
        var searchProduct, regEx, searching_1, productsCreated, productsFiltered, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    searchProduct = document.querySelector('#search');
                    regEx = searchProduct.value;
                    searching_1 = new RegExp(regEx, 'i');
                    return [4 /*yield*/, axios.get("/products/allProducts")];
                case 1:
                    productsCreated = _a.sent();
                    productsFiltered = productsCreated.data.allProducts.products.filter(function (product) { return searching_1.test(product.name); });
                    renderProducts(productsFiltered);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
