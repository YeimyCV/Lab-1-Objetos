// Function to toggle button visibility based on login status
function updateNavButtons() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const accountBtn = document.getElementById('accountBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loggedInUser) {
        // User is logged in
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        accountBtn.style.display = 'block';  // Show account button
        logoutBtn.style.display = 'block';  // Show logout button
    } else {
        // User is not logged in
        loginBtn.style.display = 'block';  // Show login button
        signupBtn.style.display = 'block';  // Show signup button
        accountBtn.style.display = 'none';  // Hide account button
        logoutBtn.style.display = 'none';  // Hide logout button
    }
}

window.onload = updateNavButtons;

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');  
    window.location.href = 'signin.html'; 
});
