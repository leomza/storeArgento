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
        //Get the username of the user
        const userLoginUsername = await axios.get(`/user/username/${email}`);
        const { username } = userLoginUsername.data;
        const userDetails = { username, email, password }
        const userLogin = await axios.post('/user/login', userDetails);

        if (userLogin.data.userExists) {
            location.href = `03 - products.html?email=${email}`;
        } else {
            swal("Ohhh no!", userLogin.data.message, "warning");
        }
    } catch (error) {
        console.error(error);
        swal("Ohhh no!", error, "warning");
    }
};