const form = document.getElementById('form')
const depositName = document.getElementById('nomeEndereco')
const cep = document.getElementById('cep')
const state = document.getElementById('estado')
const address = document.getElementById('endereco')
const number = document.getElementById('numero')
const complement = document.getElementById('complemento')
const neighborhood = document.getElementById('bairro')
const city = document.getElementById('cidade')

form.addEventListener('submit',  (e) => { 
    e.preventDefault()
    let temErro = false

    if(!depositNameValidation()) temErro = true
    if(!cepValidation()) temErro = true
    if(!stateValidation()) temErro = true
    if(!addressValidation()) temErro = true
    if(!numberValidation()) temErro = true
    if(!complementValidation()) temErro = true
    if(!neighborhoodValidation()) temErro = true
    if(!cityValidation()) temErro = true

    if(!temErro) {
        form.submit()
    }

})

depositName.addEventListener('input', depositNameValidation)
state.addEventListener('change', stateValidation)
address.addEventListener('input', addressValidation)
complement.addEventListener('input', complementValidation)
neighborhood.addEventListener('input', neighborhoodValidation)
city.addEventListener('input', cityValidation)
cep.addEventListener('input', () => {
    let value = cep.value.trim()
    value = value.replace(/\D/g, '')
    value = value.slice(0,8)

    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5)
    }

    cep.value = value

    cepValidation()
})

cep.addEventListener('blur', buscarCep)
cep.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        buscarCep()
    }

})



function depositNameValidation() {
    const depositNameValue = depositName.value.trim()

    if (depositNameValue === '') {
        errorValidation(depositName, 'Preencha este campo')
        return false
    }

    else {
        successValidaton(depositName)
        return true
    }
}

function cepValidation() {
    let cepValue = cep.value.trim()
    cepValue = cepValue.replace(/\D/g, '')


    if (cepValue === "") {
        errorValidation(cep, 'Preencha este campo.')
        return false
    }

    if (cepValue.length !== 8){
        errorValidation(cep, "CEP inválido.")
        return false
    }

    else{
        successValidaton(cep)
        return true
    }

}

function stateValidation() {
    const stateValue = state.value.trim()

    if (stateValue === '') {
        errorValidation(state, 'Preencha este campo.')
        return false
    }

    else {
        successValidaton(state)
        return true 
    }
}

function addressValidation() {
    const addressValue = address.value.trim()

    if (addressValue === '') {
        errorValidation(address, 'Preencha este campo.')
        return false
    }
    
    else {
        successValidaton(address)
        return true
    }
}

function numberValidation() {
    const numberValue = number.value.trim()
    
    if (numberValue === '') {
        errorValidation(number, 'Preencha este campo.')
        return false
    }

    else {
        successValidaton(number)
        return true
    }
}

function complementValidation() {
    const complementValue = complement.value.trim()
        successValidaton(complement)
        return true    
}

function neighborhoodValidation() {
    const neighborhoodValue = neighborhood.value.trim()

    if (neighborhoodValue === '') {
        errorValidation(neighborhood, 'Preencha este campo.')
        return false 
    }

    else {
        successValidaton(neighborhood)
        return true 
    }
}

function cityValidation() {
    const cityValue = city.value.trim()

    if (cityValue === ''){
        errorValidation(city, 'Preencha este campo.')
        return false
    }

    else {
        successValidaton(city)
        return true
    }
}


function errorValidation(input, menssage) {
    const formControl = input.closest('.form-group')
    const small = formControl.querySelector('.error')

    small.innerText = menssage
    formControl.classList.remove('success')
    formControl.classList.add('error')
}

function successValidaton(input) {
    const formControl = input.closest('.form-group')

    formControl.classList.remove('error')
    formControl.classList.add('success')
}

function setLoading(input, isloading) {
    const formcontrol = input.closest('.form-group')

    if(isloading) {
        formcontrol.classList.add('loading')
    }
    else {
        formcontrol.classList.remove('loading')
    } 
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function toggleFields(disabled) {
    address.disabled = disabled
    neighborhood.disabled = disabled
    city.disabled = disabled
    state.disabled = disabled
}

async function buscarCep() {
    
    let value = number.value.trim()
    value = value.replace(/\D/g, '')
    number.value = value

    numberValidation()
    const cepValue = cep.value.replace(/\D/g, '')

    if (cepValue.length !== 8) return
    setLoading(cep, true)
    toggleFields(true)

    const start = Date.now()

    try{
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        const data = await response.json()
       
        const elapsed = Date.now() - start
        if (elapsed < 400) {
        await delay(400 - elapsed)
        }

        if (data.erro) {
            errorValidation(cep, 'CEP não encontrado.')
            return
        }


       
       
        address.value = data.logradouro
        neighborhood.value = data.bairro
        city.value = data.localidade
        state.value = data.uf
        
        successValidaton(cep)

        addressValidation()
        neighborhoodValidation()
        cityValidation()
        stateValidation()

    } catch (error) {
        errorValidation(cep, 'Erro ao buscar CEP.')
    
    } finally{
        setLoading(cep, false)
        toggleFields(false)
    
    }

}