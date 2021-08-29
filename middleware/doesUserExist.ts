export { };

import { Users } from '../models/userModel';

export function doesUserExistRegister(req, res, next) {
    try {
        const { email, username, role } = req.body;
        //Get all users to see if the user already exist
        const allUsers = new Users();
        allUsers.users;
        const userExist = allUsers.findUser(email);
        if (userExist) {
            res.status(400).send('User already exist');
            return;
        }
        req.username = username;
        req.role = role;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function doesUserExistLogin(req, res, next) {
    try {
        const { email } = req.body;
        //Get all users to see if the user exist
        const allUsers = new Users();
        const userExist = allUsers.findUser(email);
        if (!userExist) {
            res.status(400).send(`User doesn't exist`);
            return;
        }
        req.username = userExist.username;
        req.role = userExist.role;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}