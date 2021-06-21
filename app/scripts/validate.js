const validateData = {
  'firstName': {
    re: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    id: 'first_name',
    errMessage: 'First name has to consist only of letters and has a minimum length of 3'
  },
  'lastName': {
    re: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    id: 'last_name',
    errMessage: 'Last name has to consist only of letters and has a minimum length of 3'
  },
  'email': {
    re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    id: 'email',
    errMessage: 'Wrong email structure, remember to use @'
  },
  'country': {
    re: /^(pl|usa|ca)$/,
    id: 'country',
    errMessage: 'Choose only from given countries'
  },
  'postalCode': {
    re: /(\d{5}([\-]\d{4})?)|([0-9]{2}\-[0-9]{3})/,
    id: 'postal-code',
    errMessage: 'Allowed formats: nnnnn, nnnnn-nnnn or nn-nnn'
  },
  'phoneNumber': {
    re: /^\+?\(?([0-9]{2,3})\)?[-. ]?([0-9]+[. -]?[0-9]+)+$/,
    id: 'phone-number',
    errMessage: 'Incorrect phone number, please check possible typos'
  },
  'creditCard': {
    re: /^([0-9]{4})[-. ]([0-9]{4})[-. ]([0-9]{4})[-. ]([0-9]{4})$/,
    id: 'credit-card-number',
    errMessage: 'Check if your card number format is similar to nnnn-nnnn-nnnn-nnnn'
  },
  'securityCode': {
    re: /^\d{3}$/,
    id: 'security-code',
    errMessage: 'Enter only 3 digits'
  },
  'expirationDate': {
    re: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
    id: 'expiration-date',
    errMessage: "That't not a valid date or insert / beetwen days and months"
  }
}


const button = document.querySelector('#form-button')

button.addEventListener('click', (e) => {
  e.preventDefault()
  for (const item in validateData) {
    validate(item, true)
  }
  const areAnyErrors = !!document.querySelector("[id^='errorMsg']")
  if (!areAnyErrors) {
    alert('Order has been placed!');
    window.location = '/';  
  }
})


const validate = (fieldName, includeBlankInputs = false) => {
  const { re, id, errMessage } = validateData[fieldName];
  const inputToValidate = document.getElementById(id)

  // Delete previuos node which display error msg
  const errorMsgNode = document.getElementById('errorMsg' + fieldName)
  if (errorMsgNode)
    inputToValidate.parentNode.removeChild(errorMsgNode)

  if (inputToValidate.value) {
    const result = re.test(String(inputToValidate.value).toLowerCase())
    // If input's value is incorrect append div with error message
    if (!result)
      addErrorMsgElement(fieldName, errMessage, inputToValidate)
  } else if (includeBlankInputs){
    addErrorMsgElement(fieldName, 'Please provide value!', inputToValidate)
  }
}

const addErrorMsgElement = (fieldName, errMessage, elem) => {
  const errorMsg = document.createElement("div")
  errorMsg.id = "errorMsg" + fieldName
  errorMsg.style.color = 'red'
  errorMsg.style.marginLeft = '2px'
  errorMsg.textContent = errMessage
  elem.parentNode.appendChild(errorMsg)
}