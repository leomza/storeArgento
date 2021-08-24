export { }

//Require the package
const nodemailer = require('nodemailer');

export function sendEmail(req, res, next) {
    const { username, email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'storeargento4@gmail.com',
            pass: 'Store123'
        }
    });

    const mensaje = `<div>
                    <h1>Welcome to "Los Argento"</h1>
                    <p>It's amazing to have you as an administrator! 😁</p>
                    <p><b>REMEMBER THAT TO ENTER IN YOUR ACCOUNT YOUR PASSWORD IS: ${username}Ss12@ </b></p>
                    </div>`;

    const mailOptions = {
        from: '"Los Argento"',
        to: `${email}`,
        subject: 'Welcome to "Los Argento"',
        text: mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log('Email sended: ' + info.response);
            next();
        }
    });
}