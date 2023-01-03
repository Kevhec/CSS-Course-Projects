const inputs = document.querySelectorAll('input, select, textarea');
const notRequiredFields = ['cliente', 'proveedor', 'categorias'];
const contactMainObj = {
  nombre: '',
  asunto: '',
  email: '',
  telefono: '',
  mensaje: '',
}

inputs.forEach(input => {
  input.addEventListener('blur', validate)
  input.addEventListener('input', validate)
})

function validate(evt) {
  const empty = checkForEmpty(evt.target);
  const input = validateInput(evt.target);
  console.log(contactMainObj)
  
  if (empty && input) {
    contactMainObj[evt.target.id] = evt.target.value
    console.log(contactMainObj)
  }
}

function checkForEmpty(target) {
  // Filter no text inputs and not required
  switch(target.name) {
    case 'select-country':  return true;
    case 'categorias':      return true;
    case 'type-of-person':  return true;
  }
  
  // Check value
  const value = target.value.trim();
  if(value === '') {
    const label = target.parentElement.children[0].innerText;
    const elementParent = target.parentElement;
    const alertMessage = `El campo ${label} es obligatorio!`;
  
    clearMainObj(target.id); //Clear MainObj entry with ID
    deleteAlert(elementParent);
    createAlert(alertMessage, elementParent);
    return false;
  }
  return true;
}

function validateInput(target) {
  if(target.value.trim() !== '') {
    deleteAlert(target.parentElement)

    // Validate email input
    if(target.type === 'email') {
      let result = emailValidation(target.value)
      if(!result){
        clearMainObj(target.id); //Clear MainObj entry with ID
        createAlert('Email inválido', target.parentElement);
      }
      return result;
    }
    return true
  }
}

function emailValidation(email) {
  // Regular expression check for EMAIL sintax
  let regexp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  validateEmail = regexp.test(email)
  return validateEmail;
}

function createAlert(message, ref) {
  const alert = document.createElement('P');
  alert.textContent = message;
  alert.classList.add('alert');

  ref.parentElement.insertBefore(alert, ref.nextElementSibling)
}

function deleteAlert(ref) {
  const alert = ref.nextElementSibling;
  if(alert === null){
    return
  } else if (alert.classList.contains('alert')){
    alert.remove()
  }
}

function clearMainObj(field){
  if(notRequiredFields.includes(field)){
    delete contactMainObj[field]
    return
  }
  contactMainObj[field] = '';
}
