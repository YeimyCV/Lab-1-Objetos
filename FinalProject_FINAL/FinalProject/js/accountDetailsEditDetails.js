// On page load, populate input fields from localStorage
window.addEventListener('DOMContentLoaded', () => {

    if (userData) {
        const parts = userData.getNombre().split(' ');
        const nombre = parts[0];
        const apellido = parts.slice(1).join(' ');
        document.getElementById('Nombre1').value = nombre || '';
        document.getElementById('Apellido1').value = apellido || '';
        document.getElementById('Correo1').value = userData.getCorreo() || '';
        document.getElementById('Phone1').value = userData.getTelefono() || '';
    }
});

// Logic to save new data
document.getElementById('saveButton1').addEventListener('click', function() {
    const nameInput = document.getElementById('Nombre1');
    const surnameInput = document.getElementById('Apellido1');
    const phoneInput = document.getElementById('Phone1');
    const emailInput = document.getElementById('Correo1');
    const passwordInput = document.getElementById('Password');
    
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
        const newContrasena= !passwordInput.value ? userData.getContrasena() : passwordInput.value
        const updatedUserData = {
            _id:userData.getId(),
            nombre: `${nameInput.value} ${surnameInput.value}`,
            telefono: phoneInput.value,
            correo: emailInput.value,
            contrasena:newContrasena,
            rol: JSON.parse(localStorage.getItem('loggedInUser')).rol  // Keep userType unchanged
        };
         userData.setNombre(updatedUserData.nombre)
         userData.setCorreo(updatedUserData.correo)
         userData.setTelefono(updatedUserData.telefono)
         userData.setContrasena(updatedUserData.contrasena)
        // Save updated user data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUserData));
        actualizarUsuario();
       
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
async function actualizarUsuario(){
    const url = 'http://localhost:5000/actualizarUsuario'
 const usuario = {
   nombre: userData.getNombre(),
   contrasena: userData.getContrasena(),
   correo: userData.getCorreo(),
   telefono:userData.getTelefono(),
   rol: userData.getRol(),
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
     const error = await response.json();
     Swal.fire({
       title: 'Error al Actualizar usuario!',
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