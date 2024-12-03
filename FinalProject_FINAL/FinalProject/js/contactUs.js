document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.checkValidity()) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            isValid = false;
        }
    });

    if (isValid) {
        Swal.fire({
            title: '¡Éxito!',
            text: 'Tu formulario se ha enviado correctamente.',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, completa todos los campos requeridos.',
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
});