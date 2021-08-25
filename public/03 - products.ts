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
    if (rolUser === 'admin') {
        buttonCreateProduct.style.display = 'flex';
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
        renderProducts();
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
async function renderProducts(): Promise<void> {
    try {
        const root: HTMLElement = document.querySelector('#root');
        const productsCreated = await axios.get(`/products/allProducts`);
        let html: any = '';
        const { products } = productsCreated.data.allProducts;

        if (rolUser === 'admin') {
            html = products.map(element => {
                return (
                    `<div class="product__item__wrapper">
                    <img onclick="redirectDetailsProduct('${element.uuid}')" class="product__item__image" src = "${element.picture}" alt = "">
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
            html = products.map(element => {
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
                    <input id="item${element.uuid}" class="product__item__quantity" type="number" name="quantity" value="1">
                    </div>
                    </div>`
                )
            }).join('');
        }
        if (!html) throw new Error('An error happens when you want to render the products!')
        root.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

//Function to add products into the cart
async function addToCart(productId) {
    try {
        const itemQuantity = document.querySelector(`#item${productId}`)
        const quantity = itemQuantity.value;
        await axios.post(`/cart/addCart/`, { quantity, productId, cartId });
        swal({
            title: "Product added to your cart!",
            text: "Do you want to continue buying or see your cart!",
            icon: "success",
            buttons: true,
            dangerMode: false,
        }).then((goToCart) => {
            if (goToCart) {
                swal("Redirect to the cart HERE", {
                    icon: "success",
                });
            }
        });
    } catch (error) {
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


try {
    const buttonCheckout = document.getElementById('proceedCart');
    buttonCheckout.addEventListener('click', redirectCheckout);

} catch (error) {
    console.error(error);
}

//Function when you click redirect to other page to see the cart and checkout
function redirectCheckout() {
    try {
        window.location.href = `./05 - cartList.html?cartId=${cartId}`;
    } catch (error) {
        console.error(error);
    }
};
