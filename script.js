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

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();
});
