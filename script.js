/*function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
*/
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
let currentOperation = "";
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
        if(currentOperation === "equals"){
            display.textContent = e.target.textContent;
            currentOperation = "";
        } else if(display.textContent === "0" && e.target.textContent === "0") {
            display.textContent = "0";
        } else if (display.textContent === "0" && e.target.textContent !== "0") {
            display.textContent = e.target.textContent;
        }
        else {
            display.textContent += e.target.textContent;
        }
    }
}

function storeValueAndOperator(e) {
    if(display.textContent !== ""){
        displayValue = Number(display.textContent);
    }
    switch (e.target.textContent) {
        case "+": 
            currentOperation = "add";
            display.textContent = "";
            break;
        case "-": 
            currentOperation = "subtract";
            display.textContent = "";
            break;
        case "x": 
            currentOperation = "multiply";
            display.textContent = "";
            break;
        case "/": 
            currentOperation = "divide";
            display.textContent = "";
            break;
    }
}

function performOperation(e) {
    if(currentOperation !== "") {
        display.textContent = operate(currentOperation, displayValue, Number(display.textContent));
        reset();
    }
}

function reset() {
    currentOperation = "equals";
    displayValue = 0;
    secondValue = 0;
}

function clear() {
    reset();
    display.textContent = displayValue;
}