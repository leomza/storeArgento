// Get the modal
const modalUpload = document.getElementById("modalProduct");

// Get the button that opens the modal
const buttonCreate = document.getElementById("buttonCreate");

// Get the <span> element that closes the modal
const closeUpload = document.getElementById("closeModal");

// When the user clicks the button, open the modal
if (buttonCreate){
buttonCreate.addEventListener('click', openModal);
}

function openModal() {
    try {
        modalUpload.style.display = "block";
        modalUpload.classList.add("showModal");
    } catch (error) {
        console.error(error);
    };
};

// When the user clicks on <span> (x), close the modal
closeUpload.addEventListener('click', closeModal);

function closeModal() {
    try {
        modalUpload.style.display = "none";
    } catch (error) {
        console.error(error);
    };
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    try {
        if (event.target === modalUpload) {
            modalUpload.style.display = "none";
        }
    } catch (error) {
        console.error(error);
    };
};