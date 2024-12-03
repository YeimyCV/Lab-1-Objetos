window.addEventListener('DOMContentLoaded', function() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const tableBody = document.querySelector('#TableJobs tbody');
    tableBody.innerHTML = '';

    jobs.forEach(function(job) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.puesto}</td>
            <td>${job.empresa}</td>
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
            const index = jobs.indexOf(job);
            if (index > -1) {
                jobs.splice(index, 1); // Remove the job from the array
                localStorage.setItem('jobs', JSON.stringify(jobs)); // Save the updated array back to localStorage
            }
        });
    });
});
