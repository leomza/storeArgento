export { };

const fs = require("fs");
const path = require("path");
const usersJsonPath = path.resolve(__dirname, "./users.json");

//Function to read the JSON of created users
const readJsonUsers = () => {
    try {
        const users = fs.readFileSync(usersJsonPath);
        return JSON.parse(users);
    } catch (error) {
        console.error(error);
    }
};

export class User {
    username: string;
    email: string;
    password: string;
    purchasedCarts: Array<string>;
    unpurchasedCarts: Array<string>;
    createdDate: any;

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.purchasedCarts = [];
        this.unpurchasedCarts = [];
        this.createdDate = Date.now();
    }
}

export class Users {
    users: Array<User>;

    constructor() {
        this.users = readJsonUsers();
    }
}