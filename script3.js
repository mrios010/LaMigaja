// =====================================================
// LA MIGAJA - HOJA 3: PEDIDOS
// =====================================================

// Esta es la misma clave utilizada en la Hoja 2.
const CLAVE_CARRITO = "carritoLaMigaja";


// =====================================================
// IMÁGENES DE LOS PRODUCTOS
// =====================================================

const imagenesProductos = {

    "Chocolatín":
        "https://www.cocinadelirante.com/sites/default/files/images/2023/02/como-hacer-chocolatines-hojaldre-recien-horneados.jpg",

    "Concha":
        "https://www.elglobo.com.mx/cdn/shop/files/ConchaChocolate_1200x.jpg?v=1771809013",

    "Mantecada":
        "https://cdn7.kiwilimon.com/recetaimagen/30185/640x640/32621.jpg.jpg",

    "Rebanada":
        "https://www.maricruzavalos.com/wp-content/uploads/2023/11/rebanadas-de-mantequilla-recipe.jpg",

    "Red Velvet":
        "https://tofuu.getjusto.com/orioneat-local/resized2/R3HA5X3bARBaoWK3c-1000-x.webp",

    "Pie de Limón":
        "https://www.goodnes.com/sites/g/files/jgfbjl321/files/srh_recipes/2789a84fb196e18212da63faf1995f84.jpg",

    "Fudge":
        "https://content-cocina.lecturas.com/medio/2023/03/23/el-mejor-pastel-de-chocolate_24bd9cda_1200x1200.jpg",

    "Pastel de Zanahoria":
        "https://www.eldelicioso.mx/web/image/product.product/1431/image_1920?unique=8e3da85",

    "Bolillo":
        "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/578e5fc21d0879ec93c3d87fded6befe/Derivates/39d721a254444200a3dc9b97aa4d7b6d90a1a4e1.jpg",

    "Telera":
        "https://www.maricruzavalos.com/wp-content/uploads/2023/02/telera-roll-bread-recipe.jpg",

    "Baguette":
        "https://abmauri.es/wp-content/uploads/2021/03/baguette-ab-mauri.jpg",

    "Cemita":
        "https://grupolaflorida.com/wp-content/uploads/2021/09/receta-cemitas.jpg",

    "Pan de muerto":
        "https://www.elglobo.com.mx/cdn/shop/articles/pan_de_muerto_naranja.jpg?v=1664822853",

    "Galleta de jengibre":
        "https://recipesblob.oetker.es/assets/2e9c2a34d32346d29d9707c5dc96e7fb/750x910/galletas-de-jengibre.jpg",

    "Pan de calabaza":
        "https://www.verybestbaking.com/sites/g/files/jgfbjl326/files/srh_recipes/28965a11073997811217205da0aa8276.jpg",

    "Pan de higo":
        "https://comedera.com/wp-content/uploads/sites/9/2022/04/pan-de-higo.jpg"
};


// =====================================================
// OBTENER CARRITO
// =====================================================

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem(CLAVE_CARRITO)
    ) || [];

}


// =====================================================
// FORMATO DE MONEDA
// =====================================================

function formatoMoneda(cantidad) {

    return cantidad.toLocaleString("es-MX", {

        style: "currency",

        currency: "MXN"

    });

}


// =====================================================
// MOSTRAR RESUMEN DEL CARRITO
// =====================================================

function mostrarResumen() {

    const carrito = obtenerCarrito();

    const resumen =
        document.getElementById("resumenCarrito");

    const subtotalElemento =
        document.getElementById("subtotalPedido");

    const envioElemento =
        document.getElementById("envioPedido");

    const totalElemento =
        document.getElementById("totalPedido");


    // Limpiamos el contenido anterior.
    resumen.innerHTML = "";


    // Si no hay productos.
    if (carrito.length === 0) {

        resumen.innerHTML = `
            <div class="alert alert-warning">

                Tu carrito está vacío.

                <br>

                Regresa al catálogo para agregar productos.

            </div>
        `;

        subtotalElemento.textContent =
            formatoMoneda(0);

        envioElemento.textContent =
            formatoMoneda(0);

        totalElemento.textContent =
            formatoMoneda(0);

        return;

    }


    // Subtotal de los productos.
    let subtotalGeneral = 0;


    // Recorremos los productos.
    carrito.forEach(function(producto, indice) {

        const subtotalProducto =
            producto.precio * producto.cantidad;


        subtotalGeneral += subtotalProducto;


        // Imagen del producto.
        const imagen =
            imagenesProductos[producto.nombre] ||
            "https://cdn-icons-png.flaticon.com/512/992/992661.png";


        // Creamos el elemento.
        const elemento =
            document.createElement("div");


        elemento.className =
            "producto-carrito";


        elemento.innerHTML = `

            <img
                src="${imagen}"
                alt="${producto.nombre}"
                class="imagen-producto-pedido"
            >

            <div class="info-producto">

                <h3 class="h6 mb-1">
                    ${producto.nombre}
                </h3>

                <p class="precio-unitario">
                    ${formatoMoneda(producto.precio)} c/u
                </p>


                <div class="controles-cantidad">

                    <button
                        type="button"
                        class="btn-cantidad"
                        onclick="disminuirCantidad(${indice})"
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>


                    <span class="cantidad-producto">
                        ${producto.cantidad}
                    </span>


                    <button
                        type="button"
                        class="btn-cantidad"
                        onclick="aumentarCantidad(${indice})"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="btn-eliminar"
                        onclick="eliminarProducto(${indice})"
                        aria-label="Eliminar producto"
                        title="Eliminar producto"
                    >
                        🗑️
                    </button>

                </div>

            </div>


            <div class="precio-producto">

                ${formatoMoneda(subtotalProducto)}

            </div>

        `;


        resumen.appendChild(elemento);

    });


    // =====================================================
    // CALCULAR ENVÍO
    // =====================================================

    const envioSeleccionado =
        document.getElementById("envio");


    let costoEnvio = 0;


    if (
        envioSeleccionado &&
        envioSeleccionado.checked
    ) {

        // Costo de envío simulado.
        costoEnvio = 10;

    }


    // =====================================================
    // MOSTRAR TOTALES
    // =====================================================

    subtotalElemento.textContent =
        formatoMoneda(subtotalGeneral);


    envioElemento.textContent =
        formatoMoneda(costoEnvio);


    totalElemento.textContent =
        formatoMoneda(
            subtotalGeneral + costoEnvio
        );

}


// =====================================================
// AUMENTAR CANTIDAD
// =====================================================

function aumentarCantidad(indice) {

    const carrito =
        obtenerCarrito();


    if (!carrito[indice]) {
        return;
    }


    carrito[indice].cantidad++;


    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );


    mostrarResumen();

}


// =====================================================
// DISMINUIR CANTIDAD
// =====================================================

function disminuirCantidad(indice) {

    const carrito =
        obtenerCarrito();


    if (!carrito[indice]) {
        return;
    }


    carrito[indice].cantidad--;


    // Si llega a cero, eliminamos el producto.
    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }


    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );


    mostrarResumen();

}


// =====================================================
// ELIMINAR PRODUCTO
// =====================================================

function eliminarProducto(indice) {

    const carrito =
        obtenerCarrito();


    if (!carrito[indice]) {
        return;
    }


    carrito.splice(indice, 1);


    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );


    mostrarResumen();

}


// =====================================================
// TIPO DE ENTREGA
// =====================================================

function actualizarTipoEntrega() {

    const envio =
        document.getElementById("envio");

    const datosDireccion =
        document.getElementById("datosDireccion");

    const contenedorSucursal =
        document.getElementById("contenedorSucursal");


    // Si es envío.
    if (envio.checked) {

        datosDireccion.style.display =
            "block";

        contenedorSucursal.style.display =
            "none";


        // Hacer obligatorios los campos de dirección.
        document
            .querySelectorAll(
                "#datosDireccion input"
            )
            .forEach(function(campo) {

                campo.required = true;

            });

    }


    // Si es recogida.
    else {

        datosDireccion.style.display =
            "none";

        contenedorSucursal.style.display =
            "block";


        // La dirección deja de ser obligatoria.
        document
            .querySelectorAll(
                "#datosDireccion input"
            )
            .forEach(function(campo) {

                campo.required = false;

            });

    }


    // Actualizamos el resumen porque
    // el costo de envío puede cambiar.
    mostrarResumen();


    // Actualizamos el mensaje de pago.
    actualizarMensajePago();

}


// =====================================================
// MENSAJE DEL MÉTODO DE PAGO
// =====================================================

function actualizarMensajePago() {

    const envio =
        document.getElementById("envio");

    const efectivo =
        document.getElementById("efectivo");

    const mensajePago =
        document.getElementById("mensajePago");


    if (envio.checked && efectivo.checked) {

        mensajePago.textContent =
            "Puedes pagar en efectivo directamente al repartidor.";

    }

    else if (
        envio.checked &&
        !efectivo.checked
    ) {

        mensajePago.textContent =
            "El repartidor llevará una terminal para realizar el pago.";

    }

    else if (
        !envio.checked &&
        efectivo.checked
    ) {

        mensajePago.textContent =
            "Puedes pagar en efectivo al recoger tu pedido en la sucursal.";

    }

    else {

        mensajePago.textContent =
            "Puedes pagar con terminal al recoger tu pedido en la sucursal.";

    }

}


// =====================================================
// CONFIRMAR PEDIDO
// =====================================================

function confirmarPedido(evento) {

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

                <br>

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


    // Datos básicos.
    const nombre =
        document.getElementById("nombre").value;

    const entrega =
        document.querySelector(
            'input[name="entrega"]:checked'
        ).value;

    const pago =
        document.querySelector(
            'input[name="pago"]:checked'
        ).value;


    // =====================================================
    // INFORMACIÓN DE ENTREGA
    // =====================================================

    let informacionEntrega = "";


    if (entrega === "Envío") {

        const calle =
            document.getElementById("calle").value;

        const numero =
            document.getElementById("numero").value;

        const colonia =
            document.getElementById("colonia").value;

        const codigoPostal =
            document.getElementById("codigoPostal").value;

        const municipio =
            document.getElementById("municipio").value;


        informacionEntrega =
            `Dirección de entrega: ${calle} ${numero}, ${colonia}, C.P. ${codigoPostal}, ${municipio}.`;

    }

    else {

        const sucursal =
            document.getElementById("sucursal").value;

        informacionEntrega =
            `Sucursal seleccionada: ${sucursal}.`;

    }


    // =====================================================
    // MENSAJE DE CONFIRMACIÓN
    // =====================================================

    mensaje.innerHTML = `

        <div class="alert alert-success">

            <h2 class="h5">
                ¡Pedido confirmado!
            </h2>

            <p class="mb-2">
                Gracias, ${nombre}.
                Tu pedido fue registrado correctamente.
            </p>

            <p class="mb-1">
                <strong>Entrega:</strong>
                ${entrega}
            </p>

            <p class="mb-1">
                <strong>Pago:</strong>
                ${pago}
            </p>

            <p class="mb-0">
                ${informacionEntrega}
            </p>

            <hr>

            <small>
                Esta página simula el proceso de compra
                y no realiza ningún cobro real.
            </small>

        </div>

    `;


    // =====================================================
    // LIMPIAR CARRITO
    // =====================================================

    localStorage.removeItem(
        CLAVE_CARRITO
    );


    // Limpiar formulario.
    formulario.reset();


    // Volver a seleccionar envío.
    document.getElementById("envio").checked =
        true;


    // Actualizar interfaz.
    actualizarTipoEntrega();

    actualizarMensajePago();

    mostrarResumen();


    // Regresar al inicio.
    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =====================================================
// INICIO DEL PROGRAMA
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // Mostrar carrito.
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


        // Detectar cambios en el método de pago.
        document
            .querySelectorAll(
                'input[name="pago"]'
            )
            .forEach(function(radio) {

                radio.addEventListener(
                    "change",
                    actualizarMensajePago
                );

            });


        // Detectar envío del formulario.
        document
            .getElementById("formPedido")
            .addEventListener(
                "submit",
                confirmarPedido
            );


    }
);
