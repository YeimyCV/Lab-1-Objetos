document.getElementById('signupBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('signupName');
    const surnameInput = document.getElementById('signupsurName');
    const phoneInput = document.getElementById('signupPhone');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPswInput');
    const confirmPasswordInput = document.getElementById('confirmPswInput');
    const termsCheckbox = document.getElementById('checkbox-1');

    let isValid = true;

    // Reset validation states
    nameInput.classList.remove('is-invalid');
    surnameInput.classList.remove('is-invalid');
    phoneInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.remove('is-invalid');
    termsCheckbox.classList.remove('is-invalid');

    // Validation logic
    if (!nameInput.value) {
        nameInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!surnameInput.value) {
        surnameInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!phoneInput.value) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!termsCheckbox.checked) {
        termsCheckbox.classList.add('is-invalid');
        isValid = false;
    }

    // Determine userType based on radio selection
    let userType = null;
    if (document.getElementById('btnradio1').checked) {
        userType = "Empleado";  // "Empleado"
    } else if (document.getElementById('btnradio2').checked) {
        userType = "Empleador"; // "Empleador"
    } else if (document.getElementById('btnradio3').checked) {
        userType = "Admin";     // "Admin"
    }

    if (!userType) {
        alert("Por favor, selecciona un tipo de cuenta.");
        isValid = false;
    }

    if (isValid) {
        // Create the userData object with all necessary fields
        const userData = {
            id: Date.now(),  // Unique ID for each user (based on timestamp)
            name: nameInput.value,
            surname: surnameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            userType: userType
        };

        // Get existing users or create a new array if none exist
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Add the new user to the array
        users.push(userData);

        // Store the updated users array in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to the sign-in page
        window.location.href = 'signin.html'; 
    }
});
