const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => observer.observe(el));

const typedTarget = document.getElementById('typedText');
const phrases = [
  'Instrumentation & Control Engineering Technology Student',
  'BAS Controls and Automation Learner',
  'PLC, LabVIEW, Arduino and Python Projects',
  'Controls, Instrumentation and Troubleshooting'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedTarget) return;
  const phrase = phrases[phraseIndex];

  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTarget.textContent = phrase.substring(0, charIndex);

  let delay = deleting ? 38 : 65;

  if (!deleting && charIndex === phrase.length) {
    delay = 1400;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();
