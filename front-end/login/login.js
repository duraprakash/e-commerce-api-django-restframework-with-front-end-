// $(document).ready(function() {
//     $('#loginForm').submit(function(event) {
//       event.preventDefault(); // Prevent default form submission
  
//       // Get form data
//       var formData = {
//         'username': $('input[name=username]').val(),
//         'password': $('input[name=password]').val()
//       };
//       alert(formData);
  
//       // Send POST request to login API
//       $.ajax({
//         type: 'POST',
//         url: 'http://127.0.0.1:8000/users/login/', // Change to your API endpoint
//         data: formData,
//         dataType: 'json',
//         success: function(response) {
//           // If login successful, store token in localStorage
//           localStorage.setItem('token', response.token);
//           // Redirect to dashboard or perform other actions
//           window.location.href = '/dashboard.html'; // Change to your dashboard page
//         },
//         error: function(xhr, status, error) {
//           // If login failed, display error message
//           var errorMessage = xhr.responseJSON.message;
//           alert(errorMessage);
//         }
//       });
//     });
//   });

const signInButton = document.getElementById('signIn');
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get form data
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send POST request to login endpoint
  fetch("http://127.0.0.1:8000/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      return response.json();
    })
    .then(date => {
      alert('Login Successful');
      loginForm.reset();
      // Assuming your backend responds with a token
      const token = data.token;
      localStorage.setItem('token', token); // Store token in local storage
      window.location.href = 'index.html'; // Redirect to dashboard or home page
    })
    .catch(error => {
      console.error('Error loggin in:', error);
      alert('Invalid credentials. Please try again.');
    });
     
});