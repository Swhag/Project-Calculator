let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let operatorSet = false;
let operationComplete = false;

const btnNumber = document.querySelectorAll("[data-number]");
const btnOperator = document.querySelectorAll("[data-operator]");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnEquals = document.getElementById("equals");
const btnDecimal = document.getElementById("decimal");
const lastOperation = document.getElementById("lastOperation");
const currentOperation = document.getElementById("currentOperation");
const btnNegative = document.getElementById("negative");

btnEquals.addEventListener("click", calculate);
btnDelete.addEventListener("click", deleteNumber);
btnClear.addEventListener("click", clearAll);
btnDecimal.addEventListener("click", appendDecimal);
btnNegative.addEventListener("click", addNegative);

btnNumber.forEach((e) =>
  e.addEventListener("click", () => appendNumber(e.textContent))
);
btnOperator.forEach((e) =>
  e.addEventListener("click", () => setOperation(e.textContent))
);

function appendNumber(number) {
  if (operationComplete === true) {
    clearDisplay(), (lastOperation.textContent = "");
  } else if (currentOperation.textContent === "0" || operatorSet)
    clearDisplay();
  currentOperation.textContent += number;
}

function setOperation(operator) {
  if (currentOperator !== null) calculate();
  firstOperand = currentOperation.textContent;
  currentOperator = operator;
  lastOperation.textContent = `${firstOperand} ${currentOperator}`;
  operatorSet = true;
}

function calculate() {
  if (currentOperator === null || operatorSet) return;
  secondOperand = currentOperation.textContent;
  currentOperation.textContent = operate(
    currentOperator,
    firstOperand,
    secondOperand
  );
  lastOperation.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
  currentOperator = null;
  operationComplete = true;
}

function appendDecimal() {
  if (currentOperation.textContent.includes(".")) return;
  currentOperation.textContent += ".";
}

function addNegative() {
  if (currentOperation.textContent.includes("-")) {
    currentOperation.textContent = currentOperation.textContent.slice(1);
  } else if (currentOperation.textContent !== "0")
    currentOperation.textContent = "-" + currentOperation.textContent;
}

function deleteNumber() {
  currentOperation.textContent = currentOperation.textContent.slice(0, -1);
}

function clearAll() {
  lastOperation.textContent = "";
  currentOperation.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function clearDisplay() {
  currentOperation.textContent = "";
  operatorSet = false;
  operationComplete = false;
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0)
        return null, (currentOperation.textContent = "You cannot divide by 0");
      else return divide(a, b);
    case "^":
      return Math.pow(a, b);
    default:
      return null;
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 10) {
    appendNumber(e.key);
  }
  switch (e.key) {
    case "+":
      return setOperation("+");
    case "-":
      return setOperation("−");
    case "*":
      return setOperation("×");
    case "/":
      return setOperation("÷");
    case "^":
      return setOperation("^");
    case "Enter":
      return calculate();
    case "c":
      return clearAll();
    case "Backspace":
      return deleteNumber();
  }
});
