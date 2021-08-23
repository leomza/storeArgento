"use strict";
exports.__esModule = true;
exports.isAdmin = void 0;
var userModel_1 = require("../models/userModel");
function isAdmin(req, res, next) {
    try {
        req.isAuthorized = false;
        var allUsers = new userModel_1.Users();
        var userIndex = allUsers.users.findIndex(function (user) { return user.email === req.email; });
        if (userIndex !== -1) { // user exists
            var userRole = allUsers.users[userIndex].role;
            if (userRole === 'admin') { // have password => admin
                req.isAuthorized = true;
            }
        }
        if (req.isAuthorized)
            next();
        else
            res.status(401).send({ isAuthorized: req.isAuthorized, message: 'You are not authorized to open this page.' });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.isAdmin = isAdmin;
