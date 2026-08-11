document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll class additions
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        hamburgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Active Nav item highlight on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Float Scroll-to-Top button visibility
    const toTopBtn = document.getElementById('btn-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    });

    toTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lightbox Modal for Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;

    const openLightbox = (index) => {
        const item = galleryItems[index];
        const fullSrc = item.getAttribute('data-src');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        lightboxImg.src = fullSrc;
        lightboxImg.alt = title;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="font-size:0.9rem; color:var(--secondary);">${desc}</span>`;
        
        lightbox.classList.add('active');
        currentIndex = index;
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    const showPrev = (e) => {
        e.stopPropagation();
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = galleryItems.length - 1;
        openLightbox(prevIndex);
    };

    const showNext = (e) => {
        e.stopPropagation();
        let nextIndex = currentIndex + 1;
        if (nextIndex >= galleryItems.length) nextIndex = 0;
        openLightbox(nextIndex);
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation in lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev(e);
        if (e.key === 'ArrowRight') showNext(e);
    });



    // Before/After Interactive Sliders
    const sliders = document.querySelectorAll('.ba-slider');

    sliders.forEach(slider => {
        const handle = slider.querySelector('.ba-handle');
        
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            const x = clientX - rect.left;
            let percent = (x / rect.width) * 100;
            
            if (percent < 0) percent = 0;
            if (percent > 100) percent = 100;
            
            slider.style.setProperty('--position', `${percent}%`);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        };

        const onTouchMove = (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                moveSlider(e.touches[0].clientX);
            }
        };

        const startDragging = (e) => {
            isDragging = true;
            // Prevent text selection during drag
            e.preventDefault();
        };

        const stopDragging = () => {
            isDragging = false;
        };

        // Event listeners on handle and container for smoother interactions
        handle.addEventListener('mousedown', startDragging);
        handle.addEventListener('touchstart', startDragging, { passive: true });

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: false });

        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('touchend', stopDragging);
    });
});
