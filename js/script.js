"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       MOBILE NAVIGATION
    ========================= */
    const menuButton = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        const toggleMenu = (isOpen) => {
            navLinks.classList.toggle("active", isOpen);
            menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            menuButton.setAttribute("aria-expanded", isOpen.toString());
            menuButton.textContent = isOpen ? "✕" : "☰";
        };

        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("active");
            toggleMenu(!isOpen);
        });

        /* Close menu after clicking a link */
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => toggleMenu(false));
        });

        /* Close menu when clicking outside */
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedMenuButton = menuButton.contains(event.target);

            if (!clickedInsideMenu && !clickedMenuButton && navLinks.classList.contains("active")) {
                toggleMenu(false);
            }
        });
    }

    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("active"));
    }

    /* =========================
       BACK TO TOP BUTTON
    ========================= */
    const topButton = document.getElementById("topButton");

    if (topButton) {
        let isTicking = false;

        const handleTopButton = () => {
            if (window.scrollY > 400) {
                topButton.style.display = "block";
            } else {
                topButton.style.display = "none";
            }
            isTicking = false;
        };

        handleTopButton();

        window.addEventListener("scroll", () => {
            if (!isTicking) {
                window.requestAnimationFrame(handleTopButton);
                isTicking = true;
            }
        }, { passive: true });

        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});