const productos = [
    { nombre: "Intel Core i7-14700K", categoria: "Procesadores", precio: 1599, imagen: "i7-14700K.jpg" },
    { nombre: "AMD Ryzen 7 3rd Gen", categoria: "Procesadores", precio: 899, imagen: "amdryzen73rdgenprocessor.jpg" },
    { nombre: "MSI GeForce GTX 1050 Ti 4GB", categoria: "Gráficas", precio: 699, imagen: "tarjetadevideo4gbddr5128bitnvidiagtx1050timsi-8gb.jpg" },
    { nombre: "Gigabyte GeForce GTX 1650 Windforce OC 4G", categoria: "Gráficas", precio: 899, imagen: "gigabytegeforcegtx1650windforceoc4g.jpg" },
    { nombre: "Team Group T-Force Vulcan DDR5", categoria: "RAM", precio: 199, imagen: "teamgrouptforcevulcanddr5.jpg" },
    { nombre: "Kingston FURY Beast DDR4", categoria: "RAM", precio: 179, imagen: "KingstonFURYBeastDDR4.jpg" },
    { nombre: "Gigabyte B550M K", categoria: "Placas", precio: 399, imagen: "GigabyteB550MK.jpg" },
    { nombre: "MSI X870 Gaming Plus WiFi", categoria: "Placas", precio: 999, imagen: "msix870gamingpluswifi.jpg" },
    { nombre: "Kingston SSD", categoria: "Almacenamiento", precio: 159, imagen: "kingston.jpg" },
    { nombre: "Kingston NV3 2TB", categoria: "Almacenamiento", precio: 499, imagen: "kingston2tb.jpg" },
    { nombre: "Crucial SSD", categoria: "Almacenamiento", precio: 189, imagen: "crucial.jpg" },
    { nombre: "Samsung SSD", categoria: "Almacenamiento", precio: 299, imagen: "samsung.jpg" },
    { nombre: "Toshiba HDD", categoria: "Almacenamiento", precio: 219, imagen: "toshiba.jpg" },
    { nombre: "WD Blue 1TB", categoria: "Almacenamiento", precio: 239, imagen: "webd.webp" },
    { nombre: "WD Purple 4TB", categoria: "Almacenamiento", precio: 399, imagen: "webd4tb.jpg" },
    { nombre: "Seagate HDD", categoria: "Almacenamiento", precio: 249, imagen: "seagate.jpg" },
    { nombre: "Monitor Teros TE-2764G", categoria: "Monitores", precio: 649, imagen: "TE-2764G.jpg" },
    { nombre: "Monitor Gamer Teros TE-2766G", categoria: "Monitores", precio: 699, imagen: "teroste-2766g.jpg" },
    { nombre: "Monitor LG UltraGear 27G411A-B", categoria: "Monitores", precio: 799, imagen: "monitorlgultragearg427(27G411a-b).jpg" },
    { nombre: "Monitor Gamer Naster-G27", categoria: "Monitores", precio: 749, imagen: "monitorgamernaster-g27fullhd180hz1mspivot.jpg" }
];

let carrito = [];
let categoriaActual = "Todos";

const lista = document.getElementById("listaProductos");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");
const ventana = document.getElementById("ventanaCarrito");

function mostrarProductos() {
    const texto = buscador.value.toLowerCase();

    const encontrados = productos.filter(producto => {
        const coincideCategoria =
            categoriaActual === "Todos" ||
            producto.categoria === categoriaActual;

        return coincideCategoria &&
            producto.nombre.toLowerCase().includes(texto);
    });

    lista.innerHTML = encontrados.map(producto => `
        <article class="producto">
            <div class="imagen-producto">
                <img src="imagenes/${producto.imagen}" alt="${producto.nombre}">
            </div>

            <div class="info">
                <span class="categoria">${producto.categoria}</span>
                <h3>${producto.nombre}</h3>
                <p class="precio">S/ ${producto.precio}</p>

                <button class="agregar"
                    onclick="agregarCarrito('${producto.nombre}')">
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join("");
}

function agregarCarrito(nombre) {
    const producto = productos.find(item => item.nombre === nombre);

    carrito.push(producto);
    actualizarCarrito();

    alert("Producto agregado al carrito");
}

function actualizarCarrito() {
    contador.textContent = carrito.length;

    const items = document.getElementById("itemsCarrito");
    const total = document.getElementById("total");

    if (carrito.length === 0) {
        items.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
        items.innerHTML = carrito.map((producto, indice) => `
            <div class="item">
                <span>
                    ${producto.nombre}<br>
                    <small>S/ ${producto.precio}</small>
                </span>

                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </div>
        `).join("");
    }

    const suma = carrito.reduce(
        (total, producto) => total + producto.precio,
        0
    );

    total.textContent = `S/ ${suma}`;
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {

        document.querySelector(".filtro.activo")
            .classList.remove("activo");

        boton.classList.add("activo");

        categoriaActual = boton.dataset.categoria;

        mostrarProductos();
    });
});

buscador.addEventListener("input", mostrarProductos);

document.getElementById("botonCarrito").addEventListener("click", () => {
    ventana.classList.add("mostrar");
});

document.getElementById("cerrarCarrito").addEventListener("click", () => {
    ventana.classList.remove("mostrar");
});

ventana.addEventListener("click", evento => {
    if (evento.target === ventana) {
        ventana.classList.remove("mostrar");
    }
});

document.getElementById("comprar").addEventListener("click", () => {

    if (carrito.length === 0) {
        alert("Agrega productos antes de finalizar la compra.");
    } else {
        alert("¡Compra registrada! Gracias por comprar en Nexus PC.");

        carrito = [];

        actualizarCarrito();
    }
});

document.getElementById("formulario").addEventListener("submit", evento => {

    evento.preventDefault();

    alert("Mensaje enviado correctamente.");

    evento.target.reset();
});

mostrarProductos();
actualizarCarrito();