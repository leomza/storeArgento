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
//Get the UUID from the URL
var url_string = window.location.href;
var url = new URL(url_string);
var uuidProduct = url.searchParams.get("uuid");
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
    var root_1 = document.querySelector('#nameUser');
    function renderUserDetails() {
        return __awaiter(this, void 0, void 0, function () {
            var userDetails, _a, username, role, toRender;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios.get('/user/info')];
                    case 1:
                        userDetails = _b.sent();
                        _a = userDetails.data.userInfo, username = _a.username, role = _a.role;
                        toRender = "<h1>Wish more <span class=\"nameUser__title\">" + username + "s</span></h1>";
                        root_1.innerHTML = toRender;
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
//I render the detail of the product
function renderProduct() {
    return __awaiter(this, void 0, Promise, function () {
        var root, productDetail, productInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    root = document.querySelector('#root');
                    return [4 /*yield*/, axios.get("/products/productDetail/" + uuidProduct)];
                case 1:
                    productDetail = _a.sent();
                    productInfo = productDetail.data.productInfo;
                    if (!productInfo.picture) {
                        productInfo.picture = 'img/logoLosArgento.png';
                    }
                    root.innerHTML =
                        "<div class=\"product__item__wrapper\">\n                <img class=\"product__item__image\" src = \"" + productInfo.picture + "\" alt = \"\">\n                <div class=\"product__item__information__wrapper description\">\n                <div><b>" + productInfo.name.toUpperCase() + " </b></div>\n                <div>" + productInfo.description + "</div>\n                </div>\n                <div class=\"product__item__information\">\n                <div><b>$" + productInfo.price + " </b></div>\n                <div id=\"stockProduct\">Stock: <b>" + productInfo.stock + " </b></div>\n                </div>\n                <div class=\"product__item__options\" id=\"editArea\">\n                <i class=\"fas fa-trash-alt button--pointer\" onclick=\"deleteProduct('" + productInfo.uuid + "')\"></i>\n                <i class=\"fas fa-edit button--pointer\" onclick=\"editProduct('" + productInfo.uuid + "', '" + productInfo.name + "', '" + productInfo.description + "', '" + productInfo.picture + "', '" + productInfo.price + "', '" + productInfo.stock + "')\"></i>\n                </div>\n                </div>";
                    manageDOMAccordingRol();
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
//Function to manage the rol according the rol
function manageDOMAccordingRol() {
    var editArea = document.getElementById('editArea');
    var stockProduct = document.getElementById('stockProduct');
    if (rolUser === 'admin') {
        editArea.style.display = 'flex';
        stockProduct.style.display = 'flex';
    }
    else {
        editArea.style.display = 'none';
        stockProduct.style.display = 'none';
    }
}
//Delete a product
function deleteProduct(id) {
    try {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(function (willDelete) {
            if (willDelete) {
                deleteItem(id);
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
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios["delete"]("/products/deleteProduct/" + id)];
                case 1:
                    _a.sent();
                    location.href = "./03 - products.html";
                    renderProducts();
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
function editProduct(id, name, description, picture, price, stock) {
    try {
        if (!modalUpload)
            throw new Error('There is a problem finding modalEdit from HTML');
        modalUpload.style.display = "block";
        modalUpload.classList.add("showModal");
        var formEdit = document.querySelector("#formEdit");
        if (!formEdit)
            throw new Error('There is a problem finding form from HTML');
        var html = "\n        <div class=\"modalUpload\">\n\n        <div class=\"form__wrapper--edit\">\n                <h3>Edit product</h3>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"product\" value=\"" + name + "\" required>\n                </div>\n\n                <div class=\"form__wrapper--image\">\n                    <input type=\"file\" id=\"image\" name=\"image\" onchange=\"readURL(this)\">\n                    <img id=\"previewImage\" src=\"" + picture + "\">\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"text\" name=\"description\" value=\"" + description + "\" placeholder=\"Product description\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"number\" name=\"price\" value=\"" + price + "\" placeholder=\"Product price\" min=\"1\" required>\n                </div>\n\n                <div class=\"form__wrapper\">\n                    <input type=\"number\" name=\"stock\" value=\"" + stock + "\" placeholder=\"Product stock\" min=\"1\" required>\n                </div>\n\n            <button class=\"form__submit--newuser form__wrapper--edit--button\" onclick=\"handleEdit('" + id + "')\">Update product</button>\n        </div>\n        <div>";
        formEdit.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
;
//Handle Edit
function handleEdit(idProduct) {
    return __awaiter(this, void 0, void 0, function () {
        var nameProduct, pictureProduct, descriptionProduct, priceProduct, stockProduct, productToChange, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    nameProduct = document.querySelector('input[name="product"]').value;
                    pictureProduct = document.querySelector('#previewImage').getAttribute("src");
                    descriptionProduct = document.querySelector('input[name="description"]').value;
                    priceProduct = document.querySelector('input[name="price"]').valueAsNumber;
                    stockProduct = document.querySelector('input[name="stock"]').valueAsNumber;
                    productToChange = { nameProduct: nameProduct, pictureProduct: pictureProduct, descriptionProduct: descriptionProduct, priceProduct: priceProduct, stockProduct: stockProduct };
                    if (!productToChange)
                        throw new Error("You need to complete all the fields");
                    if (!modalUpload)
                        throw new Error('There is a problem finding modalEdit from HTML');
                    modalUpload.style.display = "none";
                    return [4 /*yield*/, axios.put("/products/updateProduct/" + idProduct, { productToChange: productToChange })];
                case 1:
                    _a.sent();
                    renderProduct();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    });
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
