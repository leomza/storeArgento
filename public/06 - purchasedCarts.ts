//Function to render the data of the user
try {
    const userTitle = document.querySelector('#nameUser');

    async function renderUserDetails() {
        const userDetails = await axios.get('/user/info');
        const { username } = userDetails.data.userInfo;
        const toRender = `<h1>See your sells <span class="nameUser__title">${username}!</span></h1>`
        userTitle.innerHTML = toRender;
    };
} catch (error) {
    console.error(error);
}

//I render all the carts purchase carts from the users
async function renderUsersCart() {
    try {
        const table: HTMLElement = document.querySelector('.table');
        if (!table) throw new Error('There is a problem finding table from HTML');

        const renderInfo = await getInformationToRender();

        //Sort the array so you will see the lastest at the beginning
        renderInfo.sort((a, b) => b.purchasedDate - a.purchasedDate)
        let html: string = renderInfo.map(element => {
            const purchaseDate = convertDate(element.purchasedDate);
            const createDate = convertDate(element.createdDate);
            const pickedStatus = convertPicksToIcons(element.picked);
            return (
                `<tr>
            <td>${purchaseDate}</td>
            <td>${element.userEmail}</td> 
            <td>${createDate}</td>
            <td>${element.products.length}</td>  
            <td>$${element.totalAmount}</td>
            <td class="fa pick__status">${pickedStatus}</td>
            <td>
                <select class="form-control fa pick__options" onchange="updateCartStatus(event, '${element.uuid}')" name="pickedUp">
                    <option class="fa pick__options" value="" selected disabled hidden></option>
                    <option class="fa pick__options--false" id="falsePick" value="false">&#xf057;</option>
                    <option class="fa pick__options--true" id="truePick" value="true">&#xf058;</option>    
                </select>
            </td> 
            </tr>`
            );
        }).join('');

        table.innerHTML = html;

    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
}

//Function to instead of render a word, render an icon in the Table
function convertPicksToIcons(pickedStatus) {
    if (pickedStatus) {
        return '&#xf058;'
    } else {
        return '&#xf057;'
    }
}

//Get the information of the purchased carts
async function getInformationToRender() {
    const infoPurchaseCarts = await axios.get(`/cart/allPurchase/`);
    return infoPurchaseCarts.data.purchasedCarts;
}

//Conver the date, so its going to be readable
function convertDate(date) {
    const today = new Date(date);
    return today.toLocaleDateString();
}

//Update if the cart was picked up or not
async function updateCartStatus(ev, cartId) {
    try {
        let cartStatus = ev.target.value;
        //Convert to boolean because in the model is a boolean and I prefer to manage as that
        if (cartStatus === 'true') {
            cartStatus = true;
        } else {
            cartStatus = false;
        }
        const changed = await axios.put(`/cart/changeStatus`, { cartId, cartStatus });
        swal("Good job!", changed.data.message, "success");
        renderUsersCart()
    } catch (error) {
        console.error(error);
    }
}