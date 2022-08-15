// const dataDeNascimento = document.querySelector('#nascimento')
export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostramensagemDeErro(tipoDeInput, input)
    }
}

const tiposdeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, deve conter pelo menos uma letra maiúscula e uma minúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Apenas maiores de 18 anos podem se cadastrar'
    }
    
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input) 
}

function mostramensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposdeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Apenas maiores de 18 anos podem se cadastrar'
    }
    
    input.setCustomValidity(mensagem)
}

function maiorQue18 (data) {
    const dataAtual = new Date()

    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}
