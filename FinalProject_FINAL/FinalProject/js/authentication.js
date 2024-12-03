// Function to toggle button visibility based on login status
function updateNavButtons() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const accountBtn = document.getElementById('accountBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userData) {
        // User is logged in
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        accountBtn.style.display = 'block';
        logoutBtn.style.display = 'block'; 
    } else {
        // User is not logged in
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        accountBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

window.onload = updateNavButtons;

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('user');
    window.location.href = 'signin.html';
});
