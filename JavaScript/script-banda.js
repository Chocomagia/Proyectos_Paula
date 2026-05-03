function permitirsoltar(e) {
    e.preventDefault();
}

function arrastrar(e) {
    e.dataTransfer.setData("info", e.target.id);
}

function soltar(e) {
    e.preventDefault();
    var datos = e.dataTransfer.getData("info");
    var elementoArrastrado = document.getElementById(datos);
    var recibirDiv = document.getElementById("recibir");

    // Comprueba si hay 4 elementos en el contenedor. Si sí que hay, salta un mensaje. También comprueba que no hayas puesto ya esa imagen
    for (let child of recibirDiv.children) {
        if (recibirDiv.children.length >= 4) {
            alert("Eres una persona muy generosa, pero solo puedes donar 4 cosas a la vez. Si quieres donar más, pulsa el botón de reiniciar.");
            return;
        }
        if (child.src === elementoArrastrado.src) {
            alert("Esta imagen ya está en el contenedor.");
            return;
        }
    }

    if (e.target.id === "recibir") {
        elementoArrastrado.setAttribute("draggable", "false");
        e.target.appendChild(elementoArrastrado);
        playDropSound();

        // Clonar el elemento arrastrado para que no desaparezca del contenedor de la izquierda al ser arrastrado
        const copia = elementoArrastrado.cloneNode(true);
        copia.id = `copia-${Date.now()}`;
        copia.setAttribute("draggable", "true");
        copia.addEventListener("dragstart", arrastrar);
        copia.addEventListener("mouseenter", () => {
            const hoverSound = document.getElementById("hoverSound");
            hoverSound.currentTime = 0; 
            hoverSound.play();
        });
        document.getElementById("donar").appendChild(copia);
    }
}

// Reproducir efecto sonido al pasar el ratón sobre un elemento
function playHoverSound() {
    var hoverSound = document.getElementById("hoverSound");
    hoverSound.play();
}

// Reproducir sonido al hacer clic
function playClickSound() {
    var clickSound = document.getElementById("clickSound");
    clickSound.play();
}

// Reproducir sonido al soltar un elemento en el contenedor
function playDropSound() {
    var dropSound = document.getElementById("dropSound");
    dropSound.currentTime = 0.5; 
    dropSound.play();
}

// Vaciar las imágenes del contenedor de la derecha (recibir)
function vaciarRecibir() {
    playClickSound();
    setTimeout(() => {
        location.reload();
    }, 300); 
}

// Cambiar la imagen al pasar el ratón por otras imágenes con texto para que sea más accesible
function cambiarImagen() {
    var juguetes = document.getElementById("Juguetes");
    juguetes.src = "../imagenes/juguetes_accesible.png"; 
    var libros = document.getElementById("Libros");
    libros.src = "../imagenes/libros_accesibles.png";
    var comida = document.getElementById("Comida");
    comida.src = "../imagenes/comida_accesible.png";
    var ropa = document.getElementById("Ropa");
    ropa.src = "../imagenes/ropa_accesible.png";
}

// Restaurar la imagen original al quitar el ratón de encima de las imágenes
function restaurarImagen() {
    var juguetes = document.getElementById("Juguetes");
    juguetes.src = "../imagenes/juguetes.png"; 
    var libros = document.getElementById("Libros");
    libros.src = "../imagenes/libros.png";
    var comida = document.getElementById("Comida");
    comida.src = "../imagenes/comida.png";
    var ropa = document.getElementById("Ropa");
    ropa.src = "../imagenes/ropa.png";
}

// Esta función muestra el formuladio para que puedas donar los objetos puestos en el contenedor (el formulario permanecerá oculto hasta que uses esta función)
function mostrarFormulario() {
    var recibirDiv = document.getElementById("recibir");
    var elementos = recibirDiv.children;

    if (elementos.length === 0) {
        alert("Por favor, selecciona al menos una cosa para donar.");
        return;
    }

    var ulElementos = document.querySelector("#formularioDonacion ul");
    ulElementos.innerHTML = "";

    for (let elemento of elementos) {
        var li = document.createElement("li");
        li.textContent = elemento.id;
        ulElementos.appendChild(li);
    }

    var formulario = document.getElementById("formularioDonacion");
    formulario.style.display = 'block';
}

// Rota las imágenes de las imágenes de nuestros patrocinadores
const container = document.querySelector('.image-container');
function rotateImages() {
    const firstImage = container.children[0];
    container.appendChild(firstImage);
}
setInterval(rotateImages, 3000);

// Esta función isa mouseenter para reproducir un efecto de sonido al pasar el ratón por las imágenes
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.draggable1'); 
    const audio = document.getElementById('hoverSound');

    images.forEach(image => {
        image.addEventListener('mouseenter', () => {
            audio.currentTime = 0;
            audio.play();
        });
    });
});

// Reproducir sonido al hacer clic en los botones de la página
document.addEventListener("DOMContentLoaded", () => {
    const clickSound = document.getElementById("clickSound");

    function playClickSound() {
        clickSound.currentTime = 0; 
        clickSound.play();
    }

    const images = document.querySelectorAll('.draggable'); 
    const buttons = document.querySelectorAll('.texto-boton'); 
    const textInputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea'); 
    
    images.forEach(image => image.addEventListener('click', playClickSound));
    buttons.forEach(button => button.addEventListener('click', playClickSound));
    textInputs.forEach(input => input.addEventListener('click', playClickSound));
});

// Reproducir sonido al pasar el ratón sobre los enlaces de la barra de navegación
const navLinks = document.querySelectorAll(".barra_nav a");
const hoverNavSound = document.getElementById("hoverNavSound");

function playSound(audioElement) {
    audioElement.currentTime = 0; 
    audioElement.play().catch(error => {
        console.log("Error al reproducir el sonido:", error);
    });
}

navLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
        playSound(hoverNavSound);
    });
});

// Función para obtener la URL de la miniatura usando oEmbed
    async function getYouTubeThumbnail(videoId) {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        try {
            const response = await fetch(oembedUrl);
            const data = await response.json();
            // Si quieres una resolución más alta, puedes modificar la URL
            return data.thumbnail_url;
        } catch (error) {
            console.error("Error obteniendo la miniatura:", error);
            // URL de respaldo de alta calidad si falla la API
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    }

    // Aplica esto a cada contenedor de video cuando la página cargue
    document.querySelectorAll('.video-thumbnail-container').forEach(container => {
        const videoId = container.dataset.videoId;
        const imgElement = container.querySelector('.video-thumbnail-img');
        
        getYouTubeThumbnail(videoId).then(thumbnailUrl => {
            imgElement.src = thumbnailUrl;
        });
    });