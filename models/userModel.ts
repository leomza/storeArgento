export { };
const { v4: uuidv4 } = require("uuid");
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

enum Role {
    user = 'user',
    admin = 'admin'
}

export class User {
    uuid: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    purchasedCarts: Array<string>;
    createdDate: any;

    constructor(username: string, email: string, password: string, role: Role) {
        this.uuid = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
        this.purchasedCarts = [];
        this.role = role;
        this.createdDate = Date.now();
    }
}

export class Users {
    users: Array<User>;

    constructor() {
        this.users = readJsonUsers();
    }

    updateUsersJson() {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        } catch (error) {
            console.error(error);
        }
    }

    createUser(user) {
        try {
            this.users.push(user);
            this.updateUsersJson();
        } catch (error) {
            console.error(error);
        }
    }

    findUser(email) {
        try {
            const userInfo = this.users.find(userElement => userElement.email === email);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }

    findUserById(id) {
        try {
            const userInfo = this.users.find(userElement => userElement.uuid === id);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }
    addPurchasedCart(userInfo, cartId) {
        try {
            userInfo.purchasedCarts.push(cartId);
        } catch (error) {
            console.error(error);
        }
    }
}