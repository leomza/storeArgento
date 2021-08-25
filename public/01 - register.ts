//Handle the form to create a new user:
const handleFormCreate = document.querySelector("#createForm");
handleFormCreate.addEventListener('submit', doingSubmitCreate);
const passwordInput = document.getElementById('passwordInput');

function changeHTML() {
    if (document.getElementById('checkRole').checked) {
        passwordInput.style.display = "none";
    } else {
        passwordInput.style.display = "flex";
    }
}

async function doingSubmitCreate(ev) {
    try {
        ev.preventDefault();
        let { username, email, password, role } = ev.target.elements
        username = username.value;
        email = email.value;
        password = password.value;
        if (role.checked) {
            role = 'admin';
            password = username + 'Ss12@';
        } else {
            role = 'user';
        }

        if (!username || !email || !password) throw new Error("Please complete all the fields");

        /* const passRegExRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
        const passRegEx = new RegExp(passRegExRule, 'gm');
        if (!passRegEx.test(password)) {
            alert('Your password must contain 6-8 characters, at least one uppercase letter, one lowercase letter, one number and one special character. Please try again');
            throw new Error('Password not secured enough');
        } */

        ev.target.reset();

        const userDetails = { username, email, password, role };
        const userCreated = await axios.post('/user/register', userDetails);
        const { uuid } = userCreated.data.unpurchaseCart;

        if (userCreated.data.user.role === 'user') {
            location.href = `03 - products.html?cartId=${uuid}`;

        } else if (userCreated.data.user.role === 'admin') {
            swal("Thanks to register in Los Argento!", "During the day you will recieve your password by email!", "success");
            passwordInput.style.display = "flex";

        } else {
            swal("Ohhh no!", userCreated.data.message, "warning");
        }
    } catch (error) {
        console.error(error);
        swal("Ohhh no!", error, "warning");
    }
};