// On page load, populate input fields from localStorage
window.addEventListener('DOMContentLoaded', (event) => {
    const storedData = JSON.parse(localStorage.getItem('loggedInUser'));  // Fetch logged-in user data

    if (storedData) {
        document.getElementById('Nombre1').value = storedData.name || '';
        document.getElementById('Apellido1').value = storedData.surname || '';
        document.getElementById('Correo1').value = storedData.email || '';
        document.getElementById('Phone1').value = storedData.phone || '';
    }
});

// Logic to save new data
document.getElementById('saveButton1').addEventListener('click', function() {
    const nameInput = document.getElementById('Nombre1');
    const surnameInput = document.getElementById('Apellido1');
    const phoneInput = document.getElementById('Phone1');
    const emailInput = document.getElementById('Correo1');
    
    let isValid = true;

    // Reset validation styles
    nameInput.classList.remove('is-invalid');
    surnameInput.classList.remove('is-invalid');
    phoneInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    
    // Validate fields
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

    // If data is valid, update the user in localStorage
    if (isValid) {
        const updatedUserData = {
            name: nameInput.value,
            surname: surnameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            userType: JSON.parse(localStorage.getItem('loggedInUser')).userType  // Keep userType unchanged
        };

        // Save updated user data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUserData));

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Datos guardados correctamente!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            location.reload();  // Reload the page to reflect the changes
        });
    } else {
        // Show an error if validation fails
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Por favor, completa todos los campos correctamente.',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }
});
