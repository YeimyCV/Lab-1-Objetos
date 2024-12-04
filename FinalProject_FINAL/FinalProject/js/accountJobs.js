let trabajoid;
window.addEventListener('DOMContentLoaded', function() {
  if(userData.getRol() =="Admin"){
    obtenerTrabajos().then(trabajos => {
        const tableBody = document.querySelector('#TableJobs tbody');
        tableBody.innerHTML = '';
        console.log(trabajos)
        trabajos.forEach(function(job) {
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${job.title}</td>
                <td>${job.company}</td>
                <td>${job.categoria}</td>
                <td>
                    <button class="edit-btn btn btn-warning btn-sm" onclick="editarTrabajo('${job._id}')">Editar</button>
                    <button class="delete-btn btn btn-danger btn-sm" onclick="eliminarTrabajo('${job._id}');">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
    
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function() {
                // Remove the row from the DOM
                row.remove();
    
                // Remove the job from localStorage
                // const index = jobs.indexOf(job);
                // if (index > -1) {
                //     jobs.splice(index, 1); // Remove the job from the array
                //     localStorage.setItem('jobs', JSON.stringify(jobs)); // Save the updated array back to localStorage
                // }
            });
        });
       
      });
  }
  else{
    obtenerTrabajosPublicador(userData.getId())
    .then(jobs => {
        const tableBody = document.querySelector('#TableJobs tbody');
    tableBody.innerHTML = '';
    console.log(jobs)
    jobs.forEach(function(job) {
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.company}</td>
            <td>${job.categoria}</td>
            <td>
                <button class="edit-btn btn btn-warning btn-sm">Editar</button>
                <button class="delete-btn btn btn-danger btn-sm">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);

        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            // Remove the row from the DOM
            row.remove();

            // Remove the job from localStorage
            // const index = jobs.indexOf(job);
            // if (index > -1) {
            //     jobs.splice(index, 1); // Remove the job from the array
            //     localStorage.setItem('jobs', JSON.stringify(jobs)); // Save the updated array back to localStorage
            // }
        });
    });
    })
    .catch(error => {
      console.error('Error al consumir la función:', error.message);
    });
  }
   
});

async function obtenerTrabajosPublicador(publishById) {
    const url = `http://localhost:5000/trabajosPorPublicador/${publishById}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      const trabajos = await response.json();
      console.log('Trabajos obtenidos:', trabajos);
      return trabajos; // Devuelve los trabajos obtenidos
    } catch (error) {
      console.error('Error al obtener los trabajos:', error.message);
      throw error; // Vuelve a lanzar el error para manejarlo desde el llamador
    }
  }



async function obtenerTrabajos() {
    const url = 'http://localhost:5000/todosTrabajos';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const trabajos = await response.json();
      console.log('Lista de trabajos:', trabajos);
      return trabajos;
    } catch (error) {
      console.error('Error al obtener los trabajos:', error);
      return [];
    }
  }

  async function eliminarTrabajo(id) {
    try {
      const response = await fetch(`http://localhost:5000/eliminarTrabajo/${id}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al eliminar el trabajo:', error);
    }
  }

  function editarTrabajo(id){
  
    
    Swal.fire({
      title: "Editar Trabajo",
      icon: "info",
      html: `
       <form class="row g-4">
                            <div class="col-md-12">
                                <label class="form-label heading-color">Empresa</label>
                                <input type="text" class="form-control form-control-lg" id="EmpresaEdit" placeholder="Nombre de la empresa" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Categoria</label>
                                <input type="text" class="form-control form-control-lg" id="CategoriaEdit" placeholder="Categoria del puesto" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Nombre del puesto</label>
                                <input type="text" class="form-control form-control-lg" id="PuestoNameEdit" placeholder="Puesto aqui" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Salario</label>
                                <input type="text" class="form-control form-control-lg" id="SalarioEdit" placeholder="Salario" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Ciudad</label>
                                <input type="text" class="form-control form-control-lg" id="LocationEdit" placeholder="San Rafael" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Dirección</label>
                                <input type="text" class="form-control form-control-lg" id="AddressEdit" placeholder="Heredia, Costa Rica" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">País</label>
                                <input type="text" class="form-control form-control-lg" id="CountryEdit" placeholder="Costa Rica" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label heading-color">Modalidad</label>
                                <input type="text" class="form-control form-control-lg" id="ModalidadEdit" placeholder="Remoto / Hibrido" required>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Habilidades</label>
                                <input class="form-control" placeholder="Skills necesarias" id="Skills1Edit"  required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Habilidades</label>
                                <input class="form-control" placeholder="Skills necesarias" id="Skills2Edit"  required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Habilidades</label>
                                <input class="form-control" placeholder="Skills necesarias" id="Skills3Edit"  required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Responsabilidades</label>
                                <input class="form-control" placeholder="Responsabilidades del puesto" id="Responsabilities1Edit"  required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Responsabilidades</label>
                                <input class="form-control" placeholder="Responsabilidades del puesto" id="Responsabilities2Edit" required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Responsabilidades</label>
                                <input class="form-control" placeholder="Responsabilidades del puesto" id="Responsabilities3Edit" required></input>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Experiencia</label>
                                <textarea class="form-control" placeholder="Experiencia necesaria" id="ExperienciaEdit" style="height: 150px" required></textarea>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Requisitos educativos:</label>
                                <textarea class="form-control" placeholder="Requisitos educativos" id="EducationEdit" style="height: 150px" required></textarea>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label heading-color">Descripción</label>
                                <textarea class="form-control" placeholder="Descripción del puesto" id="DescriptionEdit" style="height: 150px" required></textarea>
                                <div class="valid-feedback">
                                    Muy bien!
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, ingresa un valor.
                                </div>
                            </div>
                        </form>
      `,
      showCloseButton: true,
      confirmButtonText: `
       Guardar
      `,
      didOpen: () => {
        obtenerTrabajoById(id).then(trabajo =>{
          trabajoid = trabajo._id
          const puesto =document.getElementById('PuestoNameEdit').value= trabajo.title;
          const empresa = document.getElementById('EmpresaEdit').value= trabajo.company;
          const categoria = document.getElementById('CategoriaEdit').value= trabajo.categoria;
          const salario = document.getElementById('SalarioEdit').value= trabajo.salary;
          const location = document.getElementById('LocationEdit').value= trabajo.city;
          const country = document.getElementById('CountryEdit').value= trabajo.country;
          const address = document.getElementById('AddressEdit').value= trabajo.location;
          const modalidad = document.getElementById('ModalidadEdit').value= trabajo.type;
          const skills1 = document.getElementById('Skills1Edit').value= trabajo.habilidades.habilidad1;
          const skills2 = document.getElementById('Skills2Edit').value= trabajo.habilidades.habilidad2;
          const skills3 = document.getElementById('Skills3Edit').value= trabajo.habilidades.habilidad3;
          const responsibilities1 = document.getElementById('Responsabilities1Edit').value= trabajo.responsabilidades.responsabilidad1;
          const responsibilities2 = document.getElementById('Responsabilities2Edit').value= trabajo.responsabilidades.responsabilidad1;
          const responsibilities3 = document.getElementById('Responsabilities3Edit').value= trabajo.responsabilidades.responsabilidad1;
          const experiencia = document.getElementById('ExperienciaEdit').innerHTML= trabajo.experiencia.experiencia1;
          const education = document.getElementById('EducationEdit').innerHTML= trabajo.requisitosEducativos.requisitoEducativo1;
          const description = document.getElementById('DescriptionEdit').innerHTML= trabajo.descripcion;
        })
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          const puesto =document.getElementById('PuestoNameEdit').value
          const empresa = document.getElementById('EmpresaEdit').value
          const categoria = document.getElementById('CategoriaEdit').value
          const salario = document.getElementById('SalarioEdit').value
          const location = document.getElementById('LocationEdit').value
          const country = document.getElementById('CountryEdit').value
          const address = document.getElementById('AddressEdit').value
          const modalidad = document.getElementById('ModalidadEdit').value
          const skills1 = document.getElementById('Skills1Edit').value
          const skills2 = document.getElementById('Skills2Edit').value
          const skills3 = document.getElementById('Skills3Edit').value
          const responsibilities1 = document.getElementById('Responsabilities1Edit').value
          const responsibilities2 = document.getElementById('Responsabilities2Edit').value
          const responsibilities3 = document.getElementById('Responsabilities3Edit').value
          const experiencia = document.getElementById('ExperienciaEdit').value
          const education = document.getElementById('EducationEdit').value
          const description = document.getElementById('DescriptionEdit').value
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
          const updatedTrabajo = {
            title:puesto, 
            company:empresa, 
            location:address, 
            city:location, 
            country:country, 
            type:modalidad, 
            categoria:categoria, 
            salary:salario, 
            habilidades:habilidades, 
            responsabilidades:responsabilidades, 
            experiencia:experiencias, 
            requisitosEducativos:requisitosEducativos, 
            descripcion :description
          }
          
          editarTrabajoporId(trabajoid,updatedTrabajo)
      }
    });
  }
  
  async function obtenerTrabajoById(id) {
    try {
      const response = await fetch(`http://localhost:5000/trabajo/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const trabajo = await response.json();
      console.log('Trabajo:', trabajo);
      return trabajo;
    } catch (error) {
      console.error('Error al obtener el trabajo:', error);
      return [];
    }
  }

  async function editarTrabajoporId(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:5000/editarTrabajo`, {
        method: 'POST',  // Método PUT para actualizar datos
        headers: {
          'Content-Type': 'application/json', // Especifica que se envían datos JSON
        },
        body: JSON.stringify({id,updatedData}), // Convierte los nuevos datos a JSON
      });
  
      if (response.ok) {
        const result = await response.json(); // Parsear la respuesta como JSON
        console.log('Trabajo editado:', result.message);  // Muestra mensaje de éxito
        location.reload()
      } else {
        const error = await response.json(); // Si hay un error, lo parseamos
        console.error('Error:', error.message);  // Mostrar el error en consola
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);  // Manejo de errores de red o JS
    }
  }
  

  

