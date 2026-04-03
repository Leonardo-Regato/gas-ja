const form = document.getElementById('form')
const username = document.getElementById('user-name')
const userPhone = document.getElementById('user-phone')
const userEmail = document.getElementById('user-email')
const userPassword = document.getElementById('user-password')
const confirmPassword = document.getElementById('confirm-password')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let temErro = false


    if(!nameValidation()) temErro = true
    if(!emailValidation()) temErro = true
    if (!phoneValidation()) temErro = true
    if (!passwordValidation()) temErro = true
    if (!confirmValidation()) temErro = true

    console.log("temErro", temErro)

    if(!temErro) {
        form.submit()
    }
})

username.addEventListener('input' , nameValidation)
userEmail.addEventListener('input' , emailValidation)
userPassword.addEventListener('input' , passwordValidation)
confirmPassword.addEventListener('input' , confirmValidation)
userPhone.addEventListener('input' , phoneValidation)


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
    
    
function nameValidation(){
    const usernameValue = username.value.trim()
    const temNumero = /[0-9]/.test(usernameValue)
    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(usernameValue)

    if(usernameValue === '') {
        errorValidation(username, 'Preencha este campo')
        return false
    }

    else if (usernameValue.length < 3) {
        errorValidation(username, 'Nome muito curto.')
        return false

    } 

    else if (!usernameValue.includes(' ')) {
        errorValidation(username, 'Digite nome e sobrenome.')
        return false
    }

    else if(temNumero) {
        errorValidation(username, 'Nome não pode conter números.')
    }

    else if (!nomeValido) {
        errorValidation(username, 'Digite um nome válido.')
        return false
    }
    
    else {
        successValidaton(username)
        return true
    }
}  
 
function emailValidation() {
    const userEmailValue = userEmail.value.trim()
    if(userEmailValue === '') {
        errorValidation(userEmail, 'Preencha este campo')
        return false
    }
    
    else if(!isValidEmail(userEmailValue)) {
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
    if(userPhoneValue === '') {
        errorValidation(userPhone, 'Preencha este campo')
        return false
    }

    else if(userPhoneValue.length < 15){
        errorValidation(userPhone, "Número inválido.")
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
     
    if(userPasswordValue === '') {
        errorValidation(userPassword, 'Preencha este campo')
        return false
    }

    else if(userPasswordValue.length < 8)  {
        errorValidation(userPassword, 'A senha deve conter pelo menos 8 carácteres.')
        return false
    }
    
    
    else if (!temMaiuscula) {
        errorValidation(userPassword, 'A senha deve conter pelo menos uma letra maiúscula.')
        return false
    }

    else if (!temNumero) {
        errorValidation(userPassword, 'A senha precisa conter pelo menos um número.')
        return false
    }

    else{
        successValidaton(userPassword)
        return true
  }
}


function confirmValidation(){
    const confirmPasswordValue = confirmPassword.value.trim()
    const userPasswordValue = userPassword.value.trim()
    
    if (confirmPasswordValue === ''){
        errorValidation(confirmPassword, 'Preencha este campo.')
        return false
    }

    else if (confirmPasswordValue !== userPasswordValue ) {
        errorValidation(confirmPassword, 'As senhas não condizem.')
        return false
    }

    else{
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


function isValidEmail(userEmail){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(userEmail)

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