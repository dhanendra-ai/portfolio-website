/**
 * ============================================
 * Dhanendra Sahu | Portfolio Script 2026
 * Features:
 *   - Typing Effect
 *   - Scroll Reveal
 *   - Custom Cursor
 *   - Contact Form
 *   - Navbar Active State
 * ============================================
 */

// ============================================
// 1. TYPING EFFECT
// ============================================
const phrases = [
  "Java Developer",
  "Backend & Automation Specialist",
  "AI/ML Enthusiast",
  "B.Tech CSE (AI) Student"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const target = document.getElementById("typing");
  if (!target) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  target.innerHTML = currentPhrase.substring(0, charIndex) + '<span class="cursor-blink">|</span>';

  let typeSpeed = isDeleting ? 50 : 110;

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before next phrase
  }

  setTimeout(typeEffect, typeSpeed);
}

// ============================================
// 2. SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          entry.target.classList.remove("reveal-hidden");
        }
      });
    },
    { threshold: 0.1 }
  );

  const targets = document.querySelectorAll(
    "section, .card, .contact-container, .about-content"
  );

  targets.forEach((el) => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });
}

// ============================================
// 3. CUSTOM CURSOR
// ============================================
function initCursor() {
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  if (!cursorDot || !cursorOutline) return;

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    // Outline follows with smooth animation
    cursorOutline.animate(
      { left: `${x}px`, top: `${y}px` },
      { duration: 400, fill: "forwards" }
    );
  });

  // Expand cursor on hover over interactive elements
  const interactives = document.querySelectorAll("a, button, .card");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.style.width = "50px";
      cursorOutline.style.height = "50px";
      cursorOutline.style.borderColor = "rgba(56, 189, 248, 0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.style.width = "32px";
      cursorOutline.style.height = "32px";
      cursorOutline.style.borderColor = "rgba(56, 189, 248, 0.6)";
    });
  });
}

// ============================================
// 4. CONTACT FORM
// ============================================
function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = "#16a34a";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.style.background = "";
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ============================================
// 5. ACTIVE NAV HIGHLIGHT ON SCROLL
// ============================================
function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "var(--primary)";
      }
    });
  });
}

// ============================================
// 6. INJECT TYPING CURSOR STYLE
// ============================================
function injectStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
    .cursor-blink {
      color: #38bdf8;
      font-weight: bold;
      margin-left: 2px;
      animation: blink 0.8s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INIT — Run everything on DOM load
// ============================================
window.addEventListener("DOMContentLoaded", () => {
  injectStyles();
  typeEffect();
  initScrollReveal();
  initCursor();
  initForm();
  initNavHighlight();

  console.log("🚀 Portfolio loaded — Dhanendra Sahu 2026");
});
