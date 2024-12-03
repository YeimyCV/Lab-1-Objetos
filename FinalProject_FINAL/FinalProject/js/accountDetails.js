window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('fullName').innerText = `${loggedInUser.name} ${loggedInUser.surname}`;
        document.getElementById('email').innerText = loggedInUser.email;
        document.getElementById('email').href = `mailto:${loggedInUser.email}`;
    } else {
        window.location.href = 'signin.html';
    }
});



window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userData = users.find(user => user.email === loggedInUser.email);
        
        if (userData) {

            document.getElementById('Nombre1').value = userData.name;
            document.getElementById('Apellido1').value = userData.surname;
            document.getElementById('Correo1').value = userData.email;
            document.getElementById('Phone1').value = userData.phone;
        }
    } else {

        window.location.href = 'signin.html';
    }
});

const profilePicInput = document.querySelector('input[type="file"]');
profilePicInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.querySelector('.avatar-img').src = event.target.result;
            loggedInUser.profilePicture = event.target.result;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        };
        reader.readAsDataURL(file);
    }
});
