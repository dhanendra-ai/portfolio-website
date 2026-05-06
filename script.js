/**
 * ============================================
 * Dhanendra Sahu | Portfolio Script 2026
 * Features:
 *   - Typing Effect
 *   - Scroll Reveal
 *   - Custom Cursor
 *   - Contact Form with Validation
 *   - Navbar Active State
 *   - Project Card Filter by Tag
 *   - Back to Top Button
 *   - Theme Toggle (Dark/Light)
 *   - Hamburger Menu
 *   - Copy Email to Clipboard
 *   - Dynamic Year
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
    { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  const targets = document.querySelectorAll(
    "section, .card, .contact-container, .about-content, .blog-card"
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

  // Check for touch device — disable custom cursor
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursorDot.style.display = "none";
    cursorOutline.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }

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

  const interactives = document.querySelectorAll("a, button, .card, .filter-btn, .blog-card, .skill-badge");
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
// 4. CONTACT FORM — With Validation
// ============================================
function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const btn = form.querySelector("button[type='submit']");
  const btnText = btn.querySelector('.btn-text');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    input.style.borderColor = "#ef4444";
  }

  function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.style.borderColor = "";
  }

  function validateField(input, errorEl, validator, message) {
    if (!validator(input.value.trim())) {
      showError(input, errorEl, message);
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  // Real-time validation
  nameInput.addEventListener("blur", () => {
    validateField(nameInput, nameError, v => v.length >= 2, "Name must be at least 2 characters");
  });
  nameInput.addEventListener("input", () => clearError(nameInput, nameError));

  emailInput.addEventListener("blur", () => {
    validateField(emailInput, emailError, validateEmail, "Please enter a valid email");
  });
  emailInput.addEventListener("input", () => clearError(emailInput, emailError));

  messageInput.addEventListener("blur", () => {
    validateField(messageInput, messageError, v => v.length >= 10, "Message must be at least 10 characters");
  });
  messageInput.addEventListener("input", () => clearError(messageInput, messageError));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameError, v => v.length >= 2, "Name must be at least 2 characters");
    const isEmailValid = validateField(emailInput, emailError, validateEmail, "Please enter a valid email");
    const isMessageValid = validateField(messageInput, messageError, v => v.length >= 10, "Message must be at least 10 characters");

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      // Shake animation on button
      btn.style.animation = "shake 0.5s ease";
      setTimeout(() => btn.style.animation = "", 500);
      return;
    }

    // Check if Formspree is configured
    const action = form.getAttribute("action");
    if (action && action.includes("YOUR_FORM_ID")) {
      // Fallback to mailto if Formspree not set up
      const name = nameInput.value;
      const email = emailInput.value;
      const message = messageInput.value;
      window.location.href = `mailto:dhanendra1303@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;

      btnText.textContent = "Opening Email...";
      btn.disabled = true;
      setTimeout(() => {
        btnText.textContent = "Send Message";
        btn.disabled = false;
        form.reset();
      }, 3000);
      return;
    }

    // Formspree submission
    btnText.textContent = "Sending...";
    btn.disabled = true;

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
    .then(response => {
      if (response.ok) {
        btnText.textContent = "Message Sent!";
        btn.style.background = "#16a34a";
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    })
    .catch(() => {
      btnText.textContent = "Error! Try Again";
      btn.style.background = "#ef4444";
    })
    .finally(() => {
      setTimeout(() => {
        btnText.textContent = "Send Message";
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    });
  });
}

// ============================================
// 5. ACTIVE NAV HIGHLIGHT ON SCROLL
// ============================================
function initNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a, .mobile-link");

  const updateActive = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.style.color = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
        link.style.color = "var(--primary)";
      }
    });
  };

  // Debounced scroll handler
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
      ticking = true;
    }
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
// 7. BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// 8. THEME TOGGLE — Dark / Light Mode
// ============================================
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    btn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    btn.innerHTML = isLight
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';

    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// ============================================
// 9. HAMBURGER MENU
// ============================================
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!hamburger || !mobileNav) return;

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
  }

  hamburger.addEventListener("click", toggleMenu);

  // Keyboard support
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    }
  });
}

// ============================================
// 10. COPY EMAIL TO CLIPBOARD
// ============================================
function initCopyEmail() {
  const btn = document.getElementById("copy-email");
  const feedback = document.getElementById("copy-feedback");
  if (!btn || !feedback) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("dhanendra1303@gmail.com");
      feedback.textContent = "✓ Email copied to clipboard!";
      feedback.classList.add("show");

      setTimeout(() => {
        feedback.classList.remove("show");
        setTimeout(() => feedback.textContent = "", 300);
      }, 2500);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = "dhanendra1303@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      feedback.textContent = "✓ Email copied!";
      feedback.classList.add("show");
      setTimeout(() => {
        feedback.classList.remove("show");
        setTimeout(() => feedback.textContent = "", 300);
      }, 2500);
    }
  });
}

// ============================================
// 11. DYNAMIC YEAR
// ============================================
function initDynamicYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ============================================
// 12. INJECT TYPING CURSOR STYLE
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
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// 13. DYNAMIC FAVICON BASED ON TIME
// ============================================
function initDynamicFavicon() {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  
  // Create canvas favicon
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Background circle
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, 2 * Math.PI);
  ctx.fillStyle = isDay ? '#38bdf8' : '#1e293b';
  ctx.fill();
  
  // "D" text
  ctx.fillStyle = isDay ? '#020617' : '#38bdf8';
  ctx.font = 'bold 18px Poppins';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('D', 16, 16);
  
  // Update favicon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL("image/x-icon");
  document.head.appendChild(link);
}
// script.js ke END me, initDynamicYear() ke baad add karo:

// ============================================
// 14. KONAMI CODE EASTER EGG
// ============================================
function initKonamiCode() {
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let currentIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiSequence[currentIndex]) {
      currentIndex++;
      if (currentIndex === konamiSequence.length) {
        activateEasterEgg();
        currentIndex = 0;
      }
    } else {
      currentIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Fun console message
    console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #38bdf8; font-size: 24px; font-weight: bold;');
    console.log('%cHey there, curious developer! 👋', 'color: #94a3b8; font-size: 14px;');
    console.log('%cThanks for checking out my portfolio!', 'color: #16a34a; font-size: 14px;');
    
    // Visual feedback - confetti effect (CSS animation)
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎊';
    confetti.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 100px;
      z-index: 10000;
      animation: confettiPop 1s ease forwards;
      pointer-events: none;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 1500);
  }
}

// ============================================
// 15. RANDOM HERO GREETING
// ============================================
function initHeroGreeting() {
  const greetingEl = document.querySelector('.hero-greeting');
  if (!greetingEl) return;

  const greetings = [
    "👋 Hello, World!", 
    "🚀 Welcome, Coder!", 
    "💻 Happy Coding!", 
    "✨ Hey there!"
  ];
  
  const randomIndex = Math.floor(Math.random() * greetings.length);
  greetingEl.textContent = greetings[randomIndex];
}

// ============================================
// 16. CLICK TO COPY SKILL BADGE
// ============================================
function initSkillCopy() {
  const badges = document.querySelectorAll('.skill-badge');
  
  badges.forEach((badge) => {
    // Pointer cursor dikhane ke liye (agar CSS mein nahi hai)
    badge.style.cursor = 'pointer';

    badge.addEventListener('click', () => {
      const text = badge.textContent.trim();
      
      // Clipboard pe copy karein
      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback: thoda bada hona (scale)
        badge.style.transition = 'transform 0.2s ease';
        badge.style.transform = 'scale(1.1)';
        
        // Background color temporary change karna (Optional but cool)
        const originalBg = badge.style.backgroundColor;
        badge.style.backgroundColor = 'var(--primary)';
        
        setTimeout(() => {
          badge.style.transform = '';
          badge.style.backgroundColor = originalBg;
        }, 300);
      });
    });
  });
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
  initBackToTop();
  initHamburger();
  initThemeToggle();
  initCopyEmail();
  initDynamicYear();
  initDynamicFavicon(); // NEW  document.getElementById('year').textContent = new Date().getFullYear()
  initKonamiCode(); // NEW  console.log("🚀 Portfolio loaded — Dhanendra Sahu 2026");
  initHeroGreeting();
  initSkillCopy();
});
