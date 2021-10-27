class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // установка наших текстовых элементов внутри класса
        this.clear()
    }

    clear() {// очистка наших переменных
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {// удаление одного числа
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {// добавление числа на экран

        if (this.currentOperand.length < 7) {
            if (number === '.' && this.currentOperand.includes('.')) return

            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }




    chooseOperation(operation) {//выбор операции
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {//функция вычсления, КОТОРАЯ БУДЕТ СЧИТАТЬ ЧИСЛА
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = (prev * 100000 + current * 100000) / 100000
                break
            case '-':
                computation = (prev * 100000 - current * 100000) / 100000
                break
            case '*':
                computation = (prev * 100000 * current * 100000) / (100000 * 100000)
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = (prev / 100) * current
                break
            default:
                return
        }

        this.currentOperand = computation.toString()
        if (this.currentOperand.includes('.')) {
            this.currentOperand = computation
        }
        if (this.currentOperand.length >= 9) {
            this.currentOperand = computation.toExponential()
        }
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {//ОБНОВЛЕНИЕ ДИСПЛЕЯ
        if (this.previousOperand === '')
            this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand


        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation} ${this.currentOperand}`.slice(0, 12);
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const precentButton = document.querySelector('[data-percent]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
