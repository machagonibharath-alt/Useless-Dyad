// =========================================
// USELESS DYAD — JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------------------
  // Navbar scroll effect
  // -----------------------------------------

  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // -----------------------------------------
  // Mobile navigation
  // -----------------------------------------

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });

    // Close menu after clicking a link
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });
  }


  // -----------------------------------------
  // Active navigation highlighting
  // -----------------------------------------

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }

    });

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        currentSection &&
        link.getAttribute("href") === "#" + currentSection
      ) {
        link.classList.add("active");
      }

    });

  });


  // -----------------------------------------
  // Fade-in animation
  // -----------------------------------------

  const animatedElements = document.querySelectorAll(
    ".section, .project-card, .property-card, .youtube-box, .contact-box, .journey"
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("appear");

        observerInstance.unobserve(entry.target);

      });

    },
    observerOptions
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

});