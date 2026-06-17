// function toggleMenu() {
//   const menu = document.querySelector(".menu-links");
//   const icon = document.querySelector(".hamburger-icon");
//   menu.classList.toggle("open");
//   icon.classList.toggle("open");
// }
// ==========================================================================
// Mobile menu toggle
// ==========================================================================
const hamburgerIcon = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelector(".menu-links");
const menuOverlay = document.querySelector(".menu-overlay");

function toggleMenu() {
  hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");
  menuOverlay.classList.toggle("open");

  const isOpen = menuLinks.classList.contains("open");
  hamburgerIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");
  document.body.style.overflow = isOpen ? "hidden" : "";
}

// Close the mobile menu automatically if the viewport grows back to desktop size
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && menuLinks.classList.contains("open")) {
    toggleMenu();
  }
});

// ==========================================================================
// Scroll-spy: highlight the nav link for the section currently in view
// ==========================================================================
const sections = document.querySelectorAll("section[id]");
const desktopLinks = document.querySelectorAll("#desktop-nav .nav-links a");
const mobileLinks = document.querySelectorAll("#hamburger-nav .menu-links a");

function setActiveLink(id) {
  [...desktopLinks, ...mobileLinks].forEach((link) => {
    const matches = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", matches);
  });
}

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ==========================================================================
// Hero terminal typing effect
// The full command/output text already lives in the HTML (data-text /
// data-output attributes and as plain content), so the terminal still reads
// correctly if JavaScript fails to load or prefers-reduced-motion is set.
// ==========================================================================
function typeTerminal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const lines = document.querySelectorAll(".terminal-line .type-target");
  const outputs = document.querySelectorAll(".terminal-line.output");

  if (!lines.length) return;

  // Populate text content from data attributes up front.
  lines.forEach((el) => {
    el.textContent = el.dataset.text || "";
  });
  outputs.forEach((el) => {
    if (el.dataset.output && !el.textContent.trim()) {
      el.textContent = el.dataset.output;
    }
  });

  if (prefersReducedMotion) return;

  // Hide command text, reveal it letter by letter, then fade in the output line.
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return;

    const target = lines[lineIndex];
    const fullText = target.dataset.text || "";
    const outputLine = outputs[lineIndex];

    target.textContent = "";
    if (outputLine) outputLine.style.opacity = "0";

    let charIndex = 0;
    const typingSpeed = 45;

    const interval = setInterval(() => {
      charIndex++;
      target.textContent = fullText.slice(0, charIndex);

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        if (outputLine) {
          outputLine.style.transition = "opacity 0.3s ease";
          outputLine.style.opacity = "1";
        }
        lineIndex++;
        setTimeout(typeLine, 350);
      }
    }, typingSpeed);
  }

  typeLine();
}

document.addEventListener("DOMContentLoaded", typeTerminal);