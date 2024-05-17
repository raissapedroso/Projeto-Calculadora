const result = document.querySelector(".resultado")
const buttons = document.querySelectorAll(".buttons button")

let numeroAtual = ""
let primeiroNumero = null
let operador = null
let restart = false

function editarResultado(originClear = false) {
    result.innerText = originClear ? 0 : numeroAtual.replace(".", ",")
}
function addDigit(digit) {
    if(digit === "," && (numeroAtual.includes(",") || !numeroAtual))
        return
    if(restart) {
        numeroAtual = digit
        restart = false
    } else {
        numeroAtual += digit
    }
    editarResultado()
}

function setOperador(novoOperador) {
    if(numeroAtual) {
        primeiroNumero = parseFloat(numeroAtual.replace(",", "."))
        numeroAtual = ""
    }
    operador = novoOperador
}
function calcular() {
    if(operador === null || primeiroNumero === null)
        return
    let segundoOperador = parseFloat(numeroAtual.replace(",", "."))
    let resultadoValor

    switch(operador) {
        case "+":
            resultadoValor = primeiroNumero + segundoOperador
            break
        case "-":
            resultadoValor = primeiroNumero - segundoOperador
            break
        case "x":
            resultadoValor = primeiroNumero * segundoOperador
            break
        case "/":
            resultadoValor = primeiroNumero / segundoOperador
            break
            default:
            return
    }
    if(resultadoValor.toString().split(".")[1]?.length > 5) {
        numeroAtual = parseFloat(resultadoValor.toFixed(5)).toString()
    } else {
        numeroAtual = resultadoValor.toString()
    }
    operador = null
    primeiroNumero = null
    restart = true
    editarResultado()
}
function limparCalculadora() {
    numeroAtual = ""
    primeiroNumero = null
    operador = null
    editarResultado(true)
}
function porcentagem() {
    let resultado = parseFloat(numeroAtual) / 100
    
    if(["+", "-"].includes(operador)) {
        resultado = resultado * (primeiroNumero || 1)
    }
    if(resultado.toString().split(".")[1]?.length > 5) {
        resultado = resultado.toFixed(5).toString()
    }

    numeroAtual = resultado.toString()
    editarResultado()
}
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText
        if(/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText)
        } else if(["+", "-", "x", "/"].includes(buttonText)) {
            setOperador(buttonText)
        } else if(buttonText === "=") {
            calcular()
        } else if(buttonText === "C") {
            limparCalculadora()
        } else if(buttonText === "±") {
            numeroAtual = (
                parseFloat(numeroAtual || primeiroNumero) * -1
            ).toString()
            editarResultado()
        } else if(buttonText === "%") {
            porcentagem()
        }
    })
})
