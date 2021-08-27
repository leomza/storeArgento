//Get the UUID from the cart in the URL
const url_string = window.location.href;
const url = new URL(url_string);
const cartId = url.searchParams.get("cartId");

//This variable will determinate the rol of the User in the client side
let rolUser;

//Function to redirect back to the other page
function redirectBack() {
    try {
        window.location.href = `./03 - products.html?cartId=${cartId}`;
    } catch (error) {
        console.error(error);
    }
};

//Function to render the data of the user
try {
    const userTitle = document.querySelector('#nameUser');

    async function renderUserDetails() {
        const userDetails = await axios.get('/user/info');
        const { username, role } = userDetails.data.userInfo;
        const toRender = `<h1>Enjoy your buy <span class="nameUser__title">${username}!</span></h1>`
        userTitle.innerHTML = toRender;
        //With this I will set the role of the user that is logged in (I will use this to manage the DOM in the client side, also in the server side I will do validation through cookies with role)
        rolUser = role;
    };
} catch (error) {
    console.error(error);
}

//I render the cart of the user
async function renderCart(): Promise<void> {
    try {
        const table: HTMLElement = document.querySelector('.table');
        if (!table) throw new Error('There is a problem finding table from HTML');

        const renderInfo = await getInformationToRender();

        const { totalAmount } = renderInfo;

        let html: string = renderInfo.products.map(element => {
            return (
                `<tr>
            <td><img class="table__image" src="${element.picture}" alt=""></td>
            <td>${element.name}</td> 
            <td>${element.description}</td>
            <td>${element.quantity}</td>  
            <td>$${element.price}</td> 
            <td>$${element.totalPrice}</td> 
            <td>
            <i class="fas fa-trash table__remove" onclick='removeFromCart("${element.productId}" )' title="Remove"></i>
            </td>
            </tr>`
            );
        }).join('');
        table.innerHTML = html;

        const finalAmount: HTMLElement = document.querySelector('#finalAmount');
        if (!finalAmount) throw new Error('There is a problem finding the total amount from the HTML');

        finalAmount.innerHTML = `TOTAL AMOUNT: $${totalAmount}`;

    } catch (error) {
        console.error(error);
    }
}

async function getInformationToRender() {
    //Get the information of the cart
    const cartInfo = await axios.get(`/cart/infoCart/${cartId}`);
    let { totalAmount } = cartInfo.data.userCart

    if (totalAmount === 0) {
        buttonPurchase.disabled = true
    }

    const { userCart } = cartInfo.data;

    //Get the information of the products
    const productInfo = await axios.get(`/products/allProducts/`);

    //Add the information of the product to the userCart
    for (let index = 0; index < userCart.products.length; index++) {
        const elementt = userCart.products[index];

        productInfo.data.allProducts.products.forEach(element => {
            if (element.uuid === elementt.productId) {
                Object.assign(userCart.products[index], element);
            }
        });
    };
    return userCart;
}

//Function to remove a product from the cart
function removeFromCart(productId) {
    try {
        swal({
            title: "Are you sure?",
            text: "It would be a shame to delete this amazing product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteItem(productId);
                } else {
                    swal("Your product is safe!");
                }
            });
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(productId) {
    try {
        const productDelete = await axios.delete(`/cart/deleteProduct/${productId}/${cartId}`);
        swal(productDelete.data.message, {
            icon: "success",
        });
        renderCart();
    } catch (error) {
        console.error(error);
    }
}

const buttonPurchase = document.querySelector('#purchase');
buttonPurchase.addEventListener('click', doPurchase);

async function doPurchase() {
    swal({
        title: "Last question!",
        text: "Do you want to continue buying or purchase your items?",
        icon: "info",
        buttons: ["Continue buying", "Prepare my products!"],
    }).then((goToCart) => {
        if (goToCart) {
            purchase();
        }
    });
}

async function purchase() {
    try {
        await axios.post(`/cart/purchase`, { cartId });
        swal("Thank you for your purchase!", "We waiting in our shop form 9 to 21!").then(() => {
            window.location.href = `./index.html`;
        });
    } catch (error) {
        swal("Ohhh no!", `${error.response.data}`, "warning");
        console.error(error);
    }
}