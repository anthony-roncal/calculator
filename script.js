function add(a, b) {
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

function operate(operator, a, b) {
    return operator(a, b);
}

let displayValue = 0;
const display = document.querySelector('#display-value');

const numberButtons = document.querySelectorAll('#numbers > button');
numberButtons.forEach(number => number.addEventListener("click", updateDisplay));

function updateDisplay(e) {
    if (display.textContent === "0" && e.target.textContent === "0") {
        display.textContent = "0";
    } else if (display.textContent === "0" && e.target.textContent !== "0") {
        display.textContent = e.target.textContent;
    }
    else {
        display.textContent += e.target.textContent;
    }
    displayValue = Number(display.textContent);
}