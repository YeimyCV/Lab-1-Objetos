document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
        document.getElementById('contact-form').style.display = 'block';
    } else {
        document.getElementById('contact-form').style.display = 'none';
    }
    const applyButton = document.getElementById('apply-button');

    applyButton.addEventListener('click', function(event) {
    if (!userData) {
    event.preventDefault();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: 'Por favor, inicia sesión para aplicar',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
});
});

const form = document.getElementById('myForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                valid = false;
            }
        });

        if (valid) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Aplicacion enviada exitosamente!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false
            });
        }
    
});


