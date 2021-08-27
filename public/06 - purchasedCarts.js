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
//Function to render the data of the user
try {
    var userTitle_1 = document.querySelector('#nameUser');
    function renderUserDetails() {
        return __awaiter(this, void 0, void 0, function () {
            var userDetails, username, toRender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios.get('/user/info')];
                    case 1:
                        userDetails = _a.sent();
                        username = userDetails.data.userInfo.username;
                        toRender = "<h1>See your sells <span class=\"nameUser__title\">" + username + "!</span></h1>";
                        userTitle_1.innerHTML = toRender;
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
//I render all the carts purchase carts from the users
function renderUsersCart() {
    return __awaiter(this, void 0, void 0, function () {
        var table, renderInfo, html, error_1;
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
                    //Sort the array so you will see the lastest at the beginning
                    renderInfo.sort(function (a, b) { return b.purchasedDate - a.purchasedDate; });
                    html = renderInfo.map(function (element) {
                        var purchaseDate = convertDate(element.purchasedDate);
                        var createDate = convertDate(element.createdDate);
                        var pickedStatus = convertPicksToIcons(element.picked);
                        return ("<tr>\n            <td>" + purchaseDate + "</td>\n            <td>" + element.userEmail + "</td> \n            <td>" + createDate + "</td>\n            <td>" + element.products.length + "</td>  \n            <td>$" + element.totalAmount + "</td>\n            <td class=\"fa pick__status\">" + pickedStatus + "</td>\n            <td>\n                <select class=\"form-control fa pick__options\" onchange=\"updateCartStatus(event, '" + element.uuid + "')\" name=\"pickedUp\">\n                    <option class=\"fa pick__options\" value=\"\" selected disabled hidden></option>\n                    <option class=\"fa pick__options--false\" id=\"falsePick\" value=\"false\">&#xf057;</option>\n                    <option class=\"fa pick__options--true\" id=\"truePick\" value=\"true\">&#xf058;</option>    \n                </select>\n            </td> \n            </tr>");
                    }).join('');
                    table.innerHTML = html;
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
//Function to instead of render a word, render an icon in the Table
function convertPicksToIcons(pickedStatus) {
    if (pickedStatus) {
        return '&#xf058;';
    }
    else {
        return '&#xf057;';
    }
}
//Get the information of the purchased carts
function getInformationToRender() {
    return __awaiter(this, void 0, void 0, function () {
        var infoPurchaseCarts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get("/cart/allPurchase/")];
                case 1:
                    infoPurchaseCarts = _a.sent();
                    return [2 /*return*/, infoPurchaseCarts.data.purchasedCarts];
            }
        });
    });
}
//Conver the date, so its going to be readable
function convertDate(date) {
    var hoy = new Date(date);
    return hoy.toLocaleDateString();
}
//Update if the cart was picked up or not
function updateCartStatus(ev, cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var cartStatus, changed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    cartStatus = ev.target.value;
                    //Convert to boolean because in the model is a boolean and I prefer to manage as that
                    if (cartStatus === 'true') {
                        cartStatus = true;
                    }
                    else {
                        cartStatus = false;
                    }
                    return [4 /*yield*/, axios.put("/cart/changeStatus", { cartId: cartId, cartStatus: cartStatus })];
                case 1:
                    changed = _a.sent();
                    swal("Good job!", changed.data.message, "success");
                    renderUsersCart();
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
