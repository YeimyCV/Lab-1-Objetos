class Usuario {
    constructor(correo, contrasena, nombre,telefono, rol) {
      this.correo = correo;
      this.contrasena = contrasena;
      this.nombre = nombre;
      this.rol = rol;
      this.telefono = telefono;
    }
  
    // Método para obtener el nombre del usuario
    getNombre() {
      return this.nombre;
    }
  
    // Método para obtener el correo del usuario
    getCorreo() {
      return this.correo;
    }
  
    // Método para obtener el rol del usuario
    getRol() {
      return this.rol;
    }
     // Método para obtener el rol del usuario
     getContrasena() {
        return this.contrasena;
      }
        // Método para obtener el rol del usuario
     getTelefono() {
        return this.telefono;
      }
      
      getId() {
        return this.id;
      }

      setId(id) {
        this.id = id;
      }
      setNombre(nombre) {
        this.nombre = nombre;
      }
      setCorreo(correo) {
        this.correo = correo;
      }
      setTelefono(telefono) {
        this.telefono = telefono;
      }
      setContrasena(contrasena) {
        this.contrasena = contrasena;
      }
  }

  class Empleador extends Usuario {
    constructor(nombre, correo, contrasena, telefono, rol) {
      super(correo, contrasena, nombre, telefono,rol);
    }
  }

  class Empleado extends Usuario {
    constructor(nombre, correo, contrasena,telefono, rol) {
      // Llama al constructor de Usuario
      super(correo, contrasena, nombre,telefono, rol);
    }
  }
  
  class Administrador extends Usuario {
    constructor(nombre, correo, contrasena,telefono, rol) {
      // Llama al constructor de Usuario
      super(correo, contrasena, nombre, telefono,rol);
    }
  
    // Métodos adicionales específicos para Administrador pueden agregarse aquí
  }