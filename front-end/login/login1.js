const signInButton = document.getElementById('signIn');
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://127.0.0.1:8000/users/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }
        return response.json();
    })
    .then(data => {
        alert('Login successful');
        loginForm.reset();   
        // Assuming your backend responds with a token
        const token = data.token;
        localStorage.setItem('token', token); // Store token in local storage
        window.location.href = 'index.html'; // Redirect to dashboard or home page
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid credentials. Please try again.');
    });
});

// function login() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // You can perform validation here if needed

//     // Assuming the backend URL for login is 'http://yourbackend.com/login'
//     fetch('http://localhost:8000/users/login/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Invalid username or password');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Assuming your backend responds with a token
//         const token = data.token;
//         localStorage.setItem('token', token); // Store token in local storage
//         window.location.href = 'index.html'; // Redirect to dashboard or home page
//     })
//     .catch(error => {
//         document.getElementById('error').innerText = error.message;
//     });
// }
