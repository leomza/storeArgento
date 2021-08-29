export { };

const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

//Fluent doesnt validate so I have to validate with AJV
export function validateBody(schema) {

    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            //Get the error in that way to send the error to the DOM
            res.status(400).send(ajv.errors[0]['message']);
            return;
        }
        next();
    };
};
