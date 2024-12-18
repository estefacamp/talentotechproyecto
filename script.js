/*
 * Copyright (c) 2024 Your Company Name
 * All rights reserved.
 */
// variable
var cardContainer = document.getElementById('card-container');
var listaCarrito = document.getElementById('lista-carrito');
var vaciarCarritoBtn = document.getElementById('vaciar-carrito');
var comprarBtn = document.getElementById('comprar-btn');

// mostrar productos en el DOM (index.html)
if (cardContainer) {
    for (var i = 1; i <= 18; i++) {
        var cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-4'; // Clase de Bootstrap para columnas

        cardDiv.innerHTML = `
            <div class="card mt-5">
                <img src="https://picsum.photos/300/200?random=${i}" class="card-img-top" alt="Imagen aleatoria">
                <div class="card-body">
                    <h5 class="card-title titulo-item">Producto ${i}</h5>
                    <p class="card-text precio-item">$${i * 100}</p>
                    <button class="boton-item btn btn-primary">Agregar al Carrito</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(cardDiv);
    }

    // agregar funcionalidad a los botones "Agregar al Carrito"
    cardContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('boton-item')) {
            var card = e.target.closest('.card');
            var titulo = card.querySelector('.titulo-item').textContent;
            var precio = parseFloat(card.querySelector('.precio-item').textContent.replace('$', ''));

            // Agregar al carrito
            agregarAlCarrito(titulo, precio);
        }
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(titulo, precio) {
    // Obtener el carrito desde el almacenamiento local
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Crear un objeto producto
    var producto = { titulo: titulo, precio: precio };

    // Agregar el producto al array carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar un alert que confirma que el producto fue agregado al carrito
    alert(`${titulo} ha sido agregado al carrito. Precio: $${precio}`);

    // Actualizar el carrito en el DOM
    actualizarCarrito();
}

// Función para actualizar el carrito en el DOM (carrito.html)
function actualizarCarrito() {
    // Obtener el carrito desde el almacenamiento local
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Limpiar el contenido actual
    listaCarrito.innerHTML = '';

    // Agregar cada producto como un elemento de lista
    carrito.forEach(function (producto, index) {
        var li = document.createElement('li');
        li.textContent = `${producto.titulo} - $${producto.precio}`;

        // Botón para eliminar un producto específico
        var botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger btn-sm ms-2';
        botonEliminar.addEventListener('click', function () {
            eliminarProducto(index);
        });

        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);
    });

    // Mostrar solo un total después de la lista
    var total = carrito.reduce(function (acc, producto) {
        return acc + producto.precio;
    }, 0);

    // Mostrar total solo una vez, fuera del bucle
    var totalElemento = document.getElementById('total');
    if (!totalElemento) {
        totalElemento = document.createElement('p');
        totalElemento.id = 'total'; // Añadimos un id para evitar duplicados
        listaCarrito.appendChild(totalElemento);
    }
    totalElemento.textContent = `${total}`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    // Obtener el carrito desde el almacenamiento local
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Eliminar el producto por índice
    carrito.splice(index, 1);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el carrito en el DOM
    actualizarCarrito();
}

// Vaciar el carrito
if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener('click', function () {
        // Vaciar el carrito en el almacenamiento local
        localStorage.removeItem('carrito');

        // Actualizar el carrito en el DOM
        actualizarCarrito();
    });
}

// Simular el proceso de compra
if (comprarBtn) {
    comprarBtn.addEventListener('click', function () {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            alert('El carrito está vacío. ¡Agrega productos antes de comprar!');
            return;
        }

        alert('Gracias por tu compra. ¡Disfruta tus productos!');

        // Vaciar el carrito después de la compra
        localStorage.removeItem('carrito');

        // Actualizar el carrito en el DOM
        actualizarCarrito();
    });
}

// Inicializar el carrito al cargar la página (carrito.html)
if (listaCarrito) {
    actualizarCarrito();
}

/*toggle busqueda************************************************************************************************/
function toggleSearch() {
    const searchInput = document.getElementById("search-input");
    searchInput.style.display = searchInput.style.display === "block" ? "none" : "block";
}

// ******************************************** formulario**************************************************
const form = document.getElementById("formulario1");
form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;

    // Guardar datos en localStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("dni", dni);
    localStorage.setItem("email", email);
    localStorage.setItem("celular", celular);

    alert("Datos guardados correctamente.");
});

// Redirigir al hacer clic en "Volver"
document.getElementById("volver").addEventListener("click", function () {
    window.location.href = "ingresar.html";
});
