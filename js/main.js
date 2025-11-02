// Initialize Materialize Components
document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidenav initialisation
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {
    edge: 'left', // opens from right
    inDuration: 250,
  });
});