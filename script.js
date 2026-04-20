const text = ["Java Developer", "Web Developer", "Automation Expert", "AI Enthusiast"];
let i = 0;
let j = 0;
let isDeleting = false;

function type() {
  const target = document.getElementById("typing");
  let currentText = text[i];

  // Typing logic with cursor
  if (isDeleting) {
    target.innerHTML = currentText.substring(0, j--) + '<span class="cursor">|</span>';
  } else {
    target.innerHTML = currentText.substring(0, j++) + '<span class="cursor">|</span>';
  }

  // Speed control
  let typeSpeed = isDeleting ? 50 : 150;

  // Word complete hone par pause
  if (!isDeleting && j === currentText.length + 1) {
    isDeleting = true;
    typeSpeed = 1500; // 1.5 second pause at the end
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Cursor blinking effect ke liye CSS inject karna
const style = document.createElement('style');
style.innerHTML = `
  .cursor { 
    animation: blink 0.7s infinite; 
    color: #38bdf8; 
    font-weight: bold;
  }
  @keyframes blink { 
    0%, 100% { opacity: 1; } 
    50% { opacity: 0; } 
  }
`;
document.head.appendChild(style);

// Window load hote hi start karein
window.onload = type;
