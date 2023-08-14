const screen = document.getElementById('screen')
const topScreen = document.getElementById('top-screen')
const keys = document.querySelector('.keys')

let secondOperator = false
let secondValueIsComing = false
let firstValue = '0'
let secondValue = '0'
let result = null
let operator = null

updateScreen()

keys.addEventListener('click', function (e) {
    let element = e.target
    let value = element.value

    if (element.classList.contains('numbers')) {
        if (secondValueIsComing === true) {
            secondValue = secondValue === '0' ? value : secondValue + value
        } else {
            firstValue = firstValue === '0' ? value : firstValue + value
        }
        updateScreen()
    }

    if (element.classList.contains('operator')) {
        if (secondOperator === false) {
            topScreen.innerText = firstValue + value
            secondValueIsComing = true
            secondOperator = true
            operator = value
        }
        else {
            result = calculate(firstValue, secondValue, operator)
            firstValue = parseFloat(result.toFixed(15)).toString()
            secondValueIsComing = true
            updateScreen()
            secondValue = '0'
            topScreen.innerText = firstValue + value
            operator = value
        }
    }

    if (element.classList.contains('process')) {
        if(secondValueIsComing===true){
            result = calculateProcess(value, secondValue)
            secondValue=parseFloat(result.toFixed(15).toString())
        }else{
            result = calculateProcess(value, firstValue)
            firstValue = parseFloat(result.toFixed(15)).toString()
        }
        updateScreen()
    }

    if (element.classList.contains('decimal')) {
        if (secondValueIsComing === false) {
            if (!screen.innerText.includes('.')) {
                firstValue += '.'
            }
        } else {
            if (!screen.innerText.includes('.')) {
                secondValue += '.'
            }
        }
        updateScreen()
    }

    if (element.classList.contains('equal')) {
        if (operator === null) return
        result = calculate(firstValue, secondValue, operator)
        firstValue = result.toString()
        secondValueIsComing = true
        secondOperator = true
        updateScreen()
        secondValue = '0'
        topScreen.innerText = firstValue
        operator = null
        secondValue = firstValue
    }

    if (element.classList.contains('clear')) {
        firstValue = '0'
        secondValue = '0'
        operator = null
        result = null
        secondOperator = false
        secondValueIsComing = false
        updateScreen()
        topScreen.innerText = ''
    }

    if (element.classList.contains('delete')) {
        if (secondValueIsComing === false) {
            if (firstValue.length > 0) {
                firstValue = firstValue.slice(0, -1)
                if (firstValue.length === 0) {
                    firstValue = '0'
                }
            }
        } else {
            if (secondValue.length > 0) {
                secondValue = secondValue.slice(0, -1)
                if (secondValue.length === 0) {
                    secondValue = '0'
                }
            }
        }
        updateScreen()
    }
})

function calculate(num1, num2, operator) {
    if (num1 === null) { num1 = '0' }
    let first = parseFloat(num1)
    let second = parseFloat(num2)
    if (operator === '+') return first + second
    else if (operator === '-') return first - second
    else if (operator === '*') return first * second
    else if (operator === '/') return first / second
    else if (operator === '%') return (first * second) / 100
    else return second
}

function calculateProcess(processType, num) {
    let number = parseFloat(num)
    if (number === 0) return 0
    if (processType === 'divide-x') return 1 / number
    else if (processType === 'square') return number * number
    else if (processType === 'square-root') return Math.sqrt(number)
    else return number
}

function updateScreen() {
    screen.innerText = secondValueIsComing ? secondValue : firstValue
    if (screen.innerText.length > 15) {
        screen.style.fontSize = '24px';
        screen.innerText = screen.innerText.substring(0, 25);
    }
    else {
        screen.style.fontSize = ''; 
    }
}