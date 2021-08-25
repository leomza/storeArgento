//Handle the form to login an existing user:
const handleFormCreate = document.querySelector("#existingForm");
handleFormCreate.addEventListener('submit', doingSubmitLogin);

async function doingSubmitLogin(ev) {
    try {
        ev.preventDefault();
        let { email, password } = ev.target.elements
        email = email.value;
        password = password.value;
        if ((!email) || (!password)) throw new Error("Please complete all the fields");
        ev.target.reset();
        //Get the role of the user
        const userLoginUsername = await axios.get(`/user/username/${email}`);

        if (!userLoginUsername.data.userInfo) throw new Error('Could not find the user');
        const { username, role } = userLoginUsername.data.userInfo;
        const userDetails = { username, email, password, role }
        const userLogin = await axios.post('/user/login', userDetails);
        const { uuid } = userLogin.data.unpurchaseCart;

        if (userLogin.data.userExists) {
            location.href = `03 - products.html?cartId=${uuid}`;
        } else {
            throw new Error(userLogin.data.message)
        }
    } catch (error) {
        swal("Ohhh no!", `${error}`, "warning");
        console.error(error);
    }
}