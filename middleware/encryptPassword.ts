export { }

const bcrypt = require('bcrypt');
import { Users } from "../models/userModel";

export function encryptPassword(req, res, next) {
    try {
        const { password, repassword } = req.body;
        if (password !== repassword) {
            res.status(400).send('Passwords are not the same, try again!');
            return;
        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).send('Error encrypting');
                    return;
                } else {
                    req.hashPassword = hash;
                    next();
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export async function decryptPassword(req, res, next) {
    try {
        const { email, password } = req.body;

        //Get the user hash password
        const allUsers = new Users();
        const user = allUsers.findUser(email);

        if (!user) {
            res.status(400).send('The email is not register!');
            return;
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            next();
        } else {
            res.status(400).send('Wrong password, try again!');
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}