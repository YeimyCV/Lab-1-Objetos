document.addEventListener('DOMContentLoaded', function() {

    // Fetch userType from loggedInUser in localStorage
    const userType = JSON.parse(localStorage.getItem('loggedInUser'))?.userType;

    // Select the navigation links
    const profileLink = document.querySelector('a[href="account.html"]');
    const applicationsLink = document.querySelector('a[href="account_applications.html"]');
    const createJobLink = document.querySelector('a[href="account_CreateAJob.html"]');
    const jobsLink = document.querySelector('a[href="account_jobs.html"]');
    const usersLink = document.querySelector('a[href="account_Usuarios.html"]');

    // Logic to hide/show based on userType
    if (userType === "Empleado") {
        // If the user is "Empleado", show only "Mi perfil" and "Mis aplicaciones"
        applicationsLink.closest('li').style.display = 'block';
        profileLink.closest('li').style.display = 'block';
        createJobLink.closest('li').style.display = 'none';
        jobsLink.closest('li').style.display = 'none';
        usersLink.closest('li').style.display = 'none';

    } else if (userType === "Empleador") {
        // If the user is "Empleador", show "Mi perfil", "Crear un puesto", and "Mis trabajos"
        applicationsLink.closest('li').style.display = 'none';
        profileLink.closest('li').style.display = 'block';
        createJobLink.closest('li').style.display = 'block';
        jobsLink.closest('li').style.display = 'block';
        usersLink.closest('li').style.display = 'none';

    } else if (userType === "Admin") {
        // If the user is "Admin", show all options
        profileLink.closest('li').style.display = 'block';
        applicationsLink.closest('li').style.display = 'none';
        createJobLink.closest('li').style.display = 'none';
        jobsLink.closest('li').style.display = 'block';
        usersLink.closest('li').style.display = 'block';
    } else {
        // If no userType found, hide all
        profileLink.closest('li').style.display = 'none';
        applicationsLink.closest('li').style.display = 'none';
        createJobLink.closest('li').style.display = 'none';
        jobsLink.closest('li').style.display = 'none';
        usersLink.closest('li').style.display = 'none';
    }
});
