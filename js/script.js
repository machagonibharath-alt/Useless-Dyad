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

  function renderProperties() {
    if (!propertyList) return;

    if (typeof properties === "undefined" || !Array.isArray(properties)) {
      propertyList.innerHTML = '<p style="color:#777;grid-column:1/-1;">Properties could not be loaded.</p>';
      console.error("Useless Dyad: properties.js was not loaded.");
      return;
    }

    propertyList.innerHTML = "";

    properties.forEach(function (property) {
      const card = document.createElement("article");
      card.className = "property-card";

      const details = Array.isArray(property.details)
        ? property.details.map(function (detail) {
            return "<span>" + detail + "</span>";
          }).join("")
        : "";

      card.innerHTML = `
        <div class="property-image">
          <a href="${property.youtube}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${property.title}">
            <img src="${property.image}" alt="${property.title}" loading="lazy">
            <div class="property-price">${property.price}</div>
          </a>
        </div>
        <div class="property-info">
          <h3>${property.title}</h3>
          <div class="property-location">${property.location}</div>
          <div class="property-details">${details}</div>
          <a href="${property.youtube}" target="_blank" rel="noopener noreferrer" class="property-button">
            ▶ Watch Property Video
          </a>
        </div>
      `;

      propertyList.appendChild(card);
    });
  }

  renderProperties();
// -----------------------------------------
  // YOUTUBE VIDEO CARDS
  // -----------------------------------------

  const videoList = document.getElementById("video-list");

  function renderVideos() {
    if (!videoList || typeof youtubeVideos === "undefined") return;

    videoList.innerHTML = youtubeVideos.map(function (video) {
      return `
        <a class="video-card" href="${video.url}" target="_blank" rel="noopener noreferrer">
          <div class="video-thumbnail">
            <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" loading="lazy">
            <span class="play-button">▶</span>
          </div>
          <div class="video-info">
            <h3>${video.title}</h3>
            <p>Watch on YouTube →</p>
          </div>
        </a>
      `;
    }).join("");
  }

  renderVideos();

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
