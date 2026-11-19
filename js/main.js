// ── Safe storage helpers ──────────────────────────────────────
function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or privacy-mode errors
  }
}

// ── Theme toggle ──────────────────────────────────────────────
function initTheme() {
  const html = document.documentElement;
  const desktopBtn = document.getElementById("theme-toggle");
  const mobileBtn = document.getElementById("mobile-theme-toggle");

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved =
    readStorage("portfolio-theme") || (prefersDark ? "dark" : "light");

  function updateTheme(theme) {
    const isDark = theme === "dark";
    html.setAttribute("data-theme", theme);
    writeStorage("portfolio-theme", theme);

    document.querySelectorAll(".theme-icon").forEach((icon) => {
      icon.textContent = isDark ? "dark_mode" : "light_mode";
    });

    [desktopBtn, mobileBtn].forEach((btn) => {
      if (btn) {
        btn.setAttribute("aria-pressed", String(isDark));
      }
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
  const menuBtn = document.querySelector(".nav-menu-btn");

  M.Sidenav.init(document.querySelectorAll(".sidenav"), {
    edge: "left",
    inDuration: 250,
    onOpenStart: () => {
      menuBtn?.setAttribute("aria-expanded", "true");
    },
    onCloseStart: () => {
      menuBtn?.setAttribute("aria-expanded", "false");
    },
  });

  M.Modal.init(document.querySelectorAll(".modal"), {
    opacity: 0.9,
    inDuration: 300,
  });
}

// ── Active nav link on scroll ─────────────────────────────────
function initActiveNavLink() {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) sectionMap.set(target, link);
    }
  });

  if (!sectionMap.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = sectionMap.get(entry.target);
        navLinks.forEach((l) => l.classList.remove("active"));
        activeLink?.classList.add("active");
      });
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    },
  );

  sectionMap.forEach((_, section) => observer.observe(section));
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

const expYears = (() => {
  const start = new Date(2019, 8, 10);
  const now = new Date();
  let yrs = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < 8 || (now.getMonth() === 8 && now.getDate() < 10)) yrs--;
  return `${Math.max(0, yrs)}+`;
})();

document.querySelectorAll(".exp-years").forEach((el) => {
  el.textContent = expYears;
});

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMaterialize();
  initActiveNavLink();
  animateText();
  initGoToTop();
});
