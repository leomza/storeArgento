export { };

import { Users } from "../models/userModel";

export function isAdmin(req, res, next) {
    try {
        //req.isAuthorized = false;
        const allUsers = new Users();
        console.log(req.email);
        const userIndex = allUsers.users.findIndex(user => user.email === req.email);
        console.log(userIndex);

        if (userIndex !== -1) { // user exists
            const userRole = allUsers.users[userIndex].role;
            console.log(userRole);
            if (userRole === 'admin') { // check the role if is Admin
                req.isAuthorized = true;
                next();
            }
        } else {
            next();
            res.status(401).send({ isAuthorized: req.isAuthorized, message: 'You are not authorized to open this page.' })
        };

    } catch (error) {
        res.status(500).send(error.message);
    }
}