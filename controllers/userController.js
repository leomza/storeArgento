"use strict";
exports.__esModule = true;
exports.login = exports.findUsername = exports.registerUser = void 0;
//I import the classes (with Methods) of the Models that Im going to use here
var userModel_1 = require("../models/userModel");
function registerUser(req, res) {
    try {
        //Get the information from the body
        var _a = req.body, username = _a.username, email = _a.email, password = _a.password, role = _a.role;
        //Initialice a new instance of the User
        var user = new userModel_1.User(username, email, password, role);
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        var allUsers = new userModel_1.Users();
        var emailExist = allUsers.createUser(user);
        if (!emailExist) {
            res.send({ message: "A new User was added", user: user });
        }
        else {
            res.send({ message: "Email already registered, please try a different email address!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.registerUser = registerUser;
function findUsername(req, res) {
    try {
        var email = req.params.email;
        var allUsers = new userModel_1.Users();
        var username = allUsers.findUsername(email);
        res.send({ message: "Username was found", username: username });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.findUsername = findUsername;
function login(req, res) {
    try {
        var _a = req.body, email = _a.email, password = _a.password;
        var allUsers = new userModel_1.Users();
        var userExists = allUsers.loginUser(email, password);
        if (userExists) {
            res.send({ message: "Logged in successfully", userExists: true });
        }
        else {
            res.send({ message: "Username or password are wrong, please try again!", userExists: false });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}
exports.login = login;
