document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");
    const images = document.querySelectorAll(".lightbox-trigger img");
    
    let currentIndex = 0;

    // Abre o lightbox ao clicar na imagem
    images.forEach((img, index) => {
        img.parentElement.addEventListener("click", function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            currentIndex = index;
            openLightbox(img.src);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add("active");
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    // Exibe a imagem anterior
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    // Exibe a próxima imagem
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    // Eventos de clique
    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    // Fecha o lightbox ao clicar fora da imagem
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener("keydown", function (event) {
        if (lightbox.classList.contains("active")) {
            if (event.key === "ArrowLeft") showPrevImage();
            if (event.key === "ArrowRight") showNextImage();
            if (event.key === "Escape") closeLightbox();
        }
    });
});
