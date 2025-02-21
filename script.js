// Variables globales
let carrito = [];
let totalCompra = 0;

// Función para actualizar el total de la compra
function actualizarTotal() {
    totalCompra = carrito.reduce((total, item) => total + item.precio, 0);
    document.getElementById('total').innerText = `Total: $${totalCompra.toFixed(2)}`;
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = ''; // Limpiar la lista actual

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.nombre} - $${item.precio.toFixed(2)}`;
        
        // Botón para eliminar del carrito
        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.onclick = () => eliminarDelCarrito(item.nombre);
        
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });
}

// Función para agregar un item al carrito
function agregarAlCarrito(nombre, precio) {
    const item = { nombre, precio };
    carrito.push(item);
    actualizarTotal();
    alert(`${nombre} ha sido agregado al carrito.`);
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarTotal();
    mostrarCarrito();
    alert(`${nombre} ha sido eliminado del carrito.`);
}

// Función para enviar el pedido (simulación)
function enviarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No puedes enviar un pedido.');
        return;
    }
    
    // Simulación de envío
    alert(`Pedido enviado con éxito! Total: $${totalCompra.toFixed(2)}`);
    
    // Limpiar el carrito
    carrito = [];
    actualizarTotal();
    mostrarCarrito();
}

// Mostrar/Ocultar el carrito
document.getElementById('mostrar-carrito').onclick = () => {
    document.getElementById('carrito').style.display = 'block';
};

document.getElementById('ocultar-carrito').onclick = () => {
    document.getElementById('carrito').style.display = 'none';
};

// Event listeners para los botones "Agregar al Carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = () => {
        const menuItem = button.parentElement; // Acceder al elemento padre (menu-item)
        const nombre = menuItem.querySelector('.menu-item-titulo').innerText;
        const precioTexto = menuItem.querySelector('.menu-item-precio').innerText;
        const precio = parseFloat(precioTexto.replace('$', '')); // Extraer el precio como número

        agregarAlCarrito(nombre, precio); // Llamar a la función para agregar al carrito
    };
});

// Enviar pedido
document.getElementById('enviar-pedido').onclick = enviarPedido;
