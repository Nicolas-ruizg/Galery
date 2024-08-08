const contenedorFotos = document.getElementById("container");
const inputUrlImagen = document.getElementById("urlInput");
const inputTituloImagen = document.getElementById("imgTitle");
const inputDescripcionImagen = document.getElementById("imgDesc");

const botonAgregar = document.getElementById("addPhoto");

botonAgregar.addEventListener("click", () => {
    let urlImagen = inputUrlImagen.value;
    let tituloImagen = inputTituloImagen.value;
    let descripcionImagen = inputDescripcionImagen.value;
    let urlValida;

    try {
        urlValida = new URL(urlImagen);
    } catch {
        urlValida = false;
    }

    if (urlValida) {
        // Crear elementos
        const elementoEncabezado = document.createElement("h1");
        elementoEncabezado.classList.add("tituloImagen");
        elementoEncabezado.innerHTML = tituloImagen;

        const elementoImagen = document.createElement("img");
        elementoImagen.src = urlImagen;
        elementoImagen.alt = "Imagen";
        elementoImagen.classList.add("imagenClase");

        const elementoDescripcion = document.createElement("h2");
        elementoDescripcion.classList.add("descripcionImagen", "oculto");
        elementoDescripcion.innerHTML = descripcionImagen;

        // Botón Ver Detalles
        const botonVerDetalles = document.createElement("button");
        botonVerDetalles.innerText = "Ver Detalles";
        botonVerDetalles.classList.add("botonVerDetallesClase");
        botonVerDetalles.addEventListener("click", () => {
            const modalContenedor = document.createElement("div");
            modalContenedor.classList.add("modalContainer");

            const modalContenido = document.createElement("div");
            modalContenido.classList.add("modalContent");

            const botonCerrar = document.createElement("button");
            botonCerrar.innerText = "Cerrar";
            botonCerrar.classList.add("botonCerrarClase");
            botonCerrar.addEventListener("click", () => {
                document.body.removeChild(modalContenedor);
            });

            const imagenClonada = elementoImagen.cloneNode(true);
            imagenClonada.classList.remove("imagenClase");
            imagenClonada.classList.add("modalImagen");

            const tituloClonado = elementoEncabezado.cloneNode(true);
            tituloClonado.classList.remove("tituloImagen");
            tituloClonado.classList.add("modalTitulo");

            const descripcionClonada = elementoDescripcion.cloneNode(true);
            descripcionClonada.classList.remove("oculto", "descripcionImagen");
            descripcionClonada.classList.add("modalDescripcion");

            modalContenido.appendChild(imagenClonada);
            modalContenido.appendChild(tituloClonado);
            modalContenido.appendChild(descripcionClonada);

            modalContenedor.appendChild(modalContenido);
            modalContenedor.appendChild(botonCerrar);

            document.body.insertBefore(modalContenedor, document.body.firstChild);
        });

        // Botón Eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.classList.add("botonEliminarClase");
        botonEliminar.addEventListener("click", () => {
            contenedorFoto.style.opacity = "0";
            setTimeout(() => {
                contenedorFotos.removeChild(contenedorFoto);
            }, 300);
        });

        // Botón Editar
        const botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.classList.add("botonEditarClase");
        botonEditar.addEventListener("click", () => {
            const nuevoUrl = prompt("Ingrese la nueva URL de la imagen:", elementoImagen.src);
            const nuevoTitulo = prompt("Ingrese el nuevo título de la imagen:", elementoEncabezado.textContent);
            if (nuevoUrl) {
                elementoImagen.src = nuevoUrl;
            }
            if (nuevoTitulo) {
                elementoEncabezado.textContent = nuevoTitulo;
            }
        });

        // Contenedor de la imagen y sus elementos
        const contenedorFoto = document.createElement("div");
        contenedorFoto.classList.add("contenedorFotoClase");

        // Contenedor de los botones
        const contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("contenedorBotonesClase");

        contenedorFoto.appendChild(elementoImagen);
        contenedorFoto.appendChild(elementoEncabezado);
        contenedorFoto.appendChild(elementoDescripcion);
        contenedorBotones.appendChild(botonVerDetalles);
        contenedorBotones.appendChild(botonEditar);
        contenedorBotones.appendChild(botonEliminar);
        contenedorFoto.appendChild(contenedorBotones);

        // Ubicar la nueva imagen en la lista
        const fotosExistentes = document.querySelectorAll(".contenedorFotoClase");
        if (fotosExistentes.length > 0) {
            let opcionesTexto = "0. Agregar al final\n";
            let indice = 0;
            for (const foto of fotosExistentes) {
                const tituloFoto = foto.querySelector(".tituloImagen").textContent;
                opcionesTexto += `${indice + 1}. ${tituloFoto}\n`;
                indice++;
            }

            const eleccionUsuario = prompt(`Seleccione una imagen para agregar antes o después:\n${opcionesTexto}`);
            const indiceSeleccionado = parseInt(eleccionUsuario) - 1;

            if (indiceSeleccionado >= 0 && indiceSeleccionado < fotosExistentes.length) {
                const eleccionPosicion = prompt(`¿Desea agregar la imagen antes o después de la imagen seleccionada? 
                    1.) Antes
                    2.) Despues `);
                const fotoReferencia = fotosExistentes[indiceSeleccionado];
                if (eleccionPosicion === 1) {
                    contenedorFotos.insertBefore(contenedorFoto, fotoReferencia);
                } else if (eleccionPosicion === 2) {
                    fotoReferencia.insertAdjacentElement('afterend', contenedorFoto);
                } else {
                    contenedorFotos.appendChild(contenedorFoto);
                }
            } else {
                contenedorFotos.appendChild(contenedorFoto);
            }
        } else {
            contenedorFotos.appendChild(contenedorFoto);
        }

        // Transición al agregar la imagen
        setTimeout(() => {
            contenedorFoto.style.opacity = "1";
        }, 300);

        // Vaciar los inputs
        inputUrlImagen.value = "";
        inputTituloImagen.value = "";
        inputDescripcionImagen.value = "";
    } else {
        alert("Por favor, ingresa una URL válida.");
    }
});
