const title = document.getElementById("title")
const country = document.getElementById("country")
const locationlabel = document.getElementById("location")
const city = document.getElementById("city")
const salary = document.getElementById("salary")
const habilidadesContainer = document.getElementById("habilidades")
const responsabilidadesContainer = document.getElementById("responsabilidades")
const experiencia = document.getElementById("experiencia")
const requisitosEducativos = document.getElementById("requisitosEducativos")
const descripcion = document.getElementById("descripcion")
const trabajo = JSON.parse(localStorage.getItem('trabajo'))

title.innerHTML=trabajo.title
country.innerHTML=trabajo.country
locationlabel.innerHTML=trabajo.location
city.innerHTML=trabajo.city
salary.innerHTML=trabajo.salary
experiencia.innerHTML = trabajo.experiencia.experiencia1
requisitosEducativos.innerHTML = trabajo.requisitosEducativos.requisitoEducativo1
descripcion.innerHTML = trabajo.descripcion
let habilidades = trabajo.habilidades
let responsabilidades = trabajo.responsabilidades
for (const key in habilidades ) {
    if (habilidades.hasOwnProperty(key)) {
        let html = `<li class="list-group-item d-flex mb-0"><i class="bi bi-patch-check text-primary me-2"></i>${habilidades[key]}</li>`
        habilidadesContainer.innerHTML+= html;
    }
  }
  for (const key in responsabilidades ) {
    if (responsabilidades.hasOwnProperty(key)) {
        let html = `<li class="list-group-item d-flex mb-0"><i class="bi bi-patch-check text-primary me-2"></i>${responsabilidades[key]}</li>`
        responsabilidadesContainer.innerHTML+= html;
    }
  }

  
  