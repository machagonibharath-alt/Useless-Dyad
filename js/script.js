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
  // PROPERTY CARDS
  // -----------------------------------------

  const propertyList = document.getElementById("property-list");

  if (propertyList && typeof properties !== "undefined") {

    properties.forEach((property) => {

      const card = document.createElement("article");

      card.className = "property-card";

      card.innerHTML = `
        <div class="property-image">

          <a href="${property.youtube}" target="_blank" rel="noopener noreferrer">

            <img
              src="${property.image}"
              alt="${property.title}"
            >

            <div class="property-price">
              ${property.price}
            </div>

          </a>

        </div>

        <div class="property-info">

          <h3>${property.title}</h3>

          <div class="property-location">
            ${property.location}
          </div>

          <div class="property-details">

            ${property.details
              .map((detail) => `<span>${detail}</span>`)
              .join("")}

          </div>

          <a
            href="${property.youtube}"
            target="_blank"
            rel="noopener noreferrer"
            class="property-button"
          >
            ▶ Watch Property Video
          </a>

        </div>
      `;

      propertyList.appendChild(card);

    });

  }


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
