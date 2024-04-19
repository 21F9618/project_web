document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('form-signup');

    // Add an event listener for form submission
    signupForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Get the form data
        const formData = new FormData(signupForm);
        const formDataObject = Object.fromEntries(formData.entries());

        // Validate the passwords
        const password = formDataObject.password;
        const confirmPassword = formDataObject.confirm_password;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Send a POST request to the server's signup endpoint
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });

            // Check if the response status code is OK
            if (response.ok) {
                alert('User created successfully!');
                // Redirect to the success page or another appropriate page
                window.location.href = '/views/index.html';
            } else {
                // Handle server errors
                const errorResponse = await response.json();
                console.error('Error creating user:', errorResponse);
                alert('Error creating user: ' + errorResponse.error);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login');

    // Add an event listener for form submission
    loginForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Get the form data
        const formData = new FormData(loginForm);
        const formDataObject = Object.fromEntries(formData.entries());

        // Send a POST request to the server's login endpoint
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });

            // Check if the response status code is OK
            if (response.ok) {
                // Parse the JSON response from the server
                const result = await response.json();
                
                // Notify the user of successful login
                alert('Login successful!');

                // Redirect the user to the desired page upon successful login, if needed
                window.location.href = '/views/index.html';
            } else {
                // Handle server errors
                const errorResponse = await response.json();
                console.error('Error during login:', errorResponse);
                alert('Error during login: ' + errorResponse.error);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
