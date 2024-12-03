const jobListings = [
    {
        title: "UI/UX and Product Designer",
        company: "Company 1",
        location: "Location 1",
        type: "Remote",
        salary: "$60,000",
        url: "job1.html"
    },
    {
        title: "General Office Manager",
        company: "Company 2",
        location: "Location 2",
        type: "OnSite",
        salary: "$50,000",
        url: "job2.html"
    },
    {
        title: "Machine Learning Specialist",
        company: "Company 3",
        location: "Location 3",
        type: "Hybrid",
        salary: "$80,000",
        url: "job3.html"
    },
    {
        title: "Senior Product Manager",
        company: "Company 4",
        location: "Location 4",
        type: "Remote",
        salary: "$100,000",
        url: "job4.html"
    },
    {
        title: "Customer Service Representative",
        company: "Company 5",
        location: "Location 5",
        type: "OnSite",
        salary: "$35,000",
        url: "job5.html"
    },
    {
        title: "Senior Operations Manager",
        company: "Company 6",
        location: "Location 6",
        type: "Hybrid",
        salary: "$90,000",
        url: "job6.html"
    },
    {
        title: "Junior UI/UX Designer",
        company: "Company 7",
        location: "San Rafael, Heredia",
        type: "Hybrid",
        salary: "$15,000",
        url: "job7.html"
    }
];

function displayJobListings(list) {
    const jobResults = document.getElementById('jobResults');
    jobResults.innerHTML = '';
    list.forEach(job => {
        const jobCard = `
            <div class="card card-body bg-light d-md-flex justify-content-md-between align-items-md-center flex-md-row p-4 mb-3">
                <div class="mb-4 mb-md-0">
                    <div class="badge text-bg-dark mb-3">${job.company}</div>
                    <h5 class="mb-0"><a href="${job.url}" class="stretched-link">${job.title}</a></h5>
                    <div class="hstack gap-3 gap-sm-4 flex-wrap mt-3">
                        <span><i class="bi bi-geo-alt me-2"></i>${job.location}</span>
                        <span><i class="bi bi-clock me-2"></i>${job.type}</span>
                        <span><i class="bi bi-briefcase me-2"></i>${job.salary}</span>
                    </div>
                </div>
                <div><a href="${job.url}" class="btn btn-primary mb-0">Aplica ahora<i class="bi bi-arrow-right ms-2"></i></a></div>
            </div>`;
        jobResults.insertAdjacentHTML('beforeend', jobCard);
    });
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const selectedType = document.getElementById('typeSelect').value;
    const filteredJobs = jobListings.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(searchInput);
        const matchesType = selectedType === '' || job.type === selectedType;
        return matchesTitle && matchesType;
    });

    const noResultsMessage = document.getElementById('noResults');

    if (filteredJobs.length > 0) {
        noResultsMessage.style.display = 'none';
        displayJobListings(filteredJobs);
    } else {
        noResultsMessage.style.display = 'block';
        document.getElementById('jobResults').innerHTML = '';
    }
});

displayJobListings(jobListings);
