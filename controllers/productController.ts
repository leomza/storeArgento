export { };

//I import the classes (with Methods) of the Models that Im going to use here
import { Product, Products } from "../models/productModel";

//Function to create a new Product
export function newProduct(req, res) {
    try {
        //Get the information from the body
        const { product, description, price, stock, image } = req.body.newProduct;
        //Initialice a new instance of the User
        const productInfo = new Product(image, product, description, price, stock);
        //Initialice a new instance of Products (the initialization will read the JSON of Products)
        const allProducts = new Products();
        allProducts.createProducts(productInfo);
        res.send({ message: "A new Product was added", allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

// //Function to get all the created products
export function getAllProducts(req, res) {
    try {
        const allProducts = new Products();
        res.send({ allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

// //Function to remove a product
export function removeProduct(req, res) {
    try {
        const { id } = req.params;
        const allProducts = new Products();
        const productDelete = allProducts.deleteProduct(id);
        res.send({ message: "Poof! Your product has been deleted!", productDelete });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

//Function to get the information of a specific product
export function productDetail(req, res) {
    try {
        const { id } = req.params;
        const allProducts = new Products();
        const productInfo = allProducts.detailsProduct(id);
        res.send({ message: "Details of the product founded", productInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

//Function to edit a product
export function editProduct(req, res) {
    try {
        const { id } = req.params;
        const allProducts = new Products();
        const productToUpdate = allProducts.detailsProduct(id);
        productToUpdate.name = req.body.productToChange.nameProduct;
        productToUpdate.description = req.body.productToChange.descriptionProduct;
        productToUpdate.picture = req.body.productToChange.pictureProduct;
        productToUpdate.price = req.body.productToChange.priceProduct;
        productToUpdate.stock = req.body.productToChange.stockProduct;
        allProducts.updateProductsJson();

        res.send({ message: "The product was edited", allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}