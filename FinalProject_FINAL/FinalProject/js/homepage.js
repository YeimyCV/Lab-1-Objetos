document.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
        const target = this.getAttribute('data-bs-target');
        document.querySelector(target).classList.add('show', 'active');
    });
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
  
function displayJobListings(list) {
    const jobResults = document.getElementById('jobResults');
    const jobResultsDeveloper = document.getElementById('jobResultsDeveloper');
    const jobResultsHr = document.getElementById('jobResultsHr');
    const jobResultsMarketing = document.getElementById('jobResultsMarketing');
    const jobResultsDesign = document.getElementById('jobResultsDesign');
    jobResults.innerHTML = '';
    list.forEach(job => {
        const jobCard = `
            <div class="card card-body bg-light d-md-flex justify-content-md-between align-items-md-center flex-md-row p-4 mb-3" id="${job._id}">
                <div class="mb-4 mb-md-0">
                    <div class="badge text-bg-dark mb-3">${job.company}</div>
                    <h5 class="mb-0"><a href="job1.html" class="stretched-link">${job.title}</a></h5>
                    <div class="hstack gap-3 gap-sm-4 flex-wrap mt-3">
                        <span><i class="bi bi-geo-alt me-2"></i>${job.location}</span>
                        <span><i class="bi bi-clock me-2"></i>${job.type}</span>
                        <span><i class="bi bi-briefcase me-2"></i>${job.salary}</span>
                    </div>
                </div>
                <div><a href="job1.html" class="btn btn-primary mb-0">Aplica ahora<i class="bi bi-arrow-right ms-2"></i></a></div>
            </div>`;
            if(job.categoria == "developer"){
                jobResultsDeveloper.insertAdjacentHTML('beforeend', jobCard); 
            }
            else if(job.categoria == "marketing"){
                jobResultsMarketing.insertAdjacentHTML('beforeend', jobCard); 
            }
            else if(job.categoria == "administrativo"){
                jobResultsHr.insertAdjacentHTML('beforeend', jobCard); 
            }
            else if(job.categoria == "diseno"){
                jobResultsDesign.insertAdjacentHTML('beforeend', jobCard); 
            }
        jobResults.insertAdjacentHTML('beforeend', jobCard);
    });
}
obtenerTrabajos().then(trabajos => {
    displayJobListings(trabajos);
  });
