// On page load, populate input fields from localStorage
window.addEventListener('DOMContentLoaded', (event) => {
    const storedData = JSON.parse(localStorage.getItem('user'));

    if (storedData) {
        
        const parts = storedData.nombre.split(' ');
        const nombre = parts[0];
        const apellido = parts.slice(1).join(' ');
        document.getElementById('Nombre1').value = nombre || '';
        document.getElementById('Apellido1').value = apellido || '';
        document.getElementById('Correo1').value = storedData.correo || '';
        document.getElementById('Phone1').value = storedData.telefono || '';
    }
});

// Logica para guardar los datos nuevos
document.getElementById('saveButton1').addEventListener('click', function() {
    const nameInput = document.getElementById('Nombre1');
    const surnameInput = document.getElementById('Apellido1');
    const phoneInput = document.getElementById('Phone1');
    const emailInput = document.getElementById('Correo1');
    
    let isValid = true;


    nameInput.classList.remove('is-invalid');
    surnameInput.classList.remove('is-invalid');
    phoneInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    

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


    if (isValid) {
        const updatedUserData = {
            name: nameInput.value,
            surname: surnameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        };


        localStorage.setItem('user', JSON.stringify(updatedUserData));

       Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Datos guardados correctamente!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    }).then(() => {
        location.reload();
    });
} else {

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
