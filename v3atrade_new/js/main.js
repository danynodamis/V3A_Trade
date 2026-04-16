document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // CONFIGURACIÓN - NÚMERO DE WHATSAPP
    // ============================================
    // Modifica este número para cambiar el destino de los mensajes
    // Formato: código de país + número (sin espacios ni signos)
    const WHATSAPP_NUMBER = '5356843899'; // Número actual: +53 56843899

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo img');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .industry-card, .stat-card, .brand-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // FORMULARIO WHATSAPP - ENVÍO DE MENSAJES
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const email = document.getElementById('email').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validar campos requeridos
            if (!nombre || !telefono || !mensaje) {
                alert('Por favor complete todos los campos requeridos (*).');
                return;
            }

            // Construir el mensaje para WhatsApp
            let textoMensaje = '*Nuevo mensaje de V3A Trade Website*%0A%0A';
            textoMensaje += '*Nombre:* ' + encodeURIComponent(nombre) + '%0A';

            if (empresa) {
                textoMensaje += '*Empresa:* ' + encodeURIComponent(empresa) + '%0A';
            }

            textoMensaje += '*Teléfono:* ' + encodeURIComponent(telefono) + '%0A';

            if (email) {
                textoMensaje += '*Email:* ' + encodeURIComponent(email) + '%0A';
            }

            if (servicio) {
                textoMensaje += '*Servicio de interés:* ' + encodeURIComponent(servicio) + '%0A';
            }

            textoMensaje += '%0A*Mensaje:*%0A' + encodeURIComponent(mensaje);

            // Construir URL de WhatsApp
            const whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + textoMensaje;

            // Abrir WhatsApp en nueva ventana
            window.open(whatsappURL, '_blank');

            // Mostrar confirmación
            const btn = this.querySelector('.btn-whatsapp');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Mensaje Preparado';
            btn.style.background = '#128C7E';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ============================================
    // MODALES DE MARCAS - FUNCIONALIDAD
    // ============================================

    // Función para inicializar carrusel de modal
    function initModalCarousel(modalId, slideClass) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const slides = modal.querySelectorAll('.' + slideClass);
        const indicators = modal.querySelectorAll('.indicator');
        const prevBtn = modal.querySelector('.carousel-prev');
        const nextBtn = modal.querySelector('.carousel-next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((ind, index) => {
            ind.addEventListener('click', () => showSlide(index));
        });

        // Auto-play cada 5 segundos
        let autoplay = setInterval(nextSlide, 5000);

        // Pausar en hover
        const carousel = modal.querySelector('.modal-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
            carousel.addEventListener('mouseleave', () => {
                autoplay = setInterval(nextSlide, 5000);
            });
        }
    }

    // Inicializar carruseles
    initModalCarousel('modal-bwt', 'carousel-slide-bwt');
    initModalCarousel('modal-amsonic', 'carousel-slide-amsonic');

    // Funcionalidad de apertura/cierre de modales
    const brandItems = document.querySelectorAll('.brand-item[data-modal]');
    const modals = document.querySelectorAll('.brand-modal');

    brandItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = 'modal-' + item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevenir scroll
            }
        });

        // Accesibilidad - abrir con Enter
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                item.click();
            }
        });
    });

    // Cerrar modales
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    });

    // ============================================
    // CARRUSEL DE MARCAS EN HERO
    // ============================================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const slideInterval = 4000; // Cambia cada 4 segundos

    function showSlide(index) {
        // Ocultar todas
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Mostrar la actual
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Auto-play
    let carouselTimer = setInterval(nextSlide, slideInterval);

    // Click en dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(carouselTimer);
            showSlide(index);
            carouselTimer = setInterval(nextSlide, slideInterval);
        });
    });

    console.log('V3A Trade - Web cargada correctamente');
});