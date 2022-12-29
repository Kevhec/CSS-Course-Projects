/* Variables */
const cart = document.querySelector('.cart');
const cartButton = document.querySelector('.cart__button');
const cartContent = document.querySelector('.cart__content-container');
const cartBody = document.querySelector('.cart-list tbody');
const clearCartButton = document.querySelector('.cart__empty-button')
const items = document.querySelector('.products-list');
let products = [];

setEventListeners();
function setEventListeners() {
  cartButton.addEventListener('click', toggleCart);
  cartContent.addEventListener('click', deleteItem);
  clearCartButton.addEventListener('click', clearCart)
  items.addEventListener('click', getItem);
}

/* Functions */
// show cart when pressing button
function toggleCart() {
  if(cart.children[1].classList.contains('visually-hidden')) {
    cart.children[1].classList.remove('visually-hidden');
    cartButton.classList.add('cart__button-active');
  } else {
    cart.children[1].classList.add('visually-hidden');
    cartButton.classList.remove('cart__button-active');
  }
}

// Check if cart is empty and show content
function checkForEmpty() {
  if (products.length !== 0) {
    cart.children[1].children[0].classList.remove('visually-hidden');
    cart.children[1].children[1].classList.remove('visually-hidden');
    cart.children[1].children[2].classList.add('visually-hidden');
  } else {
    cart.children[1].children[0].classList.add('visually-hidden');
    cart.children[1].children[1].classList.add('visually-hidden');
    cart.children[1].children[2].classList.remove('visually-hidden');
  }
}

// Create product object and add to array
function getItem(evt) {
  evt.preventDefault()
  if(evt.target.classList.contains('product-button')) {
    const product = evt.target.parentElement.parentElement;
    let productContent = {
      id: evt.target.getAttribute('data-id'),
      image: product.children[0].src,
      imageAlt: product.children[0].alt,
      name: product.children[1].children[0].textContent,
      price: product.children[1].children[2].textContent,
      ammount: 1
    }
    
    // Check if repeated
    if(products.some(element => element.id === productContent.id)) {
      products.forEach(productObj => {
        if(productObj.id === productContent.id) {
          productObj.ammount++
        }
      })
    } else {
      products = [...products, productContent]
    }
    generateCartHTML()
  }
}

// Generate products HTML
function generateCartHTML() {
  // Clear previous HTML
  cartBody.innerHTML=""
  checkForEmpty()

  // Generate new HTML
  products.forEach((product) => {
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
      <td>
        <img src="${product.image}" alt="${product.imageAlt}">
      </td>
      <td>
        <p>${product.name}</p>
      </td>
      <td>
        <p>${product.price}</p>
      </td>
      <td>
        <p>${product.ammount}</p>
      </td>
      <td>
        <button class="cart__delete-button" data-id="${product.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </button>
      </td>
    `
    // show HTML
    cartBody.appendChild(cartRow)
  })
}

// Delete Item
function deleteItem(evt) {
  if(evt.target.classList.contains('bi-x-circle-fill')) {
    const deleteButtonId = evt.target.parentElement.getAttribute('data-id');
    products = products.filter(product => product.id !== deleteButtonId);
    generateCartHTML();
  }
}

// Clear cart
function clearCart() {
  products = []
  generateCartHTML()
}