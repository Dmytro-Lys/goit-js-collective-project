const headerLinks = document.querySelectorAll('.header-link');
document.addEventListener('DOMContentLoaded', checkActivePage);

function checkActivePage() {
  const location = window.location.href;
  if (
    location === 'https://dmytro-lys.github.io/goit-js-collective-project/' ||
    location ===
      'https://dmytro-lys.github.io/goit-js-collective-project/index.html'
  ) {
    headerLinks[0].classList.add('current');
    headerLinks[1].classList.remove('current');
  } else {
    headerLinks[1].classList.add('current');
    headerLinks[0].classList.remove('current');
  }
}
