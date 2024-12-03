window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const fullNameElement = document.getElementById('fullName');
    const emailElement = document.getElementById('email');

    if (userData) {
        const { nombre, correo } = userData;

        if (nombre) {
            fullNameElement.textContent = nombre;
        } else {
            fullNameElement.textContent = '';
        }

        if (email) {
            emailElement.textContent = correo;
            emailElement.href = `mailto:${correo}`;
        } else {
            emailElement.textContent = '';
            emailElement.href = '';
        }
    } else {
        fullNameElement.textContent = '';
        emailElement.textContent = '';
        emailElement.href = '';
    }
});
