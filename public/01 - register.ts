//Handle the form to create a new user:
const handleFormCreate = document.querySelector("#createForm");
handleFormCreate.addEventListener('submit', doingSubmitCreate);
const passwordInput = document.getElementById('passwordInput');
const rePasswordInput = document.getElementById('rePasswordInput');

function changeHTML() {
    if (document.getElementById('checkRole').checked) {
        passwordInput.style.display = "none";
        rePasswordInput.style.display = "none";
    } else {
        passwordInput.style.display = "flex";
        rePasswordInput.style.display = "flex";
    }
}

async function doingSubmitCreate(ev) {
    try {
        ev.preventDefault();
        let { username, email, password, repassword, role } = ev.target.elements
        username = username.value;
        email = email.value;
        password = password.value;
        repassword = repassword.value;
        if (role.checked) {
            role = 'admin';
            password = username + 'Ss12@';
            repassword = username + 'Ss12@';
        } else {
            role = 'user';
        }

        if (!username || !email || !password || !repassword) throw new Error("Please complete all the fields");

        ev.target.reset();

        const userDetails = { username, email, password, repassword, role };
        const userCreated = await axios.post('/user/register', userDetails);
        const { uuid } = userCreated.data.unpurchaseCart;

        if (userCreated.data.user.role === 'user') {
            location.href = `03 - products.html?cartId=${uuid}`;

        } else if (userCreated.data.user.role === 'admin') {
            swal("Thanks to register in Los Argento!", "During the day you will recieve your password by email!", "success").then(() => {
                window.location.href = `./index.html`;
            });
        }
    } catch (error) {
        swal("Ohhh no!", error.response.data, "warning");
        console.error(error);
    }
};