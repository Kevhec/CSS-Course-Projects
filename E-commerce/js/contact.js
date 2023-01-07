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
  clearMainObj(evt.target.id)

  const empty = checkForEmpty(evt.target);
  if(!empty) {return}
  const input = validateInput(evt.target);
  if(!input) {return}

  if(evt.target.name === 'type-of-person') {
    contactMainObj[evt.target.name] = evt.target.value
    return
  }
  contactMainObj[evt.target.id] = evt.target.value
  console.log(contactMainObj)

}

function checkForEmpty(target) {
  // Filter no text inputs and not required
  switch(target.name) {
    case 'select-country':  return true;
    case 'categorias':      return true;
    case 'type-of-person':  return true;
  }

  const value = target.value.trim();
  if(value === '') {
    const label = target.parentElement.children[0].innerText;
  
    clearMainObj(target.id); //Clear MainObj entry with ID
    deleteAlert(target.parentElement);
    createAlert(`El campo ${label} es obligatorio!`, target.parentElement);
    return false;
  }
  deleteAlert(target.parentElement);
  return true;
}

function validateInput(target) {
  // Validate email input
  if(target.type === 'email') {
    deleteAlert(target.parentElement)
    let result = emailValidation(target.value);
    if(!result){
      clearMainObj(target.id); //Clear MainObj entry with ID
      createAlert('Email inválido', target.parentElement);
    }
    return result;
  }
  return true
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
