"use strict";
exports.__esModule = true;
exports.Users = exports.User = void 0;
var fs = require("fs");
var path = require("path");
var usersJsonPath = path.resolve(__dirname, "./users.json");
//Function to read the JSON of created users
var readJsonUsers = function () {
    try {
        var users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    }
    catch (error) {
        console.error(error);
    }
};
var Role;
(function (Role) {
    Role["user"] = "user";
    Role["admin"] = "admin";
})(Role || (Role = {}));
var User = /** @class */ (function () {
    function User(username, email, password, role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.purchasedCarts = [];
        this.role = role;
        this.createdDate = Date.now();
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
        this.users = readJsonUsers();
    }
    Users.prototype.updateUsersJson = function () {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.createUser = function (user) {
        try {
            //Search if the user exist
            var userExist = this.users.findIndex(function (userElement) { return userElement.email === user.email; });
            if (userExist !== -1) {
                // The user exist
                return true;
            }
            else {
                // The user doesn't exist
                this.users.push(user);
                this.updateUsersJson();
                return false;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.findUser = function (email) {
        try {
            var userInfo = this.users.find(function (userElement) { return userElement.email === email; });
            if (userInfo) {
                return userInfo;
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    Users.prototype.loginUser = function (email, password) {
        try {
            var userInfo = this.users.find(function (userElement) { return userElement.email === email && userElement.password === password; });
            if (userInfo) {
                return userInfo;
            }
            else {
                return undefined;
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return Users;
}());
exports.Users = Users;
