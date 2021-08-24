export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { User, Users } from "../models/userModel";
import { Product, Cart } from "../models/productModel";

export function registerUser(req, res) {
    try {
        //Get the information from the body
        const { username, email, password, role } = req.body;
        //Initialice a new instance of the User
        const user = new User(username, email, password, role);
        //Initialice a new instance of Users (the initialization will read the JSON of Users)
        const allUsers = new Users();
        const emailExist: boolean = allUsers.createUser(user);
        if (!emailExist) {
            res.send({ message: "A new User was added", user });
        } else {
            res.send({ message: "Email already registered, please try a different email address!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function findUser(req, res) {
    try {
        const { email } = req.params;
        const allUsers = new Users();
        let userInfo;

        //I use req.params from the login and req.email from the cookies 
        if (req.email) {
            userInfo = allUsers.findUser(req.email);
        } else {
            userInfo = allUsers.findUser(email);
        }
        res.send({ message: "Username was found", userInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export function login(req, res) {
    try {
        const { email, password } = req.body;
        const allUsers = new Users();
        const userExists = allUsers.loginUser(email, password);
        if (userExists) {
            res.send({ message: "Logged in successfully", userExists: true });
        } else {
            res.send({ message: "Username or password are wrong, please try again!", userExists: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}