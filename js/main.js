// ── Theme toggle ──────────────────────────────────────────────
function initTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const icon = btn ? btn.querySelector('.theme-icon') : null;

  const saved = localStorage.getItem('portfolio-theme') || 'light';
  html.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? 'dark_mode' : 'light_mode';

  if (btn) {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      if (icon) icon.textContent = next === 'dark' ? 'dark_mode' : 'light_mode';
    });
  }
}

// ── Materialize init ──────────────────────────────────────────
function initMaterialize() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), { edge: 'left', inDuration: 250 });
  M.Modal.init(document.querySelectorAll('.modal'), { opacity: 0.9, inDuration: 300 });
}

// ── Animated typing text ──────────────────────────────────────
function animateText() {
  const phrases = [
    'real-time insights.',
    'intelligent data systems.',
    'AI-powered pipelines.',
    'scalable cloud platforms.',
    'LLM-integrated APIs.',
    'actionable analytics.',
    'self-healing data quality.',
  ];

  const el = document.getElementById('animated-text');
  if (!el) return;

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting  = false;

  function typeEffect() {
    const current = phrases[phraseIndex];
    el.textContent = isDeleting
      ? current.substring(0, letterIndex--)
      : current.substring(0, letterIndex++);

    let speed = isDeleting ? 55 : 90;

    if (!isDeleting && letterIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// ── Go-to-top button ──────────────────────────────────────────
function initGoToTop() {
  const btn = document.getElementById('goTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMaterialize();
  animateText();
  initGoToTop();
});
