"use strict";


/* =========================
   MOBILE NAVIGATION
========================= */

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu after clicking a link */

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";

        });

    });

}


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("active");

        }

    });

}


/* Run when page loads */

revealOnScroll();


/* Run while scrolling */

window.addEventListener(
    "scroll",
    revealOnScroll,
    { passive: true }
);


/* =========================
   BACK TO TOP BUTTON
========================= */

const topButton = document.getElementById("topButton");


if (topButton) {

    function handleTopButton() {

        if (window.scrollY > 400) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    }


    /* Check when page loads */

    handleTopButton();


    /* Check while scrolling */

    window.addEventListener(
        "scroll",
        handleTopButton,
        { passive: true }
    );


    /* Scroll to top */

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================= */

document.addEventListener("click", event => {

    if (!menuButton || !navLinks) {
        return;
    }

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        navLinks.classList.contains("active")
    ) {

        navLinks.classList.remove("active");

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "☰";

    }

});