const frutas = [
    {id: 1, nombre: "anana", precio: 300, img: "img/anana.jpg"},
    {id: 2, nombre: "arandano", precio: 250, img: "img/arandano.jpg"},
    {id: 3, nombre: "banana", precio: 270, img: "img/banana.jpg"},
    {id: 4, nombre: "frambuesa", precio: 280, img: "img/frambuesa.png"},
    {id: 5, nombre: "frutilla", precio: 500, img: "img/frutilla.jpg"},
    {id: 6, nombre: "kiwi", precio: 450, img: "img/kiwi.jpg"},
    {id: 7, nombre: "manzana", precio: 320, img: "img/manzana.jpg"},
    {id: 8, nombre: "naranja", precio: 350, img: "img/naranja.jpg"},
    {id: 9, nombre: "pera", precio: 370, img: "img/pera.jpg"},
    {id: 10, nombre:"pomelo amarillo", precio: 500, img: "img/pomelo-amarillo.jpg"},
    {id: 11, nombre: "pomelo rojo", precio: 550, img: "img/pomelo-rojo.jpg"},
    {id: 12, nombre: "sandia", precio: 900, img: "img/sandia.jpg"}
];


const contenedor = document.getElementById("contenedorProductos");
// crear objeto alumno y mostrar datos
const alumno = {
    nombre: "Maria Pia",
    apellido: "Franetovich",
    dni: "47083024"
};

// funcion que imprime los datos del alumno
function imprimirDatosAlumno() {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);
    document.getElementById("nombreAlumno").textContent = `${alumno.nombre} ${alumno.apellido}`;
}


// 3
// mostrar productos
function mostrarFrutas(lista) {
    contenedorFrutas.innerHTML = "";
   
    lista.forEach(fruta => {
        const card = document.createElement("div");
        card.classList.add("card-producto");

        const img = document.createElement("img");
        img.src = fruta.imagen;
        img.alt = fruta.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = fruta.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${fruta.precio}`;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregarAlCarrito(fruta));

        card.append(img, titulo, precio, boton);
        contenedor.appendChild(card);
    });
}

// EJERCICIO 4: Filtrar productos

const inputBusqueda = document.getElementById("buscador");
inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    const frutasFiltradas = frutas.filter(fruta =>
            fruta.nombre.toLowerCase().includes(texto)
    );
    mostrarFrutas(frutasFiltradas);
});


// EJERCICIO 5, 6, 7: Carrito y localStorage

let carrito = [];

function agregarAlCarrito(fruta) {
    carrito.push(fruta);
    mostrarCarrito();
    guardarCarrito();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
    guardarCarrito();
}

function mostrarCarrito() {
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.classList.add("bloque-item");

        const p = document.createElement("p");
        p.classList.add("nombre-item");
        p.textContent = `${item.nombre} - $${item.precio}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarProducto(index));

        li.append(p, botonEliminar);
        lista.appendChild(li);
    });

    document.getElementById("contadorCarrito").textContent = `Carrito: ${carrito.length} productos`;
    document.getElementById("total").textContent = `Total: $${total}`;

}
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function cargarCarrito() {
    const datos = localStorage.getItem("carrito");
    if (datos) {
        carrito = JSON.parse(datos);
        mostrarCarrito();
    }
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}
document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);

// ejercicio 8
function ordenarPorNombre() {
    const frutasOrdenadas = [...frutas].sort((a, b) => a.precio - b.precio);
    mostrarFrutas(frutasOrdenadas);
}

// init

function init() {
    imprimirDatosAlumno();
    mostrarFrutas(frutas);
    cargarCarrito();
}

init();