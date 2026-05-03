const clickSound = new Audio('sonidos/click.mp3'); // Nos aseguramos de que la ruta del audio esté bien

        // Seleccionamos todos los enlaces de la web
        const links = document.querySelectorAll('a');

        // A cada enlace le añade un nuevo evento gracias a addEventListener al hacer click
        links.forEach(link => {
            link.addEventListener('click', () => {
                clickSound.play();
            });
        });

        // Conseguimos los enlaces para ir a otras páginas de la barra de navegación
        const navLinks = document.querySelectorAll(".barra_nav a");
        const logos_empresas = document.querySelectorAll(".patrocinadores img");
        const hoverNavSound = document.getElementById("hoverNavSound");      

        // Se encarga de que se reproduzca el sonido, si no se reproduce, lanza un error
        function playSound(audioElement) {
            audioElement.currentTime = 0; // Establece el sonido desde el inicio 
            audioElement.play().catch(error => {
                console.log("Error al reproducir el sonido:", error);
            });
        }

        // Añade el evento mouseover a los enlaces para que al poner el ratón por encima se escuche el efecto de sonido
        navLinks.forEach(link => {
            link.addEventListener("mouseover", () => {
                playSound(hoverNavSound);
            });
        });

        // Con el evento de mouseover le agrega efectos de sonido a los logos de las empresas
        logos_empresas.forEach(logo => {
            logo.addEventListener("mouseover", () => {
                playSound(hoverNavSound);
            });
        });