const upButton = document.querySelector('.up-button');
var rootElement = document.documentElement;

document.addEventListener('scroll', handleScroll);
upButton.addEventListener('click', scrollToTop);

function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight

  if((rootElement.scrollTop / scrollTotal) > 0.20) {
    upButton.classList.add('active');
  } else {
    upButton.classList.remove('active');
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0
  })
}