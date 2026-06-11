/* ---------- Theme toggle ---------- */
(function () {
  const toggles = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;

  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
    toggles.forEach((btn) => btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false'));
  }

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  });
})();

/* ---------- Mobile menu ---------- */
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

/* ---------- Footer year ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

/* ---------- Typed headline (home page only) ---------- */
const typedTarget = document.getElementById('typedText');
if (typedTarget) {
  const phrases = [
    'Instrumentation & Control Engineering Technologist',
    'BAS Controls · BACnet · Modbus Commissioning',
    'Allen-Bradley CompactLogix & FactoryTalk HMI',
    'Python, Data & Machine Learning for Automation'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedTarget.textContent = phrases[0];
  } else {
    (function typeLoop() {
      const phrase = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typedTarget.textContent = phrase.substring(0, charIndex);

      let delay = deleting ? 34 : 62;
      if (!deleting && charIndex === phrase.length) {
        delay = 1700;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }
      setTimeout(typeLoop, delay);
    })();
  }
}
