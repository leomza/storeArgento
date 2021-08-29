export { };

const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

//Fluent doesnt validate so I have to validate with AJV
export function validateBody(schema) {
    try {
        return (req, res, next) => {
            //I convert the price and the stock to numbers because when I bring the information using multer everything is a String
            if (req.body.price && req.body.stock) {
                req.body.price = parseInt(req.body.price);
                req.body.stock = parseInt(req.body.stock);
            }
            const valid = ajv.validate(schema, req.body);

            if (!valid) {
                //Get the error in that way to send the error to the DOM
                res.status(400).send(ajv.errors[0]['message']);
                return;
            }
            next();
        };
    } catch (error) {
        console.error(error);
    }
};
