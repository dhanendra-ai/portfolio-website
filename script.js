/**
 * Dhanendra Sahu | Portfolio Script 2026
 * Features: Dynamic Typing, Scroll Reveal, and Glassmorphism Logic
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

  // Typing/Deleting Logic
  if (isDeleting) {
    target.innerHTML = currentPhrase.substring(0, j--) + '<span class="cursor">|</span>';
  } else {
    target.innerHTML = currentPhrase.substring(0, j++) + '<span class="cursor">|</span>';
  }

  // Adaptive Speed Logic
  let typeSpeed = isDeleting ? 40 : 120;

  // State Management
  if (!isDeleting && j === currentPhrase.length + 1) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at completion
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    typeSpeed = 600; // Pause before starting next word
  }

  setTimeout(typeEffect, typeSpeed);
}

// Scroll Reveal Animation (Projects aur About section ke liye)
const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .card').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
};

// Dynamic Cursor Styles
const injectStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .cursor { 
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

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  injectStyles();
  typeEffect();
  revealOnScroll();
});
