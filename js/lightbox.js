document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");
    const zoomLens = document.getElementById("zoom-lens");
    const images = document.querySelectorAll(".lightbox-trigger img");

    let currentIndex = 0;

    // Abre o lightbox ao clicar na imagem
    images.forEach((img, index) => {
        img.parentElement.addEventListener("click", function (event) {
            event.preventDefault();
            currentIndex = index;
            const enlargedSrc = img.src.replace('.jpg', '-big.jpg');
            openLightbox(enlargedSrc);
        });
    });
    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add("active");
    
        setTimeout(() => {
            const { left, top, width, height } = lightboxImg.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
    
            const event = new MouseEvent("mousemove", {
                clientX: centerX,
                clientY: centerY
            });
    
            lightboxImg.dispatchEvent(event);
        }, 150);
    }
    
    

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        const prevSrc = images[currentIndex].src.replace('.jpg', '-big.jpg');
        openLightbox(prevSrc);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        const nextSrc = images[currentIndex].src.replace('.jpg', '-big.jpg');
        openLightbox(nextSrc);
    }

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (lightbox.classList.contains("active")) {
            if (event.key === "ArrowLeft") showPrevImage();
            if (event.key === "ArrowRight") showNextImage();
            if (event.key === "Escape") closeLightbox();
        }
    });

    // 📌 Efeito de Lupa
    lightboxImg.addEventListener("mousemove", function (event) {
        const { left, top, width, height } = lightboxImg.getBoundingClientRect();
        const lensSize = 120; // Ajuste do tamanho da lente para um efeito mais fluido
        let x = event.clientX - left - lensSize / 2;
        let y = event.clientY - top - lensSize / 2;
    
        // Mantém a lupa dentro dos limites da imagem
        if (x > width - lensSize) x = width - lensSize;
        if (x < 0) x = 0;
        if (y > height - lensSize) y = height - lensSize;
        if (y < 0) y = 0;
    
        // Aplica um efeito de zoom mais natural
        lightboxImg.style.transform = "scale(2.2)";
        lightboxImg.style.transformOrigin = `${(x / width) * 100}% ${(y / height) * 100}%`;
    });
    
    

    // Oculta a lupa ao sair da imagem
    lightboxImg.addEventListener("mouseleave", function () {
        zoomLens.style.display = "none";
    });

    lightboxImg.addEventListener("click", function () {
        lightboxImg.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";
        lightbox.style.transition = "opacity 0.1s ease-out"; // Adiciona transição para o fundo
        lightboxImg.style.transform = "scale(0.5)";
        lightboxImg.style.opacity = "0";
        lightbox.style.opacity = "0"; // Faz o fundo desaparecer suavemente
    
        // Aguarda a animação antes de fechar o lightbox
        setTimeout(() => {
            lightbox.classList.remove("active");
            lightbox.style.opacity = "1"; // Reseta a opacidade para quando abrir novamente
            lightboxImg.style.transform = "scale(1)";
            lightboxImg.style.opacity = "1";
        }, 300);
    });
    
    
});
