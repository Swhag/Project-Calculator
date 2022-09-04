let firstOperand = "";
let secondOperand = "";
let currentOperation = null;

const btnNumber = document.querySelectorAll("[data-number]");
const btnOperator = document.querySelectorAll("[data-operator]");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnEquals = document.getElementById("equals");
const btnDecimal = document.getElementById("decimal");
const lastOperationDisplay = document.getElementById("lastOperationDispaly");
const currentOperationDisplay = document.getElementById(
  "currentOperationDispaly"
);
btnEquals.addEventListener("click", calculate);
btnDelete.addEventListener("click", deleteNumber);
btnClear.addEventListener("click", clearAll);
btnDecimal.addEventListener("click", appendDecimal);

btnNumber.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

btnOperator.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (currentOperationDisplay.textContent === "0") clearDisplay();
  currentOperationDisplay.textContent += number;
}

function setOperation(operator) {
  if (currentOperation !== null) calculate();
  firstOperand = currentOperationDisplay.textContent;
  currentOperation = operator;
  lastOperationDisplay.textContent = `${firstOperand} ${currentOperation}`;
  clearDisplay();
}

function calculate() {
  secondOperand = currentOperationDisplay.textContent;
  currentOperationDisplay.textContent = operate(
    currentOperation,
    firstOperand,
    secondOperand
  );
  lastOperationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function appendDecimal() {
  if (currentOperationDisplay.textContent.includes(".")) return;
  currentOperationDisplay.textContent += ".";
}

function deleteNumber() {
  currentOperationDisplay.textContent = currentOperationDisplay.textContent
    .toString()
    .slice(0, -1);
}

function clearAll() {
  lastOperationDisplay.textContent = "";
  currentOperationDisplay.textContent = "0";
}

function clearDisplay() {
  currentOperationDisplay.textContent = "";
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
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
