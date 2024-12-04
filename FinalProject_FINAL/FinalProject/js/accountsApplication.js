function obtenerTrabajosPorCorreo(correo) {
    fetch(`http://localhost:5000/postulacionesPorCorreo/${correo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los trabajos');
        }
        return response.json();
      })
      .then((data) => {
        const tbody = document.getElementById("applicationTbody")
        tbody.innerHTML =""
        for(const aplication of data){
        let html = `<tr>
                        <td>${aplication.title}</td>
                        <td>${aplication.company}</td>
                        <td>${aplication.categoria}</td>
                    </tr>`
        tbody.innerHTML += html
        }
        // Aquí puedes manipular los datos obtenido
    
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  obtenerTrabajosPorCorreo("jhon.doe@correo.com")
