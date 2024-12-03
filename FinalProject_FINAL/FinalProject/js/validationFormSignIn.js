document.getElementById('submitBtn').addEventListener('click', function() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPswInput');

    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    if (!emailInput.value) {
        emailInput.classList.add('is-invalid');
        return;
    }
    if (!passwordInput.value) {
        passwordInput.classList.add('is-invalid');
        return;
    }
login(emailInput.value,passwordInput.value)
});

async function login(correo, contrasena) {
    const url = 'http://localhost:5000/login'; // Reemplázalo con tu URL base si es necesario
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
            title: 'Error en el inicio de sesión!',
            text: errorData.message,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
        return;
      }
  
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.userData));
    window.location.href = 'index.html';
    } catch (error) {
        Swal.fire({
            title: 'Error de red!',
            text: error,
            icon: 'error',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    }
  }
