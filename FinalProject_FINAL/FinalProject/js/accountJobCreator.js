document.getElementById('sendJob').addEventListener('click', function(event) {
    event.preventDefault();

    var form = document.querySelector('form');
    var inputs = form.querySelectorAll('input, textarea');
    var isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (isValid) {

        const puesto = document.getElementById('PuestoName').value;
        const empresa = document.getElementById('Empresa').value;
        const categoria = document.getElementById('Categoria').value;
        const salario = document.getElementById('Salario').value;
        const location = document.getElementById('Location').value;
        const country = document.getElementById('Country').value;
        const address = document.getElementById('Address').value;
        const modalidad = document.getElementById('Modalidad').value;
        const skills1 = document.getElementById('Skills1').value;
        const skills2 = document.getElementById('Skills2').value;
        const skills3 = document.getElementById('Skills3').value;
        const responsibilities1 = document.getElementById('Responsabilities1').value;
        const responsibilities2 = document.getElementById('Responsabilities2').value;
        const responsibilities3 = document.getElementById('Responsabilities3').value;
        const experiencia = document.getElementById('Experiencia').value;
        const education = document.getElementById('Education').value;
        const description = document.getElementById('Description').value;
        const habilidades= {
            habilidad1: skills1,
            habilidad2: skills2,
            habilidad3: skills3,
            habilidad4: "Inglés (B2 o C1)",
          }
        const  responsabilidades= {
            responsabilidad1: responsibilities1,
            responsabilidad2: responsibilities2,
            responsabilidad3: responsibilities3,
          }
          const  experiencias = {
            experiencia1: experiencia,
          }
          const url = "job1.html"
          const requisitosEducativos= {
            requisitoEducativo1: education,
          }
 const nuevoTrabajo = new Trabajo(userData.getId(), puesto, empresa, address, location, country, modalidad, categoria, salario,url, habilidades, responsabilidades, experiencias, requisitosEducativos, description)


        fetch('http://localhost:5000/agregarTrabajo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoTrabajo),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));

        // const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];

        // existingJobs.push(newJob);

        // localStorage.setItem('jobs', JSON.stringify(existingJobs));

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Puesto creado!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });

        form.reset();
        inputs.forEach(function(input) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
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
