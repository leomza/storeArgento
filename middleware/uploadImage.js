"use strict";
exports.__esModule = true;
exports.storage = void 0;
var multer = require("multer");
var uuidv4 = require("uuid").v4;
exports.storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
        cb(null, uuidv4().toString() + "_" + file.originalname);
    }
});
