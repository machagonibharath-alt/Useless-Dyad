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

  // Keep the latest property data in this file so the cards render reliably.
  const propertyData = [
    {
      title: "G+1 Independent House",
      location: "Turkayamjal • Near TCS Adibatla",
      price: "₹1.20 Crore",
      details: ["150 Sq Yards", "G+1", "New House"],
      image: "https://img.youtube.com/vi/E79koeAgsaA/hqdefault.jpg",
      youtube: "https://youtu.be/E79koeAgsaA"
    },
    {
      title: "2 BHK Independent House",
      location: "Nadergul • Hyderabad",
      price: "₹74 Lakhs",
      details: ["2 BHK", "New House", "Independent"],
      image: "https://img.youtube.com/vi/K_PAbQWEpQM/hqdefault.jpg",
      youtube: "https://youtu.be/K_PAbQWEpQM"
    },
    {
      title: "G+1 Independent House",
      location: "Turkayamjal • Near TCS Adibatla",
      price: "₹1.39 Crore",
      details: ["200 Sq Yards", "G+1", "New House"],
      image: "https://img.youtube.com/vi/4cgiVLTqe0w/hqdefault.jpg",
      youtube: "https://youtu.be/4cgiVLTqe0w"
    }
  ];

  function renderProperties() {
    if (!propertyList) return;

    propertyList.innerHTML = "";

    propertyData.forEach(function (property) {
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
  // LATEST YOUTUBE VIDEOS
  // Fetches the public channel RSS feed via rss2json; no API key required.
  // -----------------------------------------

  const latestVideoList = document.getElementById("latest-video-list");
  const channelId = "UCIN_baj3mVpGCMVzZI1OqGw";

  async function loadLatestYouTubeVideos() {
    if (!latestVideoList) return;

    const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId;
    const apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(feedUrl);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Video feed request failed");
      const feed = await response.json();
      if (feed.status !== "ok" || !Array.isArray(feed.items) || feed.items.length === 0) {
        throw new Error("No videos returned");
      }

      latestVideoList.replaceChildren();
      feed.items.slice(0, 6).forEach((video) => {
        const videoUrl = video.link || "https://www.youtube.com/@UselessDyad/videos";
        const match = videoUrl.match(/[?&]v=([^&]+)/) || videoUrl.match(/youtu\.be\/([^?&]+)/);
        const videoId = match ? match[1] : "";
        const thumbnailUrl = (video.thumbnail && video.thumbnail.trim())
          || (videoId ? "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg" : "");

        const card = document.createElement("article");
        card.className = "latest-video-card";

        const thumbnail = document.createElement("a");
        thumbnail.className = "latest-video-thumb";
        thumbnail.href = videoUrl;
        thumbnail.target = "_blank";
        thumbnail.rel = "noopener noreferrer";
        thumbnail.setAttribute("aria-label", "Watch " + (video.title || "latest video"));

        if (thumbnailUrl) {
          const image = document.createElement("img");
          image.src = thumbnailUrl;
          image.alt = video.title || "Useless Dyad latest video";
          image.loading = "lazy";
          thumbnail.appendChild(image);
        }

        const play = document.createElement("span");
        play.className = "latest-video-play";
        play.textContent = "▶";
        thumbnail.appendChild(play);

        const info = document.createElement("div");
        info.className = "latest-video-info";
        const title = document.createElement("h3");
        title.textContent = video.title || "Watch our latest video";
        const date = document.createElement("p");
        date.className = "latest-video-date";
        if (video.pubDate) {
          const published = new Date(video.pubDate);
          date.textContent = Number.isNaN(published.getTime()) ? "" :
            published.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        }

        const watch = document.createElement("a");
        watch.href = videoUrl;
        watch.target = "_blank";
        watch.rel = "noopener noreferrer";
        watch.className = "latest-video-link";
        watch.textContent = "Watch video ↗";
        info.append(title, date, watch);
        card.append(thumbnail, info);
        latestVideoList.appendChild(card);
      });
    } catch (error) {
      const status = document.createElement("p");
      status.className = "video-feed-status";
      status.textContent = "Videos couldn’t load right now. ";
      const fallback = document.createElement("a");
      fallback.href = "https://www.youtube.com/@UselessDyad/videos";
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Watch the latest uploads on YouTube ↗";
      status.appendChild(fallback);
      latestVideoList.replaceChildren(status);
    }
  }

  loadLatestYouTubeVideos();

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
