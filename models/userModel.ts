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

    updateUsersJson() {
        try {
            fs.writeFileSync(usersJsonPath, JSON.stringify(this.users));
        } catch (error) {
            console.error(error);
        }
    }

    createUser(user) {
        try {
            //Search if the user exist
            const userExist = this.users.findIndex(userElement => userElement.email === user.email);
            if (userExist !== -1) {
                // The user exist
                return true
            } else {
                // The user doesn't exist
                this.users.push(user);
                this.updateUsersJson();
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    findUsername(email) {
        try {
            const userInfo = this.users.find(userElement => userElement.email === email);
            if (userInfo) {
                return userInfo.email;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }

    loginUser(email, password) {
        try {
            const userInfo = this.users.find(userElement => userElement.email === email && userElement.password === password);
            if (userInfo) {
                return userInfo;
            } else {
                return undefined
            }
        } catch (error) {
            console.error(error);
        }
    }
}