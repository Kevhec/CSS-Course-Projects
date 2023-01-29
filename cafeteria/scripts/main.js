const navLinks = document.querySelectorAll('.main-nav__nav-link');
const path = ("." + document.location.pathname);

navLinks.forEach(link => {
  if(link.getAttribute('href') === path) {
    link.classList.add('main-nav__nav-link--current')
  }
})