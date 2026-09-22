javascript
// =====================================================
// CARRITO DE LA MIGaja
// =====================================================

// Esta es la misma clave utilizada en la Hoja 2.
const CLAVE_CARRITO = "carritoLaMigaja";


// =====================================================
// OBTENER CARRITO
// =====================================================

// Obtiene los productos guardados en localStorage.
function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem(CLAVE_CARRITO)
    ) || [];

}


// =====================================================
// FORMATO DE MONEDA
// =====================================================

// Convierte los precios al formato de moneda mexicana.
function formatoMoneda(cantidad) {

    return cantidad.toLocaleString("es-MX", {

        style: "currency",

        currency: "MXN"

    });

}


// =====================================================
// MOSTRAR RESUMEN
// =====================================================

// Muestra los productos que fueron agregados desde el catálogo.
function mostrarResumen() {

    const carrito = obtenerCarrito();

    const resumen =
        document.getElementById("resumenCarrito");

    const totalElemento =
        document.getElementById("totalPedido");


    // Limpiamos el contenido anterior.
    resumen.innerHTML = "";


    // Si no hay productos.
    if (carrito.length === 0) {

        resumen.innerHTML = `
            <div class="alert alert-warning">

                Tu carrito está vacío.

                Regresa al catálogo para agregar productos.

            </div>
        `;

        totalElemento.textContent =
            formatoMoneda(0);

        return;

    }


    // Variable para almacenar el total.
    let total = 0;


    // Recorremos todos los productos.
    carrito.forEach(function(producto) {


        // Calculamos el subtotal.
        const subtotal =
            producto.precio * producto.cantidad;


        // Sumamos el subtotal al total.
        total += subtotal;


        // Creamos un elemento para el producto.
        const elemento =
            document.createElement("div");


        elemento.className =
            "border-bottom pb-3 mb-3";


        // Información que aparecerá en pantalla.
        elemento.innerHTML = `

            <div class="d-flex justify-content-between gap-3">

                <div>

                    <h3 class="h6 mb-1">
                        ${producto.nombre}
                    </h3>

                    <p class="mb-1 text-muted">
                        Cantidad: ${producto.cantidad}
                    </p>

                    <p class="mb-0 text-muted">
                        Precio:
                        ${formatoMoneda(producto.precio)}
                    </p>

                </div>


                <span class="fw-bold">

                    ${formatoMoneda(subtotal)}

                </span>

            </div>

        `;


        // Agregamos el producto al resumen.
        resumen.appendChild(elemento);

    });


    // Mostramos el total.
    totalElemento.textContent =
        formatoMoneda(total);

}


// =====================================================
// TIPO DE ENTREGA
// =====================================================

// Cambia la obligatoriedad de la dirección.
function actualizarTipoEntrega() {

    const envio =
        document.getElementById("envio");

    const direccion =
        document.getElementById("direccion");

    const textoDireccion =
        document.getElementById("textoDireccion");


    // Si el usuario seleccionó envío.
    if (envio.checked) {

        direccion.required = true;

        textoDireccion.textContent =
            "La dirección es necesaria para pedidos con envío.";

    }


    // Si el usuario seleccionó recogida.
    else {

        direccion.required = false;

        textoDireccion.textContent =
            "Para recoger en sucursal, la dirección no es obligatoria.";

    }

}


// =====================================================
// CONFIRMAR PEDIDO
// =====================================================

// Valida el formulario y simula la confirmación.
function confirmarPedido(evento) {

    // Evita que la página se recargue.
    evento.preventDefault();


    const formulario =
        document.getElementById("formPedido");

    const carrito =
        obtenerCarrito();

    const mensaje =
        document.getElementById("mensajePedido");


    // Verificamos que haya productos.
    if (carrito.length === 0) {

        mensaje.innerHTML = `

            <div class="alert alert-warning">

                No puedes confirmar un pedido vacío.

                Agrega productos desde el catálogo.

            </div>

        `;

        return;

    }


    // Verificamos los campos obligatorios.
    if (!formulario.checkValidity()) {

        formulario.classList.add(
            "was-validated"
        );

        return;

    }


    // Mostramos mensaje de confirmación.
    mensaje.innerHTML = `

        <div class="alert alert-success">

            <h2 class="h5">
                ¡Pedido confirmado!
            </h2>

            <p class="mb-0">

                Tu pedido fue registrado correctamente.

                Esta página simula el proceso de compra
                y no realiza ningún cobro real.

            </p>

        </div>

    `;


    // Limpiamos el carrito.
    localStorage.removeItem(
        CLAVE_CARRITO
    );


    // Limpiamos el formulario.
    formulario.reset();


    // Volvemos a seleccionar "Envío".
    document.getElementById("envio").checked = true;


    // Actualizamos la interfaz.
    actualizarTipoEntrega();

    mostrarResumen();


    // Regresamos al inicio de la página.
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =====================================================
// INICIO DEL PROGRAMA
// =====================================================

// Ejecuta estas funciones cuando carga la página.
document.addEventListener(
    "DOMContentLoaded",
    function() {


        // Mostrar productos.
        mostrarResumen();


        // Revisar tipo de entrega.
        actualizarTipoEntrega();


        // Detectar cambios entre envío y recogida.
        document
            .querySelectorAll(
                'input[name="entrega"]'
            )
            .forEach(function(radio) {

                radio.addEventListener(
                    "change",
                    actualizarTipoEntrega
                );

            });


        // Detectar el envío del formulario.
        document
            .getElementById("formPedido")
            .addEventListener(
                "submit",
                confirmarPedido
            );

    }
);
