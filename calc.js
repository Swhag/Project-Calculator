let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let operatorSet = false;
let operationComplete = false;

const btnEquals = document.getElementById("equals");
const btnDelete = document.getElementById("delete");
const btnClear = document.getElementById("clear");
const btnDecimal = document.getElementById("decimal");
const btnNegative = document.getElementById("negative");
const lastOperation = document.getElementById("lastOperation");
const currentOperation = document.getElementById("currentOperation");
const btnNumber = document.querySelectorAll("[data-number]");
const btnOperator = document.querySelectorAll("[data-operator]");

btnEquals.onmousedown = () => (calculate(), addPressed(btnEquals));
btnDelete.addEventListener("click", deleteNumber);
btnClear.addEventListener("click", clearAll);
btnDecimal.addEventListener("click", appendDecimal);
btnNegative.addEventListener("click", addNegative);

btnNumber.forEach((e) =>
  e.addEventListener("mousedown", () => appendNumber(e.textContent))
);
btnOperator.forEach((e) =>
  e.addEventListener("mousedown", () => setOperation(e.textContent))
);

function appendNumber(number) {
  pressedNumber = document.getElementById(String(number));
  addPressed(pressedNumber);

  if (operationComplete === true) {
    clearDisplay(), (lastOperation.textContent = "");
  }
  if (currentOperation.textContent === "0" || operatorSet) clearDisplay();
  if (exceedsDisplayLimit() === false) currentOperation.textContent += number;
}

function setOperation(operator) {
  pressedOperator = document.getElementById(String(operator));
  addPressed(pressedOperator);

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
  addPressed(btnDecimal);
  if (currentOperation.textContent.includes(".")) return;
  currentOperation.textContent += ".";
}

function addNegative() {
  addPressed(btnNegative);
  if (currentOperation.textContent.includes("-")) {
    currentOperation.textContent = currentOperation.textContent.slice(1);
  }
  if (currentOperation.textContent !== "0")
    currentOperation.textContent = "-" + currentOperation.textContent;
}

function deleteNumber() {
  addPressed(btnDelete);
  currentOperation.textContent = currentOperation.textContent.slice(0, -1);
}

function clearAll() {
  addPressed(btnClear);
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

function exceedsDisplayLimit() {
  if (currentOperation.textContent.length >= 12) {
    return true;
  } else {
    return false;
  }
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

//keyboard feature below
document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === "Enter") calculate(), addPressed(btnEquals);
  if (e.key === ".") appendDecimal();
  if (e.key === "Escape") clearAll();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
});

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

function addPressed(e) {
  e.classList.add("pressed");
}

function removeTransition(e) {
  e.target.classList.remove("pressed");
}
const btns = Array.from(document.querySelectorAll(".btn"));
btns.forEach((btn) => btn.addEventListener("transitionend", removeTransition));
