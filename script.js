document.addEventListener('DOMContentLoaded', () => {
    // ======================================================
    // ===== LÓGICA DEL CARRUSEL (COVER FLOW) ===============
    // ======================================================
    const albums = document.querySelectorAll('.album');
    const totalAlbums = albums.length;
    // Inicia en el primer álbum si la pantalla es pequeña, o en el medio si es grande
    let currentIndex = window.innerWidth <= 768 ? 0 : (totalAlbums > 2 ? Math.floor(totalAlbums / 2) : 0);

    function updateCoverflow() {
        albums.forEach((album, index) => {
            album.classList.remove('active');

            const distance = index - currentIndex;
            const absDistance = Math.abs(distance);
            
            const translateX = distance * 50;
            const rotation = distance * 35;
            const translateZ = -absDistance * 100;
            const scale = 1 - absDistance * 0.1;
            
            album.style.transform = `
                translateX(${translateX}%) 
                translateZ(${translateZ}px) 
                rotateY(${rotation}deg) 
                scale(${scale})
            `;
            
            album.style.zIndex = totalAlbums - absDistance;
            
            if (index === currentIndex) {
                album.classList.add('active');
            }
        });
    }

    // --- Lógica para hacer clic en los álbumes ---
    albums.forEach((album, index) => {
        album.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCoverflow();
            }
        });
    });

    // --- Lógica para la rueda del mouse (scroll) ---
    document.querySelector('.coverflow-container').addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            if (currentIndex < totalAlbums - 1) {
                currentIndex++;
                updateCoverflow();
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
                updateCoverflow();
            }
        }
    });

    // --- Lógica para la navegación con teclado ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (currentIndex < totalAlbums - 1) {
                currentIndex++;
                updateCoverflow();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentIndex > 0) {
                currentIndex--;
                updateCoverflow();
            }
        }
    });

    // Estado inicial del carrusel
    updateCoverflow();


    // ======================================================
    // ===== ANIMACIÓN DE ENTRADA PARA SECCIÓN DE VIDEO =====
    // ======================================================
    const extraSection = document.querySelector('.extra-section');

    if (extraSection) { // Nos aseguramos de que la sección exista
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    extraSection.classList.add('visible');
                    // Opcional: dejamos de observar una vez que es visible
                    sectionObserver.unobserve(extraSection); 
                }
            });
        }, {
            threshold: 0.1 // La animación se activa cuando el 10% de la sección es visible
        });
        
        sectionObserver.observe(extraSection);
    }
});