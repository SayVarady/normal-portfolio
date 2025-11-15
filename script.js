// Small interactions: mobile nav toggle, contact form simple behavior, year insert
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav on link click
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (mainNav.classList.contains('show')) mainNav.classList.remove('show');
    });
  });

  // Contact form (demo only - no server)
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';

    // Very small validation
    if (!email.includes('@') || message.trim().length < 5) {
      formMsg.textContent = 'Please provide a valid email and a short message (5+ characters).';
      return;
    }

    // Simulate "sent" response
    formMsg.textContent = 'Thanks! Your message looks good — in a real site this would be sent to your inbox or API.';
    contactForm.reset();

    setTimeout(() => {
      formMsg.textContent = '';
    }, 5000);
  });

  (function () {
    const root = document.documentElement;
    const themeKey = 'theme-preference';
    const btn = document.getElementById('themeToggle');

    function getPreferredTheme() {
      const stored = localStorage.getItem(themeKey);
      if (stored === 'light' || stored === 'dark') return stored;
      // fall back to OS preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      if (btn) {
        const pressed = theme === 'dark';
        btn.setAttribute('aria-pressed', String(pressed));
      }
    }

    function toggleTheme() {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(themeKey, next);
    }

    // initialize
    applyTheme(getPreferredTheme());

    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }

    // small extras commonly in script.js: set year and basic nav toggle (keeps previous behaviour)
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        const expanded = mainNav.getAttribute('data-open') === 'true';
        mainNav.setAttribute('data-open', String(!expanded));
        navToggle.setAttribute('aria-expanded', String(!expanded));
      });
    }

  })();

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Experience
  const date1 = new Date('2023-08-15T10:00:00Z');
  const date2 = new Date();

  function getDateDifference(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    // Ensure start date is earlier than end date
    if (start > end) {
      [start, end] = [end, start]; // Swap dates
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    let yearFormat = years > 1 ? 'years' : 'year';
    let monthFormat = months > 1 ? 'months' : 'month';
    return `${years} ${yearFormat} ${months} ${monthFormat}`;
  }
  document.getElementById('experience').textContent = getDateDifference(date1, date2);
});
