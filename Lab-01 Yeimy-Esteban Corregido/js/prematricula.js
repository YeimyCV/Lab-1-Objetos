let matriculados = [];

let cursos = [
    { 
    "curso": "Fundamentos",
    "codigo": "DW001",
    "creditos": "3"  
},
{ 
    "curso": "Diseño",
    "codigo": "DW002",
    "creditos": "2"  
},
{ 
    "curso": "Programación",
    "codigo": "DW003",
    "creditos": "4"  
},
{ 
    "curso": "Bases de datos",
    "codigo": "DW004",
    "creditos": "4"  
},
{ 
    "curso": "Comunicación",
    "codigo": "DW005",
    "creditos": "2"  
}
];

window.addEventListener("load", mostrarTabla())

function mostrarTabla(){
    let tbodyDisponible = document.getElementById("tablaDisponibleBody")
    for (let curso of cursos) {
        let html = `
        <tr>
            <td>${curso.curso}</td>
            <td>${curso.codigo}</td>
            <td>${curso.creditos}</td>
            <td><div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${curso.codigo}RadioOptions" id="${curso.codigo}manana" value="Mañana">
                <label class="form-check-label" for="manana">Mañana</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${curso.codigo}RadioOptions" id="${curso.codigo}tarde" value="Tarde">
                <label class="form-check-label" for="tarde">Tarde</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${curso.codigo}RadioOptions" id="${curso.codigo}noche" value="Noche">
                <label class="form-check-label" for="noche">Noche</label>
                </div></td>
            <td><i class="bi bi-check-circle-fill hoverButton" style="font-size: 25px"  onClick="agregarCurso('${curso.codigo}');"></i></td>
        </tr>`;
    tbodyDisponible.innerHTML+=html
    }  
}

var tooltipHorario = document.getElementById('horarioTooltip')
var tooltip = new bootstrap.Tooltip(tooltipHorario, {
  boundary: document.body,
  trigger:"manual"
})

function agregarCurso(codigo){
    let horario = document.querySelector(`input[name="${codigo}RadioOptions"]:checked`);
    console.log(horario)
    let index = matriculados.findIndex(curso => curso.codigo === codigo)
    let indexCursos = cursos.findIndex(curso => curso.codigo === codigo)
    console.log(cursos[index])
    if (index!=-1) {
        console.log("ya existe")
    }
    else if (!horario) {
        tooltip.show()
    }
    else {
        let cursoMatriculado = {...cursos[indexCursos],horario:horario.value}
        matriculados.push(cursoMatriculado)
        mostrarTablaMatriculados()
        tooltip.hide()
    }
    console.table(matriculados)
    
    
}

function mostrarTablaMatriculados(){
    let tbodyMatriculados = document.getElementById("tablaMatriculadosBody")
    tbodyMatriculados.innerHTML=""
    for (let curso of matriculados) {
        let html = `
        <tr>
            <td>${curso.curso}</td>
            <td>${curso.codigo}</td>
            <td>${curso.creditos}</td>
            <td>${curso.horario}</td>
            <td><i class="bi bi-x-circle-fill hoverButton" style="font-size: 25px;" onClick="excluirCurso('${curso.codigo}');"></i></td>
        </tr>`;
    tbodyMatriculados.innerHTML+=html
    }  
}
function excluirCurso(codigo){
    let index = matriculados.findIndex(curso => curso.codigo === codigo)
    console.log(cursos[index])
    if (index!=-1) {
        confirmarExcluir(index)
    }
    else {
        console.log("no existe")
    }
    console.table(matriculados)
}

function confirmarExcluir (index) {
    swal.fire({
        title: "¿Está seguro que desea eliminar este curso?",
        //text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar de la prematrícula"
      }).then((result) => {
        if (result.isConfirmed) {
            matriculados.splice(index,1)
            mostrarTablaMatriculados()
            Swal.fire({
            title: "Curso eliminado",
            //text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}
    



