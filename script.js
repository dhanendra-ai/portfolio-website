/**
 * ============================================
 * Dhanendra Sahu | Portfolio Script 2026
 * Features:
 *   - Typing Effect
 *   - Scroll Reveal
 *   - Custom Cursor
 *   - Contact Form
 *   - Navbar Active State
 *   - Project Card Filter by Tag
 *   - ✅ Back to Top Button
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
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
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

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    cursorOutline.animate(
      { left: `${x}px`, top: `${y}px` },
      { duration: 400, fill: "forwards" }
    );
  });

  const interactives = document.querySelectorAll("a, button, .card, .filter-btn");
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
// 6. PROJECT CARD FILTER BY TAG
// ============================================
function initProjectFilter() {
  const filterContainer = document.getElementById("filter-buttons");
  const cards = document.querySelectorAll(".project-card");

  if (!filterContainer || cards.length === 0) return;

  const allTags = new Set();
  cards.forEach((card) => {
    const tags = card.getAttribute("data-tags").split(",");
    tags.forEach((tag) => allTags.add(tag.trim()));
  });

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.classList.add("filter-btn", "active");
  allBtn.setAttribute("data-filter", "all");
  filterContainer.appendChild(allBtn);

  allTags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.classList.add("filter-btn");
    btn.setAttribute("data-filter", tag);
    filterContainer.appendChild(btn);
  });

  filterContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    const selected = e.target.getAttribute("data-filter");

    cards.forEach((card) => {
      const cardTags = card.getAttribute("data-tags").split(",").map((t) => t.trim());

      if (selected === "all" || cardTags.includes(selected)) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
}

// ============================================
// 7. ✅ BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  // 300px scroll ke baad button dikhao
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  // Click pe smoothly top pe scroll karo
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// 8. INJECT TYPING CURSOR STYLE
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
  initProjectFilter();
  initBackToTop(); // ✅ NEW

  console.log("🚀 Portfolio loaded — Dhanendra Sahu 2026");
});
