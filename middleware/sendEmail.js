"use strict";
exports.__esModule = true;
exports.sendEmail = void 0;
//Require the package
var nodemailer = require('nodemailer');
function sendEmail(req, res, next) {
    if (req.role === 'admin') {
        var _a = req.body, username = _a.username, email = _a.email;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'storeargento4@gmail.com',
                pass: 'Store123'
            }
        });
        var mensaje = "<div>\n                        <h1>Welcome to \"Los Argento\"</h1>\n                        <p>It's amazing to have you as an administrator! \uD83D\uDE01</p>\n                        <p><b>REMEMBER THAT TO ENTER IN YOUR ACCOUNT YOUR PASSWORD IS: " + username + "Ss12@ </b></p>\n                        </div>";
        var mailOptions = {
            from: '"Los Argento"',
            to: "" + email,
            subject: 'Welcome to "Los Argento"',
            html: mensaje
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                console.log('Email sended: ' + info.response);
                next();
            }
        });
    }
    else {
        next();
    }
}
exports.sendEmail = sendEmail;
