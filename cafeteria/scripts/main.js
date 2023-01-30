const navLinks = document.querySelectorAll('.main-nav__nav-link');
const docRef = (document.location.href);
const submitButton = document.querySelector('.contact__submit');

navLinks.forEach(link => {
  const href = link.getAttribute('href').replace('.', '');
  
  if(docRef.indexOf(href) > -1) {
    link.classList.add('main-nav__nav-link--current')
  }
})

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();
})