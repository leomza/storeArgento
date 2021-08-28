"use strict";
exports.__esModule = true;
exports.validateBody = void 0;
var Ajv = require('ajv');
var ajv = new Ajv();
var addFormats = require('ajv-formats');
addFormats(ajv);
//Fluent doesnt validate so I have to validate with AJV
function validateBody(schema) {
    return function (req, res, next) {
        var valid = ajv.validate(schema, req.body);
        if (!valid) {
            //Get the error in that way to send the error to the DOM
            res.status(400).send(ajv.errors[0]['message']);
            return;
        }
        next();
    };
}
exports.validateBody = validateBody;
;
