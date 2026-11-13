
// ==========================================
// PORTAFOLIO - PATRICIA SANTANA
// JavaScript Vanilla
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ======================================
    // ELEMENTOS DEL DOM
    // ======================================

    const darkModeToggle = document.getElementById("darkModeToggle");

    const darkModeIcon = document.getElementById("darkModeIcon");

    const body = document.body;

    const contactForm = document.getElementById("contactForm");


    // ======================================
    // MODO OSCURO
    // ======================================

    const savedTheme = localStorage.getItem("portfolio-theme");

    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );


    // Aplicar tema guardado o preferencia del sistema

    if (savedTheme === "dark") {

        body.classList.add("dark");

    } else if (savedTheme === "light") {

        body.classList.remove("dark");

    } else {

        body.classList.toggle("dark", prefersDarkMode.matches);

    }


    // Actualizar icono y accesibilidad

    function updateThemeButton() {

        const isDark = body.classList.contains("dark");

        if (isDark) {

            darkModeIcon.classList.remove("fa-moon");

            darkModeIcon.classList.add("fa-sun");

            darkModeToggle.setAttribute(
                "aria-label",
                "Activar modo claro"
            );

            darkModeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            darkModeIcon.classList.remove("fa-sun");

            darkModeIcon.classList.add("fa-moon");

            darkModeToggle.setAttribute(
                "aria-label",
                "Activar modo oscuro"
            );

            darkModeToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    // Inicializar icono

    updateThemeButton();


    // Cambiar tema al presionar el botón

    darkModeToggle.addEventListener("click", function () {

        body.classList.toggle("dark");

        const currentTheme = body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("portfolio-theme", currentTheme);

        updateThemeButton();

    });


    // Detectar cambios en el tema del sistema
    // Solo cuando el usuario no ha seleccionado un tema manualmente.

    prefersDarkMode.addEventListener("change", function (event) {

        const userTheme = localStorage.getItem("portfolio-theme");

        if (!userTheme) {

            body.classList.toggle("dark", event.matches);

            updateThemeButton();

        }

    });


    // ======================================
    // SCROLL SUAVE DE NAVEGACIÓN
    // ======================================

    const navLinks = document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

                // Cerrar menú móvil después de seleccionar

                const navbarMenu = document.getElementById("navbarMenu");

                if (navbarMenu.classList.contains("show")) {

                    const bootstrapCollapse = bootstrap.Collapse.getOrCreateInstance(
                        navbarMenu
                    );

                    bootstrapCollapse.hide();

                }

            }

        });

    });


    // ======================================
    // FORMULARIO DE CONTACTO
    // ======================================

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Validar los campos del formulario

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // Obtener los datos introducidos

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();


        // Verificar que los campos no estén vacíos

        if (!name || !email || !message) {

            alert("Por favor, completa todos los campos.");

            return;

        }


        // Simular el envío del mensaje

        alert("¡Mensaje enviado! 📧");


        // Limpiar el formulario

        contactForm.reset();

    });


    // ======================================
    // ANIMACIÓN DE APARICIÓN DE SECCIONES
    // ======================================

    const animatedCards = document.querySelectorAll(
        ".about-card, .experience-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


        animatedCards.forEach(function (card) {

            observer.observe(card);

        });

    }


    // ======================================
    // AÑO ACTUAL DEL FOOTER
    // ======================================

    const footerParagraph = document.querySelector("footer p");

    if (footerParagraph) {

        footerParagraph.innerHTML =
            `&copy; ${new Date().getFullYear()} Cristianny Montero.
            Todos los derechos reservados.`;

    }


    // ======================================
    // CONSOLA DE DESARROLLO
    // ======================================

    console.log(
        "🚀 Portafolio de Cristianny Montero cargado correctamente."
    );

});
