var userData;
window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        if(  loggedInUser.rol == "Empleado" ){
            userData = new Empleado(loggedInUser.nombre,loggedInUser.correo,loggedInUser.contrasena,loggedInUser.telefono,loggedInUser.rol)
            userData.setId(loggedInUser._id)
        } 
          else if(loggedInUser.rol == "Empleador"){
            userData = new Empleador(loggedInUser.nombre,loggedInUser.correo,loggedInUser.contrasena,loggedInUser.telefono,loggedInUser.rol)
            userData.setId(loggedInUser._id)
          } 
          else {
           userData = new Administrador(loggedInUser.nombre,loggedInUser.correo,loggedInUser.contrasena,loggedInUser.telefono,loggedInUser.rol)
           userData.setId(loggedInUser._id)
          }
        document.getElementById('fullName').innerHTML = userData.getNombre();
    } else {
        window.location.href = 'signin.html';
    }
});

