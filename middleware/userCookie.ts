export { };
import { secret } from './secret';
const jwt = require('jwt-simple');

export function userCookieWrite(req, res, next) {
    try {
        //Get the information from the body
        const { username, email, role } = req.body;

        if (!username || !email || !role) throw new Error("User details processing issues");

        //Here I set the cookie
        const cookieToWrite: string = JSON.stringify({ username, email, role });
        const token = jwt.encode(cookieToWrite, secret);
        //The cookie is going to expire in 30 minutes
        res.cookie("userInfo", token, { maxAge: 1800000, httpOnly: true });

        req.cookieExists = true;
        req.username = username;
        req.email = email;
        req.role = role;
        //"Next" means that I will continue with the Route
        next();

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function userCookieRead(req, res, next) {
    try {
        const { userInfo } = req.cookies;

        if (userInfo) {
            const decoded = jwt.decode(userInfo, secret);
            const cookie = JSON.parse(decoded);
            const { username, email, role } = cookie;
            req.username = username;
            req.email = email;
            req.role = role;

            next();
        } else {
            req.cookieExists = false;
            res.status(401).send({ cookieExist: req.cookieExists, message: 'The session has expired. Please log in again.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}