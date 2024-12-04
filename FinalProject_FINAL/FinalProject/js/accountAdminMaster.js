window.addEventListener('DOMContentLoaded', function() {
    obtenerTodosUsuarios()
});
 function obtenerTodosUsuarios() {
    fetch('http://localhost:5000/todosUsuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json();
      })
      .then((users) => {
        const tableBody = document.querySelector('#MasterAdminUsers tbody');

        tableBody.innerHTML = ''; // Clear existing rows
    
        users.forEach(function(user) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.correo}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="delete-btn btn btn-danger btn-sm" data-user-id="${user.id}">
                        Eliminar
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
    
            const deleteButton = row.querySelector('.delete-btn');
            if (deleteButton) {
                deleteButton.addEventListener('click', function() {
                    if (user.userType === 'Admin') {
                        // If the user is an admin, ask for the password before deletion
                        console.log('Admin user found, asking for password...');
                        Swal.fire({
                            title: 'Confirmar eliminación',
                            text: "Introduce la contraseña para eliminar este usuario administrador:",
                            input: 'password',
                            inputPlaceholder: 'Introduce la contraseña',
                            showCancelButton: true,
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Eliminar',
                            inputValidator: (value) => {
                                console.log('Password entered:', value);  // Debugging log
                                if (value !== '1234') {
                                    return '¡Contraseña incorrecta!';
                                }
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                console.log('Password correct, deleting user...');
                                deleteUser(user);
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                // User canceled the deletion
                                Swal.fire('Eliminación cancelada', '', 'info');
                            }
                        });
                    } else {
                        // If not an admin, proceed with the deletion immediately
                        deleteUser(user);
                    }
                });
            }
        });
    
        function deleteUser(user) {
            // Find the row for the user and remove it
            const row = document.querySelector(`button[data-user-id="${user.id}"]`).closest('tr');
            row.remove();
    
            // Remove the user from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const index = users.findIndex(u => u.id === user.id);
            if (index > -1) {
                users.splice(index, 1); // Remove user from array
                localStorage.setItem('users', JSON.stringify(users)); // Save updated list
                Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado correctamente.', 'success');
            }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }