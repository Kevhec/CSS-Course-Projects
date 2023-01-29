const navLinks = document.querySelectorAll('.main-nav__nav-link');
const docRef = (document.location.href);

navLinks.forEach(link => {
  const href = link.getAttribute('href').replace('.', '');
  
  if(docRef.indexOf(href) > -1) {
    link.classList.add('main-nav__nav-link--current')
  }
})