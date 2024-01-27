class Calculator
{
    constructor(previousDisplay, currentDisplay)
    {
        this.previousDisplay = previousDisplay
        this.currentDisplay = currentDisplay
        this.clear()
    }
    clear()
    {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    addNumber(number)
    {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation)
    {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '')
        {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    calculate()
    {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev || isNaN(current))) return
        switch (this.operation)
        {
            case '%':
                result = prev % current
                break;
            case '/':
                result = prev / current
                break;
            case '*':
                result = prev * current
                break;
            case '-':
                result = prev - current
                break;
            case '+':
                result = prev + current
                break;
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay()
    {
        this.currentDisplay.innerText = this.currentOperand
        if (this.operation != null)
        {
            this.previousDisplay.innerText = `${this.previousOperand} ${this.operation}`
        } else
        {
            this.previousDisplay.innerText = ''
        }
    }
}
const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const previousDisplay = document.querySelector('[data-previous]')
const currentDisplay = document.querySelector('[data-current]')

const calculator = new Calculator(previousDisplay, currentDisplay)

numberBtns.forEach(btn => btn.addEventListener('click', () =>
{
    calculator.addNumber(btn.innerText)
    calculator.updateDisplay()
}))

operationBtns.forEach(btn => btn.addEventListener('click', () =>
{
    calculator.chooseOperation(btn.innerText)
    calculator.updateDisplay()
}))

equalsBtn.addEventListener('click', () =>
{
    calculator.calculate()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', () =>
{
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () =>
{
    calculator.delete()
    calculator.updateDisplay()
})