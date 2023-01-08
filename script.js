const operators = {
    add: function(a, b) { return a + b; },
    subtract: function(a, b) { return a - b; },
    multiply: function(a, b) { return a * b; },
    divide: function(a, b) { return a / b; }
}

function operate(operator, a, b) {
    return operators[operator](a, b);
}

let displayValue = 0;
let firstOperand = 0;
let secondOperand = 0;
let currentOperation = "";
let isLastClickNumber = false;
const display = document.querySelector('#display-value');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(number => number.addEventListener("click", updateDisplay));
const operatorButtons = document.querySelectorAll('#operators > button');
operatorButtons.forEach(operator => operator.addEventListener("click", storeValueAndOperator));
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', performOperation);
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);
const maxLength = 15;

function updateDisplay(e) {
    if(display.textContent.length <= maxLength){
        if(isLastClickNumber === false){
            display.textContent = e.target.textContent;
            isLastClickNumber = true;
        } else if(display.textContent === "0" && e.target.textContent === "0") {
            display.textContent = "0";
        } else if (display.textContent === "0" && e.target.textContent !== "0") {
            display.textContent = e.target.textContent;
        }
        else {
            display.textContent += e.target.textContent;
        }
    }
    isLastClickNumber = true;
}

function storeValueAndOperator(e) {
    if(currentOperation === "" && isLastClickNumber === true) {
        firstOperand = Number(display.textContent);
    } else if(currentOperation !== "" && isLastClickNumber === true){
        secondOperand = Number(display.textContent);
        calculate();
    } else if(currentOperation !== "" && isLastClickNumber === false){
        // don't calculate if user switches between operators
    }
    switch (e.target.textContent) {
        case "+": 
            currentOperation = "add";
            isLastClickNumber = false;
            break;
        case "-": 
            currentOperation = "subtract";
            isLastClickNumber = false;
            break;
        case "x": 
            currentOperation = "multiply";
            isLastClickNumber = false;
            break;
        case "/": 
            currentOperation = "divide";
            isLastClickNumber = false;
            break;
    }
}

function performOperation() {
    if(currentOperation !== "") {
        secondOperand = Number(display.textContent);
        calculate();
        currentOperation = "";
    }
}

function clear() {
    displayValue = 0;
    currentOperation = "";
    firstOperand = 0;
    secondOperand = 0;
    display.textContent = displayValue;
}

function calculate() {
    if (currentOperation === "divide" && secondOperand === 0) {
        displayValue = "Cannot divide by 0!";
    } else {
        displayValue = operate(currentOperation, firstOperand, secondOperand);
        if (!Number.isInteger(displayValue)){
            displayValue = parseFloat((Math.round(displayValue * 10000) / 10000).toFixed(4));
        }
    }
    display.textContent = displayValue;
    firstOperand = displayValue;
    secondOperand = undefined;
    isLastClickNumber = false;
}