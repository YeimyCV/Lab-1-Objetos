document.getElementById('signupBtn').addEventListener('click', function() {
    const nameInput = document.getElementById('signupName');
    const surnameInput = document.getElementById('signupsurName');
    const phoneInput = document.getElementById('signupPhone');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPswInput');
    const confirmPasswordInput = document.getElementById('confirmPswInput');
    const termsCheckbox = document.getElementById('checkbox-1');

    let isValid = true;

    nameInput.classList.remove('is-invalid');
    surnameInput.classList.remove('is-invalid');
    phoneInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.remove('is-invalid');
    termsCheckbox.classList.remove('is-invalid');

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

    if (isValid) {
        const userData = {
            name: `${nameInput.value} ${surnameInput.value}`,
            email: emailInput.value,
            password: passwordInput.value,
            phone:phoneInput.value
        };
        
        registrarUsuario(userData);

        
    }
});

async function registrarUsuario(datosUsuario){
     const url = 'http://localhost:5000/registrarUsuario'
  const usuario = {
    nombre: datosUsuario.name,
    contrasena: datosUsuario.password,
    correo: datosUsuario.email,
    telefono:datosUsuario.phone,
    rol: "usuario",
  };

  try {
    // Solicitud POST al servidor
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario), 
    });

    if (response.ok) {
      window.location.href = 'signin.html';
    } else {
      const error = await response.json();
      Swal.fire({
        title: 'Error al registrar usuario!',
        text: error.error,
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });
    return;
    }
  } catch (err) {
     Swal.fire({
        title: 'Error en la solicitud!',
        text: err,
        icon: 'error',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });
  }
}
