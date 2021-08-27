//Get the UUID from the URL
const url_string = window.location.href;
const url = new URL(url_string);
const uuidProduct = url.searchParams.get("uuid");
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
    const root = document.querySelector('#nameUser');

    async function renderUserDetails() {
        const userDetails = await axios.get('/user/info');
        const { username, role } = userDetails.data.userInfo;
        const toRender = `<h1>Wish more <span class="nameUser__title">${username}s</span></h1>`
        root.innerHTML = toRender;

        //With this I will set the role of the user that is logged in (I will use this to manage the DOM in the client side, also in the server side I will do validation through cookies with role)
        rolUser = role;
    };
} catch (error) {
    console.error(error);
}

//I render the detail of the product
async function renderProduct(): Promise<void> {
    try {
        const root: HTMLElement = document.querySelector('#root');
        const productDetail = await axios.get(`/products/productDetail/${uuidProduct}`);
        const { productInfo } = productDetail.data;

        if (!productInfo.picture) {
            productInfo.picture = 'img/logoLosArgento.png';
        }

        root.innerHTML =
            `<div class="product__item__wrapper">
                <img class="product__item__image" src = "${productInfo.picture}" alt = "">
                <div class="product__item__information__wrapper description">
                <div><b>${productInfo.name.toUpperCase()} </b></div>
                <div>${productInfo.description}</div>
                </div>
                <div class="product__item__information">
                <div><b>$${productInfo.price} </b></div>
                <div id="stockProduct">Stock: <b>${productInfo.stock} </b></div>
                </div>
                <div class="product__item__options" id="editArea">
                <i class="fas fa-trash-alt button--pointer" onclick="deleteProduct('${productInfo.uuid}')"></i>
                <i class="fas fa-edit button--pointer" onclick="editProduct('${productInfo.uuid}', '${productInfo.name}', '${productInfo.description}', '${productInfo.picture}', '${productInfo.price}', '${productInfo.stock}')"></i>
                </div>
                </div>`;

        manageDOMAccordingRol();
    } catch (error) {
        console.error(error);
    }
}

//Function to manage the rol according the rol
function manageDOMAccordingRol() {
    const editArea = document.getElementById('editArea');
    const stockProduct = document.getElementById('stockProduct');

    if (rolUser === 'admin') {
        editArea.style.display = 'flex';
        stockProduct.style.display = 'flex';
    } else {
        editArea.style.display = 'none';
        stockProduct.style.display = 'none';
    }
}

//Delete a product
function deleteProduct(id) {
    try {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteItem(id);
                } else {
                    swal("Your product is safe!");
                }
            });
    } catch (error) {
        console.error(error);
    }
}

async function deleteItem(id) {
    try {
        await axios.delete(`/products/deleteProduct/${id}`);
        location.href = `./03 - products.html`;
        renderProducts();
    } catch (error) {
        console.error(error);
    }
}


function editProduct(id, name, description, picture, price, stock) {
    try {
        if (!modalUpload) throw new Error('There is a problem finding modalEdit from HTML');
        modalUpload.style.display = "block";
        modalUpload.classList.add("showModal");

        const formEdit = document.querySelector("#formEdit");
        if (!formEdit) throw new Error('There is a problem finding form from HTML');
        let html = `
        <div class="modalUpload">

        <div class="form__wrapper--edit">
                <h3>Edit product</h3>

                <div class="form__wrapper">
                    <input type="text" name="product" value="${name}" required>
                </div>

                <div class="form__wrapper--image">
                    <input type="file" id="image" name="image" onchange="readURL(this)">
                    <img id="previewImage" src="${picture}">
                </div>

                <div class="form__wrapper">
                    <input type="text" name="description" value="${description}" placeholder="Product description" required>
                </div>

                <div class="form__wrapper">
                    <input type="number" name="price" value="${price}" placeholder="Product price" min="1" required>
                </div>

                <div class="form__wrapper">
                    <input type="number" name="stock" value="${stock}" placeholder="Product stock" min="1" required>
                </div>

            <button class="form__submit--newuser form__wrapper--edit--button" onclick="handleEdit('${id}')">Update product</button>
        </div>
        <div>`
        formEdit.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
};

//Handle Edit
async function handleEdit(idProduct) {
    try {
        let nameProduct = document.querySelector('input[name="product"]').value;
        const pictureProduct: string = document.querySelector('#previewImage').getAttribute("src");
        let descriptionProduct = document.querySelector('input[name="description"]').value;
        let priceProduct = document.querySelector('input[name="price"]').value;
        let stockProduct = document.querySelector('input[name="stock"]').value;

        const productToChange = { nameProduct, pictureProduct, descriptionProduct, priceProduct, stockProduct };
        if (!productToChange) throw new Error("You need to complete all the fields");

        if (!modalUpload) throw new Error('There is a problem finding modalEdit from HTML');
        modalUpload.style.display = "none";

        await axios.put(`/products/updateProduct/${idProduct}`, { productToChange });
        renderProduct();
    } catch (error) {
        console.error(error);
    };
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