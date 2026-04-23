/**
 * Dhanendra Sahu | Portfolio Script 2026
 * Features: Dynamic Typing, Scroll Reveal, Contact Form, Custom Cursor
 */

const phrases = [
  "Java Developer", 
  "Backend & Automation Specialist", 
  "AI/ML Enthusiast", 
  "B.Tech CSE (AI) Student"
];

let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
  const target = document.getElementById("typing");
  if (!target) return;

  const currentPhrase = phrases[i];

  if (isDeleting) {
    target.innerHTML = currentPhrase.substring(0, j--) + '<span class="cursor-text">|</span>';
  } else {
    target.innerHTML = currentPhrase.substring(0, j++) + '<span class="cursor-text">|</span>';
  }

  let typeSpeed = isDeleting ? 40 : 120;

  if (!isDeleting && j === currentPhrase.length + 1) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    typeSpeed = 600;
  }
  setTimeout(typeEffect, typeSpeed);
}

const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .card, .contact-container').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
};

const injectStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .cursor-text { 
      animation: blink 0.8s infinite; 
      color: #38bdf8; 
      margin-left: 2px;
      font-weight: bold;
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .reveal-hidden { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
    .reveal-visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);
};

// --- NEW FEATURE: Custom Cursor Logic ---
const initCursor = () => {
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = \`\${posX}px\`;
    cursorDot.style.top = \`\${posY}px\`;

    // Slight delay for the outline for a cool trailing effect
    cursorOutline.animate({
      left: \`\${posX}px\`,
      top: \`\${posY}px\`
    }, { duration: 500, fill: "forwards" });
  });
};

// --- NEW FEATURE: Contact Form Submit Logic ---
const initForm = () => {
  const form = document.getElementById("contact-form");
  if(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevents page reload
      alert("Thanks for reaching out! I will get back to you soon.");
      form.reset(); // Clears the form fields
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  typeEffect();
  revealOnScroll();
  initCursor();
  initForm();
});
