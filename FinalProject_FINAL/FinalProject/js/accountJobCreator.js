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
        const modalidad = document.getElementById('Modalidad').value;
        const skills = document.getElementById('Skills').value;
        const responsibilities = document.getElementById('Responsabilities').value;
        const experiencia = document.getElementById('Experiencia').value;
        const education = document.getElementById('Education').value;
        const description = document.getElementById('Description').value;

        // Create a new job object
        const newJob = {
            puesto,
            empresa,
            categoria,
            salario,
            location,
            modalidad,
            skills,
            responsibilities,
            experiencia,
            education,
            description
        };

        const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];

        existingJobs.push(newJob);

        localStorage.setItem('jobs', JSON.stringify(existingJobs));

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
