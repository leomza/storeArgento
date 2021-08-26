//Get the UUID from the cart in the URL
const url_string = window.location.href;
const url = new URL(url_string);
const cartId = url.searchParams.get("cartId");

//This variable will determinate the rol of the User in the client side
let rolUser;

//Function to render the data of the user
try {
    const userTitle = document.querySelector('#nameUser');

    async function renderUserDetails() {
        const userDetails = await axios.get('/user/info');
        const { username, role } = userDetails.data.userInfo;
        const toRender = `<h1>Welcome <span class="nameUser__title">${username}!</span></h1>`
        userTitle.innerHTML = toRender;
        //With this I will set the role of the user that is logged in (I will use this to manage the DOM in the client side, also in the server side I will do validation through cookies with role)
        rolUser = role;
        manageDOMAccordingRol();
    };
} catch (error) {
    console.error(error);
}

//Function to manage the rol according the rol
function manageDOMAccordingRol() {
    const buttonCreateProduct = document.getElementById('buttonCreate');
    const buttonProceedCart = document.getElementById('proceedCart');
    const buttonPurchasedCarts = document.getElementById('purchasedCarts');

    if (rolUser === 'admin') {
        buttonCreateProduct.style.display = 'flex';
        buttonPurchasedCarts.style.display = 'flex';
    } else {
        buttonProceedCart.style.display = 'flex';
    }
}

//Function to add a new product
try {
    const createProduct = document.querySelector('#product-form');
    createProduct.addEventListener('submit', addProduct);

    async function addProduct(ev) {
        ev.preventDefault();
        let { product, description, price, stock } = ev.target.elements;
        product = product.value;
        description = description.value;
        price = price.value;
        stock = stock.value;
        const image: string = document.querySelector('#previewImage').getAttribute("src");
        if (!product || !description || !price || !stock)
            throw new Error("Please complete all the fields");
        ev.target.reset();

        const newProduct = { product, description, price, stock, image };
        const productInfo = await axios.post(`/products/newProduct/`, { newProduct });
        modalUpload.style.display = "none";
        swal("Good job!", productInfo.data.message, "success");
        document.querySelector('#previewImage').setAttribute('src', 'img/logoLosArgento.png');
        renderProducts(null);
    };

} catch (error) {
    console.error(error);
};

//Function to show the previous image in the form:
function readURL(input): void {
    if (input.files && input.files[0]) {
        let reader: FileReader = new FileReader();

        reader.onload = (e) => {
            try {
                document.querySelector('#previewImage').setAttribute("src", `${e.target.result}`);
            } catch (error) {
                console.error(error);
            }
            return e.target.result
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//I render all the products
async function renderProducts(productsToShow): Promise<void> {
    try {
        const root: HTMLElement = document.querySelector('#root');
        root.classList.remove('error__message')
        let html: any = '';

        if (!productsToShow) {
            const productsInfo = await axios.get(`/products/allProducts`);
            const { products } = productsInfo.data.allProducts;
            productsToShow = products;
        }

        if (rolUser === 'admin') {
            html = productsToShow.map(element => {
                return (
                    `<div class="product__item__wrapper">
                    <img onclick="redirectDetailsProduct('${element.uuid}')" class="product__item__image image--clickeable" src = "${element.picture}" alt = "">
                    <div class="product__item__information__wrapper">
                    <div><b>${element.name.toUpperCase()} </b></div>
                    </div>
                    <div class="product__item__information">
                    <div><b>$${element.price} </b></div>
                    <div>Stock: <b>${element.stock} </b></div>
                    </div>
                    </div>`
                )
            }).join('');
        } else {
            html = productsToShow.map(element => {
                return (
                    `<div class="product__item__wrapper">
                    <img onclick="redirectDetailsProduct('${element.uuid}')" class="product__item__image image--clickeable" src = "${element.picture}" alt = "">
                    <div class="product__item__information__wrapper">
                    <div><b>${element.name.toUpperCase()} </b></div>
                    </div>
                    <div class="product__item__information">
                    <div><b>$${element.price} </b></div>
                    </div>
                    <div class="product__item__information">
                    <button class="product__item__cart" onclick="addToCart('${element.uuid}')">Add to cart</button>
                    <input id="item${element.uuid}" class="product__item__quantity" type="number" name="quantity" value="1" min="1">
                    </div>
                    </div>`
                )
            }).join('');
        }
        root.innerHTML = html;

        if (!html) {
            root.innerHTML = 'Product not found';
            root.classList.add('error__message')
        };
        
        if (rolUser === 'user') {
            showNumberProducts();
        }

    } catch (error) {
        console.error(error);
    }
}

//Add in the DOM the number of products that the user is buying
async function showNumberProducts() {
    try {
        const numberProducts = document.getElementById('productsNumber');
        const userCart = await axios.get(`/cart/infoCart/${cartId}`);
        numberProducts.innerHTML = userCart.data.userCart.products.length;
    } catch (error) {
        console.error(error);
    }
}

//Function to add products into the cart
async function addToCart(productId) {
    try {
        const itemQuantity = document.querySelector(`#item${productId}`)
        const quantity = itemQuantity.value;
        const userCart = await axios.post(`/cart/addCart/`, { quantity, productId, cartId });

        //Add in the DOM the number of products that the user is buying (I have this when I render the products, buy if I change something and not render I will net to change the number in the DOM as well)
        const numberProducts = document.getElementById('productsNumber');
        numberProducts.innerHTML = userCart.data.userCart.products.length;
        swal({
            title: "Product added to your cart!",
            text: "Do you want to continue buying or going to your cart?",
            icon: "success",
            buttons: ["Continue buying", "Proceed to cart"],
        }).then((goToCart) => {
            if (goToCart) {
                window.location.href = `./05 - cartList.html?cartId=${cartId}`;
            }
        });
    } catch (error) {
        swal("Ohhh no!", `${error.response.data}`, "warning");
        console.error(error);
    }
}

//Function when you click on a Product you will redirect to other page to see all the information of it
function redirectDetailsProduct(productId) {
    try {
        if (rolUser === 'admin') {
            window.location.href = `./04 - productDetails.html?uuid=${productId}`;
        } else {
            window.location.href = `./04 - productDetails.html?uuid=${productId}&cartId=${cartId}`;
        }
    } catch (error) {
        console.error(error);
    }
};

//Function when you click redirect to other page to see the cart and checkout
const buttonCheckout = document.getElementById('proceedCart');
buttonCheckout.addEventListener('click', redirectCheckout);
function redirectCheckout() {
    try {
        window.location.href = `./05 - cartList.html?cartId=${cartId}`;
    } catch (error) {
        console.error(error);
    }
};

//Function to do a filter in the search input
async function handleSearch() {
    try {
        const searchProduct: any = document.querySelector('#search');
        const regEx: string = searchProduct.value;
        const searching: RegExp = new RegExp(regEx, 'i');
        const productsCreated = await axios.get(`/products/allProducts`);
        const productsFiltered = productsCreated.data.allProducts.products.filter(product => searching.test(product.name));
        renderProducts(productsFiltered);
    } catch (error) {
        console.error(error);
    };
};