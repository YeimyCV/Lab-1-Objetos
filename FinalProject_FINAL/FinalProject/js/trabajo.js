class Trabajo {
    constructor(publishBy, title, company, location, city, country, type, categoria, salary, url, habilidades, responsabilidades, experiencia, requisitosEducativos, descripcion) {
        this.publishBy = publishBy;
        this.title = title;
        this.company = company;
        this.location = location;
        this.city = city;
        this.country = country;
        this.type = type;
        this.categoria = categoria;
        this.salary = salary;
        this.url = url;
        this.habilidades = habilidades;
        this.responsabilidades = responsabilidades;
        this.experiencia = experiencia;
        this.requisitosEducativos = requisitosEducativos;
        this.descripcion = descripcion;
      }
    
      // Getters
      getPublishBy() {
        return this.publishBy;
      }
      getTitle() {
        return this.title;
      }
      getCompany() {
        return this.company;
      }
      getLocation() {
        return this.location;
      }
      getCity() {
        return this.city;
      }
      getCountry() {
        return this.country;
      }
      getType() {
        return this.type;
      }
      getCategoria() {
        return this.categoria;
      }
      getSalary() {
        return this.salary;
      }
      getUrl() {
        return this.url;
      }
      getHabilidades() {
        return this.habilidades;
      }
      getResponsabilidades() {
        return this.responsabilidades;
      }
      getExperiencia() {
        return this.experiencia;
      }
      getRequisitosEducativos() {
        return this.requisitosEducativos;
      }
      getDescripcion() {
        return this.descripcion;
      }
    
      // Setters
      setPublishBy(publishBy) {
        this.publishBy = publishBy;
      }
      setTitle(title) {
        this.title = title;
      }
      setCompany(company) {
        this.company = company;
      }
      setLocation(location) {
        this.location = location;
      }
      setCity(city) {
        this.city = city;
      }
      setCountry(country) {
        this.country = country;
      }
      setType(type) {
        this.type = type;
      }
      setCategoria(categoria) {
        this.categoria = categoria;
      }
      setSalary(salary) {
        this.salary = salary;
      }
      setUrl(url) {
        this.url = url;
      }
      setHabilidades(habilidades) {
        this.habilidades = habilidades;
      }
      setResponsabilidades(responsabilidades) {
        this.responsabilidades = responsabilidades;
      }
      setExperiencia(experiencia) {
        this.experiencia = experiencia;
      }
      setRequisitosEducativos(requisitosEducativos) {
        this.requisitosEducativos = requisitosEducativos;
      }
      setDescripcion(descripcion) {
        this.descripcion = descripcion;
      }
    }
  

  class Aplicacion {
    constructor(idPostulacion,nombre, correo, telefono, cv, mensaje) {
      this.idPostulacion = idPostulacion
      this.nombre = nombre;
      this.correo = correo;
      this.telefono = telefono;
      this.cv = cv; // Representa la ruta o el archivo del CV
      this.mensaje = mensaje; // Mensaje adicional del solicitante
    }
  }

  