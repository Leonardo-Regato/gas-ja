const form = document.getElementById('form')
const depositName = document.getElementById('deposit-name')
const cnpj = document.getElementById('cnpj')
const userEmail = document.getElementById('user-email')
const userPhone = document.getElementById('user-phone')
const userPassword = document.getElementById('user-password')
const confirmPassword = document.getElementById('confirm-password')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let temErro = false

    if (!depositNameValidation()) temErro = true
    if (!cnpjValidation()) temErro = true
    if (!emailValidation()) temErro = true
    if (!phoneValidation()) temErro = true
    if (!passwordValidation()) temErro = true
    if (!confirmValidation()) temErro = true

    if(!temErro) {
        form.submit()
    }    
})

depositName.addEventListener('input', depositNameValidation)
cnpj.addEventListener('input', cnpjValidation)
userEmail.addEventListener('input', emailValidation)
userPhone.addEventListener('input', phoneValidation)
userPassword.addEventListener('input', passwordValidation)
confirmPassword.addEventListener('input', confirmValidation)


userPhone.addEventListener('input', () => {
    let value = userPhone.value
    value = value.replace(/\D/g, '')
    value = value.slice(0,11)

    if (value.length > 0) {
        value = '(' + value
    }

    if (value.length > 3) {
        value = value.slice(0, 3) + ') ' + value.slice(3)
    }

    if(value.length > 10) {
        value = value.slice(0,10) + '-' + value.slice(10)
    }

    userPhone.value = value

})


cnpj.addEventListener('input', () => {
    let value = cnpj.value 
    value = value.replace(/\D/g, '')
    value = value.slice(0,14)
    let formatted = ''

    if (value.length > 0) {
        formatted += value.slice(0, 2)
    }

    if (value.length > 2 ){
        formatted += '.' + value.slice(2,5)
    }

    if (value.length > 5 ){
        formatted += '.' + value.slice(5,8)
    }

    if (value.length > 8){
        formatted += '/' + value.slice(8,12)
    }

    if(value.length > 12) {
        formatted += '-' + value.slice(12,14)
    }
    
    cnpj.value = formatted

})


function depositNameValidation() {
    const depositNameValue = depositName.value.trim()

    if (depositNameValue === '') {
        errorValidation(depositName, 'Preencha este campo.')
        return false
    }

    else if (depositNameValue.length < 3) {
        errorValidation(depositName, 'Nome muito curto.')
        return false
    }

    else {
        successValidaton(depositName)
        return true
    }
}

function cnpjValidation() {
    const cnpjValue = cnpj.value.trim()
    
    if (cnpjValue === '') {
        errorValidation(cnpj, 'Preencha este campo.')
        return false
    }

    else if (!validarCNPJ(cnpjValue)) {
        errorValidation(cnpj, 'CNPJ inválido')
        return false
    }

    else {
        successValidaton(cnpj)
        return true
    }
    
    
}

function emailValidation() {
    const userEmailValue = userEmail.value.trim()

    if (userEmailValue === '') {
        errorValidation(userEmail, 'Preencha este campo')
        return false
    }

    else if (!isValidEmail(userEmailValue)) {
        errorValidation(userEmail, 'Digite um e-mail válido.')
        return false
    }

    else{
        successValidaton(userEmail)
            return true
    }

}

function phoneValidation() {
    const userPhoneValue = userPhone.value.trim()

    if (userPhoneValue === '') {
        errorValidation(userPhone, 'Preencha este campo.')
        return false
    }

    else if (userPhoneValue.length < 15) {
        errorValidation(userPhone, 'Número inválido.')
        return false
    }

    else {
        successValidaton(userPhone)
        return true
    }
}

function passwordValidation() {
    const userPasswordValue = userPassword.value.trim()
    const temMaiuscula = /[A-Z]/.test(userPasswordValue)
    const temNumero = /[0-9]/.test(userPasswordValue)
     
    if (userPasswordValue === '') {
        errorValidation(userPassword, 'Preencha esse campo.')
        return false
    }

    else if (userPasswordValue.length < 8) {
        errorValidation(userPassword, 'A senha deve conter pelo menos 8 carácteres.')
        return false
    }

    else if (!temMaiuscula) {
        errorValidation(userPassword, 'A senha deve conter pelo menos uma letra maiúscula')
        return false
    }

    else if (!temNumero) {
        errorValidation(userPassword, 'A semha deve conter pelo menos um número.')
        return false
    }

    else {
        successValidaton(userPassword)
        return true
    }

}

function confirmValidation() {
    const confirmPasswordValue = confirmPassword.value.trim()
    const userPasswordValue = userPassword.value.trim()

    if (confirmPasswordValue === '') {
        errorValidation(confirmPassword, 'Preencha este campo.')
        return false
    }
    
    else if (confirmPasswordValue !== userPasswordValue) {
        errorValidation(confirmPassword, ('As senhas não condizem.'))
        return false
    }

    else {
        successValidaton(confirmPassword)
        return true
    }
}




function errorValidation(input, menssage) {
    const formControl = input.closest('.form-group')
    const small = formControl.querySelector('small')

    small.innerText = menssage
    formControl.classList.remove('success')
    formControl.classList.add('error')
}

function successValidaton(input) {
    const formControl = input.closest('.form-group')

    formControl.classList.remove('error')
    formControl.classList.add('success')
}

function isValidEmail(userEmail) {
    const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(userEmail)
}



function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '')

    if (cnpj.length !== 14) return false

    if (/^(\d)\1+$/.test(cnpj)) return false

    let tamanho = 12
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)

    let soma = 0
    let pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros[tamanho - i] * pos--
        if (pos < 2) pos = 9
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado != digitos[0]) return false

    tamanho = 13
    numeros = cnpj.substring(0, tamanho)

    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros[tamanho - i] * pos--
        if (pos < 2) pos = 9
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado != digitos[1]) return false

    return true
}

const buttons = document.querySelectorAll('.toggle-password')
buttons.forEach(button => {
button.addEventListener('click', () => {
    const wrapper = button.parentElement
    const input = wrapper.querySelector('input')
    const icon = button.querySelector('span')

    if (input.type === 'password') {
        input.type = 'text'
        icon.textContent = 'visibility'
        button.classList.add('active')
    }

    else{
        input.type = 'password'
        icon.textContent = 'visibility_off'
        button.classList.remove('active')

    }
    

}) 
})