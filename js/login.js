// Select the buttons and container
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Event listeners for toggling the form
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Select the forms
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Register a new user
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = signUpForm.querySelector('input[placeholder="Name"]').value;
    const email = signUpForm.querySelector('input[placeholder="Email"]').value;
    const password = signUpForm.querySelector('input[placeholder="Password"]').value;

    if (name && email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('User already exists!');
        } else {
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! log in now.');
            signUpForm.reset();
            container.classList.remove("right-panel-active"); // Switch to login form
        }
    } else {
        alert('Please enter all infos.');
    }
});

// Login an existing user
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = signInForm.querySelector('input[placeholder="Email"]').value;
    const password = signInForm.querySelector('input[placeholder="Password"]').value;

    if (email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Login successful!');
            localStorage.setItem('loggedInUser', email); // Save the logged in user email
            signInForm.reset();
            window.location.href = 'main page.html'; // Redirect to main page
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('Please enter all infos.');
    }
});
