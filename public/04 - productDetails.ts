//Get the UUID from the URL
const url_string = window.location.href;
const url = new URL(url_string);
const uuidProduct = url.searchParams.get("uuid");

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
                <div class="product__item__information__wrapper">
                <div><b>${productInfo.name.toUpperCase()} </b></div>
                </div>
                <div class="product__item__information">
                <div><b>$${productInfo.price} </b></div>
                <div>Stock: <b>${productInfo.stock} </b></div>
                </div>
                <div class="product__item__options">
                <i class="fas fa-trash-alt button--pointer" onclick="deleteProduct('${productInfo.uuid}')"></i>
                <i class="fas fa-edit button--pointer" onclick="editProduct('${productInfo.uuid}', '${productInfo.name}', '${productInfo.description}', '${productInfo.picture}', '${productInfo.price}', '${productInfo.stock}')"></i>
                </div>
                </div>`
    } catch (error) {
        console.error(error);
    }
}

//Delete a product
async function deleteProduct(id) {
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
        const productDelete = await axios.delete(`/products/deleteProduct/${id}`);
        swal(productDelete.data.message, {
            icon: "success",
        });
        location.href = `./03- products.html`;
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
                    <input type="number" name="price" value="${price}" placeholder="Product price" required>
                </div>

                <div class="form__wrapper">
                    <input type="number" name="stock" value="${stock}" placeholder="Product stock" required>
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