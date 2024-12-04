let jobListings=[] ;
document.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
        const target = this.getAttribute('data-bs-target');
        document.querySelector(target).classList.add('show', 'active');
    });
});

  
  function displayJobListings(list) {
    const jobResults = document.getElementById('jobResults');
    jobResults.innerHTML = '';
    list.forEach(job => {
        const jobCard = `
            <div class="card card-body bg-light d-md-flex justify-content-md-between align-items-md-center flex-md-row p-4 mb-3">
                <div class="mb-4 mb-md-0">
                    <div class="badge text-bg-dark mb-3">${job.company}</div>
                    <h5 class="mb-0"><a href="job1.html" class="stretched-link" data-collectionID="${job._id}">${job.title}</a></h5>
                    <div class="hstack gap-3 gap-sm-4 flex-wrap mt-3">
                        <span><i class="bi bi-geo-alt me-2"></i>${job.location}</span>
                        <span><i class="bi bi-clock me-2"></i>${job.type}</span>
                        <span><i class="bi bi-briefcase me-2"></i>${job.salary}</span>
                    </div>
                </div>
                <div><a href="job1.html" class="btn btn-primary mb-0"  data-collectionID="${job._id}">Aplica ahora<i class="bi bi-arrow-right ms-2"></i></a></div>
            </div>`;
        jobResults.insertAdjacentHTML('beforeend', jobCard);
    });
}



  obtenerTrabajos().then(trabajos => {
    jobListings = trabajos;
    displayJobListings(jobListings);
  });

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

  async function obtenerTrabajoById(id) {
    const url = "http://localhost:5000/trabajo";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const trabajo = await response.json();
      console.log('trabajo:', trabajo);
      return trabajo;
    } catch (error) {
      console.error('Error al obtener los trabajos:', error);
      return [];
    }
  }

  document.addEventListener('click', (event) => {
    
    const target = event.target.closest('a[data-collectionID]');
    if (target) {
        event.preventDefault();
        const collectionID = target.getAttribute('data-collectionID')
        obtenerTrabajoById(collectionID).then(trabajo => {
            localStorage.setItem("trabajo",JSON.stringify(trabajo))
            setTimeout(() => {
                window.location.href = event.target.href; // Navega a la URL del enlace
              }, 100);
          });
    }
  });