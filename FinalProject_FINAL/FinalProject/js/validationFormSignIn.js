document.getElementById('submitBtn').addEventListener('click', function() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPswInput');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Clear any previous validation states
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    // Validate input fields
    if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        return;
    }
    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        return;
    }
    
    // Find the user with the provided email
    const userData = users.find(user => user.email === emailInput.value);

    // Handle cases for incorrect credentials or user not found
    if (!userData) {
        Swal.fire({
            title: 'Usuario no encontrado!',
            text: 'Por favor, regístrate primero.',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    } else if (userData.password === passwordInput.value) {
        // Store the full user data (including name, surname, phone, etc.) in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(userData));

        window.location.href = 'index.html'; 
    } else {
        Swal.fire({
            title: 'Credenciales incorrectas!',
            text: 'Por favor, intenta de nuevo.',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    }
});
