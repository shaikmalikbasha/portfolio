// Initialize Materialize Components
function initMaterialize() {
  // Mobile sidenav initialisation
  const sideNaveElements = document.querySelectorAll(".sidenav");
  const sideNaveOptions = {
    edge: "left", // opens from left
    inDuration: 250,
  };
  M.Sidenav.init(sideNaveElements, sideNaveOptions);

  // Modal initialisation
  const modalElems = document.querySelectorAll(".modal");
  const modalOptions = {
    opacity: 0.9,
    inDuration: 300,
  };
  M.Modal.init(modalElems, modalOptions);
}

function animateText() {
  // ================= Typing / Rotating Text Animation =================
  const phrases = [
    "data-driven solutions",
    "scalable data pipelines",
    "intelligent APIs",
    "cloud-native architectures",
    "automated machine learning workflows",
    "end-to-end analytics systems",
  ];

  const animatedText = document.getElementById("animated-text");
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = "";
  let isDeleting = false;

  function typeEffect() {
    currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      animatedText.textContent = currentPhrase.substring(0, letterIndex--);
    } else {
      animatedText.textContent = currentPhrase.substring(0, letterIndex++);
    }

    let typingSpeed = isDeleting ? 60 : 100;

    if (!isDeleting && letterIndex === currentPhrase.length) {
      typingSpeed = 1500; // pause at full text
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 300;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

function initAfterDOMLoad() {
  initMaterialize();
  animateText();
}

document.addEventListener("DOMContentLoaded", initAfterDOMLoad);

// GitHub Calendar Initialization
GitHubCalendar(".calendar", "malik-shaik-cos", {
  responsive: true,
  summary_text: "Contributions in the last year",
});
