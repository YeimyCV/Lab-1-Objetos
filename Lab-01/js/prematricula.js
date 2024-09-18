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
// Falta validar horario para cada curso(que no se combine la selección)
function agregarCurso(codigo){
    let horario = document.querySelector(`input[name="${codigo}RadioOptions"]:checked`).value;
    let index = matriculados.findIndex(curso => curso.codigo === codigo)
    let indexCursos = cursos.findIndex(curso => curso.codigo === codigo)
    let cursoMatriculado = {...cursos[indexCursos],horario:horario}
    console.log(cursos[index])
    if (index!=-1) {
        console.log("ya existe")
    }
    else {
        matriculados.push(cursoMatriculado)
        mostrarTablaMatriculados()
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
        matriculados.splice(index,1)
        mostrarTablaMatriculados()
    }
    else {
        console.log("no existe")
    }
    console.table(matriculados)
}