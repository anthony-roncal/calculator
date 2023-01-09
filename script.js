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
const maxLength = 15;
let isLastClickNumber = false;
const display = document.querySelector('#display-value');
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(number => number.addEventListener('click', numberPressed));
const operatorButtons = document.querySelectorAll('#operators > button');
operatorButtons.forEach(operator => operator.addEventListener("click", operatorPressed));
const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', performOperation);
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);
const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', addDecimal);
const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', backspace);

function numberPressed(e) {
    updateDisplay(e.target.textContent);
}

function operatorPressed(e) {
    storeValueAndOperator(e.target.textContent);
}

function updateDisplay(value) {
    if(display.textContent.length <= maxLength){
        if(!isLastClickNumber){
            display.textContent = value;
            isLastClickNumber = true;
        } else if(display.textContent === "0" && value === "0") {
            display.textContent = "0";
        } else if (display.textContent === "0" && value !== "0") {
            display.textContent = value;
        }
        else {
            display.textContent += value;
        }
    }
    isLastClickNumber = true;
}

function addDecimal() {
    if(!isLastClickNumber) {
        display.textContent = "0.";
    }
    if(!display.textContent.includes(".") && isLastClickNumber) {
        display.textContent += ".";
    }
    isLastClickNumber = true;
}

function storeValueAndOperator(operator) {
    if(currentOperation === "" && isLastClickNumber) {
        firstOperand = Number(display.textContent);
    } else if(currentOperation !== "" && isLastClickNumber){
        secondOperand = Number(display.textContent);
        calculate();
    } else if(currentOperation !== "" && !isLastClickNumber){
        // don't calculate if user switches between operators
    }
    switch (operator) {
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

function backspace() {
    if (display.textContent.length > 1 && isLastClickNumber) {
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
    } else if (display.textContent.length === 1 && isLastClickNumber) {
        display.textContent = 0;
    }
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

document.onkeydown = function(e) {
    console.log(e.key);
    if(isFinite(e.key) && e.key !== " ") {
        updateDisplay(e.key);
    } else {
        switch (e.key) {
            case "+":
                storeValueAndOperator("+");
                break;
            case "-":
                storeValueAndOperator("-");
                break;
            case "*":
                storeValueAndOperator("x");
                break;
            case "x":
                storeValueAndOperator("x");
                break;
            case "/":
                storeValueAndOperator("/");
                break;
            case ".":
                addDecimal();
                break;
            case "Backspace":
                backspace();
                break;
            case "Enter":
                performOperation();
                break;
            case "=":
                performOperation();
                break;
        }
    }
}