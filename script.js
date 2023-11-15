/* 
*   Lo que hace el código es mostrar los cursos disponibles con su precio y un botón de agregar,
*   al añadir un curso se muestra el precio que se debe pagar y si se agrega otro se sumarán los precios.
*/


// Carrito y totalCesta vacíos ya que no se ha seleccionado nada
let carrito = [];
let totalCesta = 0.0;

// Cursos:
const disenioWeb = {
    idCurso: 1,
    nombre: "Diseño Web",
    profesor: "Juan Pérez",
    precio: 199.90
};

const programacionBackend = {
    idCurso: 2,
    nombre: "Programación Backend",
    profesor: "María Suarez",
    precio: 299.90
};

const javaEe = {
    idCurso: 3,
    nombre: "Java EE",
    profesor: "Miriam López",
    precio: 249.90
};

// Hacemos una copia del Array cursos para al eliminar un elemento no afectar el orden
let cursos = [disenioWeb, programacionBackend, javaEe];
let cursosArrayCopy = [disenioWeb, programacionBackend, javaEe];

// Seleccionamos el elemento del DOM donde se mostrarán los cursos
let catalogo = document.querySelector(".catalogo");

// Agregamos un input para el filtro de búsqueda
let filtro = document.createElement("input");
filtro.setAttribute("type", "text");
filtro.setAttribute("id", "filtro");
filtro.setAttribute("placeholder", "Buscar curso...");
catalogo.insertBefore(filtro, catalogo.firstChild);

// Agregamos un controlador de eventos al input para filtrar los cursos
filtro.addEventListener('keyup', function() {
    let valorFiltro = filtro.value.toUpperCase();
    let cursosDiv = document.querySelectorAll(".catalogo div");

    // Recorremos todos los cursos y ocultamos los que no coinciden con la búsqueda
    cursosDiv.forEach((cursoDiv) => {
        let nombre = cursoDiv.querySelector("h2").textContent;
        if (nombre.toUpperCase().indexOf(valorFiltro) > -1) {
            cursoDiv.style.display = "";
        } else {
            cursoDiv.style.display = "none";
        }
    });
});

// Hacemos un Array dinámico para en un futuro agregar más cursos
cursosArrayCopy.forEach((curso, index) => {
    let cursoDiv = document.createElement("div");
    cursoDiv.innerHTML = `
        <h2>${curso.nombre}</h2>
        <p>Profesor: ${curso.profesor}</p>
        <p>Precio: ${curso.precio.toFixed(2)}</p>
        <button id="btn${index}">AÑADIR A LA CESTA</button>
    `;
    catalogo.appendChild(cursoDiv);

    // Controlador de eventos a cada botón
    document.getElementById(`btn${index}`).addEventListener('click', function() {
        aniadirCesta(index);
    })
});

let carritoHtml = document.querySelector(".carrito");
let carritoDiv = document.createElement("p");
carritoHtml.appendChild(carritoDiv);

let cesta = document.querySelector(".cesta");
let cestaDiv = document.createElement("p");
cesta.appendChild(cestaDiv);

// Función para añadir un curso al carrito y actualizar el contenido del carrito y la cesta
function aniadirCesta(index) {
    carrito.push(cursosArrayCopy[index]);
    let cursoDiv = document.getElementById(`btn${index}`).parentNode;
    cursoDiv.parentNode.removeChild(cursoDiv);

    cursos = cursos.filter((curso, cursoId) => cursoId != index);

    carritoDiv.innerHTML = `Carrito: ${carrito.map(curso => curso.nombre).join(', ')}`;
    
    totalCesta = carrito.reduce((accum, curso) => accum + curso.precio, 0);
    cestaDiv.innerHTML = `Precio: ${totalCesta.toFixed(2)}`;
}






