// Initialize Materialize Components
document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidenav initialisation
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {
    edge: 'left', // opens from right
    inDuration: 250,
  });
});


// ================= Typing / Rotating Text Animation =================
document.addEventListener('DOMContentLoaded', function() {
  const phrases = [
    'data-driven solutions',
    'scalable data pipelines',
    'intelligent APIs',
    'cloud-native architectures',
    'automated machine learning workflows',
    'end-to-end analytics systems'
  ];

  const animatedText = document.getElementById('animated-text');
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = '';
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
});