// =========================================================
// LA MIGAJA - HOJA 3: PEDIDOS
// =========================================================

const CLAVE_CARRITO = "carritoLaMigaja";

document.addEventListener("DOMContentLoaded", () => {
    cargarTablaPedido();
});

function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function cargarTablaPedido() {
    const carrito = obtenerCarrito();
    const tabla = document.getElementById("tablaPedido");
    const totalElem = document.getElementById("totalPedido");

    if (!tabla) return;

    tabla.innerHTML = "";
    let totalGeneral = 0;

    if (carrito.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    No has agregado productos a tu carrito. 
                    <a href="catalogo.html">Ver catálogo</a>
                </td>
            </tr>`;
        if (totalElem) totalElem.textContent = "0.00";
        return;
    }

    carrito.forEach((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        totalGeneral += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><strong>${prod.nombre}</strong><br><small class="text-muted">${prod.categoria}</small></td>
            <td>$${prod.precio.toFixed(2)}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span>${prod.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    if (totalElem) {
        totalElem.textContent = totalGeneral.toFixed(2);
    }
}

function cambiarCantidad(index, cambio) {
    let carrito = obtenerCarrito();
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        guardarCarrito(carrito);
        cargarTablaPedido();
    }
}

function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    cargarTablaPedido();
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
        localStorage.removeItem(CLAVE_CARRITO);
        cargarTablaPedido();
    }
}

function confirmarPedido(e) {
    e.preventDefault();
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de confirmar.");
        return;
    }

    const nombre = document.getElementById("nombreCliente").value;
    alert(`¡Gracias por tu compra, ${nombre}! Tu pedido ha sido registrado con éxito.`);
    
    localStorage.removeItem(CLAVE_CARRITO);
    window.location.href = "index.html";
}
