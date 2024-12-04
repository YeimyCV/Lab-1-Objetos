const formFile = document.getElementById("formFile")
let formFileName;
document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));

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
            const nombre = document.getElementById("name").value
            const correo = document.getElementById("email").value
            const telefono = document.getElementById("phone").value
            const mensaje = document.getElementById("message").value
            const trabajo = JSON.parse(localStorage.getItem('trabajo'))
           const cv = formFileName
           const idPostulacion = trabajo._id
            const postulacion = new Aplicacion(idPostulacion,nombre,correo,telefono,cv,mensaje)
console.log(postulacion)
            agregarPostulacion(postulacion)
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

formFile.addEventListener('change', (event) => {
    // Obtener el archivo seleccionado
    const file = event.target.files[0];

    if (file) {
      // Mostrar el nombre del archivo
      formFileName = file.name;
      console.log(formFileName)
    } 
  });

  // Función para agregar una postulación
async function agregarPostulacion(postulacion) {
    const url = "http://localhost:5000/agregarPostulacion";
    try {
      // Configurar el endpoint y los datos a enviar
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica que se envían datos JSON
        },
        body: JSON.stringify(postulacion), // Convertir los datos a JSON
      });
  
      // Verificar la respuesta del servidor
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al agregar la postulación:', errorData);
        return;
      }
  
      // Procesar la respuesta exitosa
      const data = await response.json();
      console.log('Postulación agregada con éxito:', data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }


