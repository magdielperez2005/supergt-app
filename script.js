document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("lista-carrito")) {
        actualizarCarrito();
    }
});

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " agregado al carrito.");
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalElemento = document.getElementById("total");
    let total = 0;

    if (listaCarrito) {
        listaCarrito.innerHTML = "";
        carrito.forEach((producto, index) => {
            let item = document.createElement("div");
            item.innerHTML = `${producto.nombre} - Q${producto.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            listaCarrito.appendChild(item);
            total += producto.precio;
        });
        totalElemento.textContent = total.toFixed(2);
    }
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function finalizarCompra(event) {
    event.preventDefault();
    

    const nombreCliente = document.getElementById("nombre").value.trim();
    

    if (nombreCliente === "") {
        alert("Por favor, ingrese su nombre antes de finalizar la compra.");
        return;
    }
    

    alert(`Gracias por su compra ${nombreCliente}. Su pedido estará llegando lo más pronto posible.`);
    

    localStorage.removeItem("carrito");
    actualizarCarrito();
}

function finalizarCompra(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const total = document.getElementById("total").innerText.trim();

    if (nombre === "" || telefono === "" || direccion === "" || total === "0") {
        alert("Por favor, complete todos los campos y agregue productos al carrito.");
        return;
    }

    const datos = { nombre, telefono, direccion, total };

    fetch("http://localhost:3000/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    })
    .then(response => response.text())
    .then(mensaje => {
        alert(`Gracias por su compra, ${nombre}. Su pedido estará llegando pronto.`);
        localStorage.removeItem("carrito");  // Limpiar carrito
        actualizarCarrito();  // Esto debe actualizar la vista del carrito
    })
    .catch(error => console.error("Error:", error));
}
