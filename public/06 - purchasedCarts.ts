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
            return (
                `<tr>
            <td>${purchaseDate}</td>
            <td>${element.userEmail}</td> 
            <td>${createDate}</td>
            <td>${element.products.length}</td>  
            <td>$${element.totalAmount}</td> 
            </tr>`
            );
        }).join('');
        table.innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

//Get the information of the purchased carts
async function getInformationToRender() {
    const infoPurchaseCarts = await axios.get(`/cart/allPurchase/`);
    return infoPurchaseCarts.data.purchasedCarts;
}

//Conver the date, so its going to be readable
function convertDate(date) {
    const hoy = new Date(date);
    return hoy.toLocaleDateString();
}