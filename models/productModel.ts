export { };
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const productsJsonPath = path.resolve(__dirname, "./products.json");

//Function to read the JSON of created products
export const readJsonProducts = () => {
    try {
        const products = fs.readFileSync(productsJsonPath);
        return JSON.parse(products);;
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

export class Products {
    products: Array<Product>;

    constructor() {
        this.products = readJsonProducts();
    }

    updateProductsJson() {
        try {
            fs.writeFileSync(productsJsonPath, JSON.stringify(this.products));
        } catch (error) {
            console.error(error);
        }
    }

    createProducts(product) {
        try {
            this.products.push(product);
            this.updateProductsJson();
        }
        catch (error) {
            console.error(error);
        }
    }

    deleteProduct(id) {
        try {
            this.products = this.products.filter(product => product.uuid !== id);
            this.updateProductsJson();
        } catch (error) {
            console.error(error);
        }
    }

    detailsProduct(id) {
        try {
            const productInfo = this.products.find(product => product.uuid === id);
            return productInfo;
        } catch (error) {
            console.error(error);
        }
    }
}