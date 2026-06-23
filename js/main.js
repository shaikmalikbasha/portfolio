// ── Theme toggle ──────────────────────────────────────────────
function initTheme() {
  const html = document.documentElement;

  const desktopBtn = document.getElementById("theme-toggle");
  const mobileBtn = document.getElementById("mobile-theme-toggle");

  const saved = localStorage.getItem("portfolio-theme") || "light";

  function updateTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    document.querySelectorAll(".theme-icon").forEach((icon) => {
      icon.textContent = theme === "dark" ? "dark_mode" : "light_mode";
    });
  }

  updateTheme(saved);

  const toggleTheme = () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";

    updateTheme(next);
  };

  desktopBtn?.addEventListener("click", toggleTheme);
  mobileBtn?.addEventListener("click", toggleTheme);
}

// ── Materialize init ──────────────────────────────────────────
function initMaterialize() {
  M.Sidenav.init(document.querySelectorAll(".sidenav"), {
    edge: "left",
    inDuration: 250,
  });
  M.Modal.init(document.querySelectorAll(".modal"), {
    opacity: 0.9,
    inDuration: 300,
  });
}

// ── Animated typing text ──────────────────────────────────────
function animateText() {
  const phrases = [
    "real-time insights.",
    "intelligent data systems.",
    "AI-powered pipelines.",
    "scalable cloud platforms.",
    "LLM-integrated APIs.",
    "actionable analytics.",
    "self-healing data quality.",
  ];

  const el = document.getElementById("animated-text");
  if (!el) return;

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

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
  const btn = document.getElementById("goTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMaterialize();
  animateText();
  initGoToTop();
});
