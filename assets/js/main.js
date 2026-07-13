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

/* ---------- Nav dropdown (Projects) ---------- */
const navDropdowns = document.querySelectorAll('.nav-dropdown');
navDropdowns.forEach((dd) => {
  const btn = dd.querySelector('.nav-dropbtn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});
document.addEventListener('click', (e) => {
  navDropdowns.forEach((dd) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      const btn = dd.querySelector('.nav-dropbtn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ---------- Back to top ---------- */
/* The #top target is the sticky header, which browsers treat as already at
   the top of the viewport, so a plain anchor jump does nothing. Scroll the
   window to the real top instead. */
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    if (window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  });
});

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

  // Reserve the height of the tallest phrase so the cycling text never
  // reflows the page (avoids the up/down shift, especially on mobile where
  // phrases wrap to two lines).
  const headline = typedTarget.parentElement;

  function reserveTypedHeight() {
    const saved = typedTarget.textContent;
    headline.style.minHeight = '0px';
    let max = 0;
    phrases.forEach(function (p) {
      typedTarget.textContent = p;
      if (headline.offsetHeight > max) max = headline.offsetHeight;
    });
    typedTarget.textContent = saved;
    headline.style.minHeight = max + 'px';
  }

  reserveTypedHeight();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reserveTypedHeight);
  }
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reserveTypedHeight, 150);
  });

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
