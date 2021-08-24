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
    if (rolUser === 'admin') {
        buttonCreateProduct.style.display = 'flex';
    }
    else {
        buttonCreateProduct.style.display = 'none';
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
                        renderProducts();
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
function renderProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var root, productsCreated, html, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    root = document.querySelector('#root');
                    return [4 /*yield*/, axios.get("/products/allProducts")];
                case 1:
                    productsCreated = _a.sent();
                    html = '';
                    products = productsCreated.data.allSurveys.products;
                    if (rolUser === 'admin') {
                        html = products.map(function (element) {
                            return ("<div class=\"product__item__wrapper\">\n                    <img onclick=\"detailsProduct('" + element.uuid + "')\" class=\"product__item__image\" src = \"" + element.picture + "\" alt = \"\">\n                    <div class=\"product__item__information__wrapper\">\n                    <div><b>" + element.name.toUpperCase() + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <div><b>$" + element.price + " </b></div>\n                    <div>Stock: <b>" + element.stock + " </b></div>\n                    </div>\n                    </div>");
                        }).join('');
                    }
                    else {
                        html = products.map(function (element) {
                            return ("<div class=\"product__item__wrapper\">\n                    <img onclick=\"detailsProduct('" + element.uuid + "')\" class=\"product__item__image\" src = \"" + element.picture + "\" alt = \"\">\n                    <div class=\"product__item__information__wrapper\">\n                    <div><b>" + element.name.toUpperCase() + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <div><b>$" + element.price + " </b></div>\n                    </div>\n                    <div class=\"product__item__information\">\n                    <button class=\"product__item__cart\" onclick=\"addToCart('" + element.uuid + "')\">Add to cart</button>\n                    <input id=\"item" + element.uuid + "\" class=\"product__item__quantity\" type=\"number\" name=\"quantity\" value=\"1\">\n                    </div>\n                    </div>");
                        }).join('');
                    }
                    if (!html)
                        throw new Error('An error happens when you want to render the products!');
                    root.innerHTML = html;
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
//Function to add products into the cart
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var itemQuantity, quantity, itemToCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemQuantity = document.querySelector("#item" + productId);
                    quantity = itemQuantity.value;
                    return [4 /*yield*/, axios.post("/products/addCart/", { quantity: quantity, productId: productId })];
                case 1:
                    itemToCart = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//Function when you click on a Product you will redirect to other page to see all the information of it
function detailsProduct(productId) {
    try {
        window.location.href = "./04 - productDetails.html?uuid=" + productId;
    }
    catch (error) {
        console.error(error);
    }
}
