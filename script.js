const text = ["Java Developer", "Web Developer", "Automation Expert", "AI Enthusiast"];
let i = 0;
let j = 0;
let isDeleting = false;

function type() {
  const target = document.getElementById("typing");
  let currentText = text[i];

  if (isDeleting) {
    target.innerHTML = currentText.substring(0, j--) + '<span class="cursor">|</span>';
  } else {
    target.innerHTML = currentText.substring(0, j++) + '<span class="cursor">|</span>';
  }

  let typeSpeed = isDeleting ? 50 : 150;

  if (!isDeleting && j === currentText.length + 1) {
    isDeleting = true;
    typeSpeed = 1500; // Pause at end
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Add CSS for cursor blinking
const style = document.createElement('style');
style.innerHTML = `
  .cursor { animation: blink 0.7s infinite; color: #38bdf8; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`;
document.head.appendChild(style);

window.onload = type;
