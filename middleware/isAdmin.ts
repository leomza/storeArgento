export { };

import { Users } from "../models/userModel";

export function isAdmin(req, res, next) {
    try {
        const allUsers = new Users();
        const user = allUsers.findUser(req.email);

        if (user.role === 'admin') { // user is admin
            next();
        } else {
            res.status(401).send('You are not authorized to open this page')
            return;
        };

    } catch (error) {
        res.status(500).send(error.message);
    }
}