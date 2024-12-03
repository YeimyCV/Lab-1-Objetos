document.querySelectorAll('.nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));
        const target = this.getAttribute('data-bs-target');
        document.querySelector(target).classList.add('show', 'active');
    });
});
