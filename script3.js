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
// MOSTRAR RESUMEN
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


    // Variable para almacenar el subtotal.
    let subtotal = 0;


    // Recorremos todos los productos.
    carrito.forEach(function(producto) {

        // Calculamos el subtotal del producto.
        const subtotalProducto =
            producto.precio * producto.cantidad;


        subtotal += subtotalProducto;


        // Buscamos la imagen correspondiente.
        const imagen =
            imagenesProductos[producto.nombre]
            || "https://static.vecteezy.com/system/resources/previews/017/625/331/non_2x/bread-icon-simple-style-bread-company-big-sale-poster-background-symbol-bread-brand-logo-design-element-bread-t-shirt-printing-bread-for-sticker-vector.jpg";


        // Creamos el elemento.
        const elemento =
            document.createElement("div");


        elemento.className =
            "producto-resumen border-bottom pb-3 mb-3";


        // Información del producto.
        elemento.innerHTML = `

            <div class="d-flex align-items-center gap-3">

                <!-- Imagen -->

                <img
                    src="${imagen}"
                    alt="${producto.nombre}"
                    class="imagen-producto-pedido"
                >


                <!-- Información -->

                <div class="flex-grow-1">

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


                <!-- Subtotal -->

                <span class="fw-bold text-nowrap">

                    ${formatoMoneda(subtotalProducto)}

                </span>

            </div>

        `;


        // Agregamos el producto.
        resumen.appendChild(elemento);

    });


    // Costo de envío.
    const envio =
        document.getElementById("envio").checked
            ? 50
            : 0;


    // Total.
    const total =
        subtotal + envio;


    // Mostrar cantidades.
    subtotalElemento.textContent =
        formatoMoneda(subtotal);

    envioElemento.textContent =
        envio === 0
            ? "Gratis"
            : formatoMoneda(envio);

    totalElemento.textContent =
        formatoMoneda(total);

}


// =====================================================
// TIPO DE ENTREGA
// =====================================================

function actualizarTipoEntrega() {

    const envio =
        document.getElementById("envio");

    const recogida =
        document.getElementById("recogida");

    const datosDireccion =
        document.getElementById("datosDireccion");

    const sucursal =
        document.getElementById("sucursal");

    const contenedorSucursal =
        document.getElementById("contenedorSucursal");


    // Campos de dirección.
    const calle =
        document.getElementById("calle");

    const numero =
        document.getElementById("numero");

    const colonia =
        document.getElementById("colonia");

    const codigoPostal =
        document.getElementById("codigoPostal");

    const municipio =
        document.getElementById("municipio");


    // Si selecciona envío.
    if (envio.checked) {

        datosDireccion.style.display = "block";

        contenedorSucursal.style.display = "none";

        calle.required = true;
        numero.required = true;
        colonia.required = true;
        codigoPostal.required = true;
        municipio.required = true;

        sucursal.required = false;

    }


    // Si selecciona recogida.
    else if (recogida.checked) {

        datosDireccion.style.display = "none";

        contenedorSucursal.style.display = "block";

        calle.required = false;
        numero.required = false;
        colonia.required = false;
        codigoPostal.required = false;
        municipio.required = false;

        sucursal.required = true;

    }


    // Actualizamos el resumen.
    mostrarResumen();


    // Actualizamos mensaje de pago.
    actualizarMensajePago();

}


// =====================================================
// MENSAJE DE PAGO
// =====================================================

function actualizarMensajePago() {

    const envio =
        document.getElementById("envio");

    const mensajePago =
        document.getElementById("mensajePago");


    const pagoSeleccionado =
        document.querySelector(
            'input[name="pago"]:checked'
        );


    if (!pagoSeleccionado) {
        return;
    }


    if (
        envio.checked &&
        pagoSeleccionado.value === "Efectivo"
    ) {

        mensajePago.textContent =
            "Puedes pagar en efectivo directamente al repartidor al recibir tu pedido.";

    }

    else if (
        envio.checked &&
        pagoSeleccionado.value === "Terminal"
    ) {

        mensajePago.textContent =
            "El repartidor llevará una terminal para realizar el pago al momento de la entrega.";

    }

    else if (
        !envio.checked &&
        pagoSeleccionado.value === "Efectivo"
    ) {

        mensajePago.textContent =
            "Puedes pagar en efectivo al recoger tu pedido en la sucursal.";

    }

    else {

        mensajePago.textContent =
            "Puedes realizar el pago con terminal al recoger tu pedido.";

    }

}


// =====================================================
// CONFIRMAR PEDIDO
// =====================================================

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


    // Obtenemos algunos datos.
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


    // Obtenemos sucursal.
    let informacionEntrega = entrega;


    if (entrega === "Envío") {

        informacionEntrega =
            "Envío a domicilio";

    }

    else {

        const sucursal =
            document.getElementById("sucursal").value;

        informacionEntrega =
            "Recogida en " + sucursal;

    }


    // Mostramos mensaje de confirmación.
    mensaje.innerHTML = `

        <div class="alert alert-success">

            <h2 class="h5">
                ¡Pedido confirmado!
            </h2>

            <p class="mb-1">
                Gracias, ${nombre}.
            </p>

            <p class="mb-1">
                ${informacionEntrega}
            </p>

            <p class="mb-0">
                Forma de pago: ${pago}.
            </p>

            <hr>

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

    actualizarMensajePago();

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


        // Detectar cambios en forma de pago.
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


        // Detectar el envío del formulario.
        document
            .getElementById("formPedido")
            .addEventListener(
                "submit",
                confirmarPedido
            );

    }
);
