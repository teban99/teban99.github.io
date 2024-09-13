document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slides img");
    const totalSlides = slides.length;
    const galleryLink = document.getElementById("gallery-link");
    const welcomeLink = document.getElementById("welcome-link");
    const galleryContent = document.getElementById("gallery-content");
    const welcomeContent = document.getElementById("welcome-content");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    // Función para mostrar la siguiente imagen en el slider
    function showNextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add("active");
    }

    // Función para mostrar la imagen anterior
    function showPrevSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add("active");
    }

    // Inicializar el slider
    slides[currentSlide].classList.add("active");
    setInterval(showNextSlide, 5000); // Cambiar imagen cada 5 segundos

    // Navegación manual de las imágenes
    nextButton.addEventListener("click", showNextSlide);
    prevButton.addEventListener("click", showPrevSlide);

    // Función para cambiar entre Bienvenido y Galería
    function switchContent(activeLink, inactiveLink, activeContent, inactiveContent) {
        activeLink.classList.add("active");
        inactiveLink.classList.remove("active");
        activeContent.classList.add("active");
        inactiveContent.classList.remove("active");
    }

    // Mostrar la galería cuando se haga clic en "Galería"
    galleryLink.addEventListener("click", function (e) {
        e.preventDefault();
        switchContent(galleryLink, welcomeLink, galleryContent, welcomeContent);
    });

    // Mostrar el contenido de Bienvenido cuando se haga clic en "Bienvenido"
    welcomeLink.addEventListener("click", function (e) {
        e.preventDefault();
        switchContent(welcomeLink, galleryLink, welcomeContent, galleryContent);
    });

    // Swipe para móviles
    let startX = 0;
    galleryContent.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    galleryContent.addEventListener("touchmove", function (e) {
        if (!startX) return;
        let diffX = e.touches[0].clientX - startX;

        if (diffX > 50) {
            showPrevSlide();
            startX = 0;
        } else if (diffX < -50) {
            showNextSlide();
            startX = 0;
        }
    });

    galleryContent.addEventListener("touchend", function () {
        startX = 0;
    });
});
