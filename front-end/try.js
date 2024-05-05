$(document).ready(function() {
    // Load users on page load
    loadUsers();
  
    // Save or update user
    $('#userForm').submit(function(e) {
      e.preventDefault();
      
      var username = $('#username').val().trim();
      var email = $('#email').val().trim();
      var password = $('#password').val().trim(); // Assuming you have a password field in your form
  
      // Validate input fields
      if (username === '' || email === '' || password === '') {
        // Show error message if any field is empty
        $('#errorMessage').removeClass('d-none').text('Please fill in all required fields.');
        // Hide success message
        $('#successMessage').addClass('d-none');
        return;
      }
  
      var formData = $(this).serialize();
      var userId = $('#userId').val(); // Assuming you have a hidden input field for user ID
  
      var url = userId ? `http://127.0.0.1:8000/users/${userId}/update/` : 'http://127.0.0.1:8000/users/create/';
      var method = userId ? 'PUT' : 'POST';
  
      $.ajax({
        type: method,
        url: url,
        data: formData,
        success: function(response) {
          $('#userForm')[0].reset();
          loadUsers();
          // Show success message
          $('#successMessage').removeClass('d-none').text(userId ? 'User updated successfully.' : 'User created successfully.');
          // Hide error message
          $('#errorMessage').addClass('d-none');
        },
        error: function(xhr, textStatus, errorThrown) {
          // Show error message
          $('#errorMessage').removeClass('d-none').text('Failed to save user. Please try again.');
          // Hide success message
          $('#successMessage').addClass('d-none');
          console.log(xhr.responseText);
        }
      });
    });
  
    // // Delete user
    // $(document).on('click', '.deleteBtn', function() {
    //   var userId = $(this).data('id');
  
    //   $.ajax({
    //     type: 'DELETE',
    //     url: `http://127.0.0.1:8000/users/${userId}/delete/`,
    //     success: function(response) {
    //       loadUsers();
    //       // Show success message
    //       $('#successMessage').removeClass('d-none').text('User deleted successfully.');
    //       // Hide error message
    //       $('#errorMessage').addClass('d-none');
    //     },
    //     error: function(xhr, textStatus, errorThrown) {
    //       // Show error message
    //       $('#errorMessage').removeClass('d-none').text('Failed to delete user. Please try again.');
    //       // Hide success message
    //       $('#successMessage').addClass('d-none');
    //       console.log(xhr.responseText);
    //     }
    //   });
    // });
  
    // Delete user
    $(document).on('click', '.deleteBtn', function() {
        var userId = $(this).data('id');
    
        if (!userId) {
        console.error('User ID is undefined');
        return;
        }
    
        $.ajax({
        type: 'DELETE',
        url: `http://127.0.0.1:8000/users/${userId}/delete/`,
        success: function(response) {
            loadUsers();
            // Show success message
            $('#successMessage').removeClass('d-none').text('User deleted successfully.');
            // Hide error message
            $('#errorMessage').addClass('d-none');
        },
        error: function(xhr, textStatus, errorThrown) {
            // Show error message
            $('#errorMessage').removeClass('d-none').text('Failed to delete user. Please try again.');
            // Hide success message
            $('#successMessage').addClass('d-none');
            console.log(xhr.responseText);
        }
        });
    });
  
    // Edit user
    $(document).on('click', '.editBtn', function() {
      var userId = $(this).data('id');
  
      // Fetch user details from server
      $.ajax({
        type: 'GET',
        url: `http://127.0.0.1:8000/users/${userId}/`,
        success: function(user) {
          // Populate form fields with user details
          $('#userId').val(userId); // Set user ID in hidden input field
          $('#username').val(user.username);
          $('#email').val(user.email);
          // Change button text to "Update"
          $('#saveBtn').text('Update');
          // Set focus on username field
          $('#username').focus();
        },
        error: function(xhr, textStatus, errorThrown) {
          console.log(xhr.responseText);
        }
      });
    });

    // Reset form and button text when the form is submitted or reset
    $('#userForm').on('submit reset', function() {
      $('#userId').val(''); // Clear user ID
      $('#saveBtn').text('Create'); // Reset button text to "Create"
    });

    // Load users
    function loadUsers() {
      $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/users/',
        success: function(response) {
          var userList = '';
  
          $.each(response, function(index, user) {
            userList += `<li class="list-group-item">${user.username} - ${user.email} <button class="btn btn-primary editBtn" data-id="${user.id}">Edit</button> <button class="btn btn-danger deleteBtn" data-id="${user.id}">Delete</button></li>`;
          });
  
          $('#userList').html(userList);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
});
