export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const productsJsonPath = path.resolve(__dirname, "./carts.json");

//Function to read the JSON of created carts
export const readJsonCarts = () => {
    try {
        const carts = fs.readFileSync(productsJsonPath);
        return JSON.parse(carts);;
    } catch (error) {
        console.error(error);
    }
};

export class Product {
    uuid: string;
    picture: string;
    name: string;
    description: string;
    price: number;
    stock: number;

    constructor(picture, name, description, price, stock) {
        this.uuid = uuidv4();
        this.picture = picture;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}

export class Cart {
    uuid: string;
    products: Array<Product>;
    createdDate: any;
    purchasedDate: any;

    constructor() {
        this.uuid = uuidv4();
        this.products = [];
        this.createdDate = Date.now();
        this.purchasedDate = null;
    }
}