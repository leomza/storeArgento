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

        let html: string = renderInfo.map(element => {
            return (
                `<tr>
            <td><img class="table__image" src="${element.picture}" alt=""></td>
            <td>${element.name}</td> 
            <td>${element.description}</td>
            <td>${element.quantity}</td>  
            <td>$${element.price}</td> 
            <td>$${element.totalPrice}</td> 
            <td>
            <i class="fas fa-edit table__edit" onclick='edit("${element.id}")' title="Edit"></i>
            <i class="fas fa-trash table__remove" onclick='remove("${element.id}", "${element.firstname}")' title="Remove"></i>
            </td>
            </tr>`
            );
        }).join('');
        table.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function getInformationToRender() {
    //Get the information of the cart
    const cartInfo = await axios.get(`/cart/infoCart/${cartId}`);
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
    return userCart.products;
}