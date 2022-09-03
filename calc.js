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

const btnNumber = document.querySelectorAll("[data-number]");
const btnOperator = document.querySelectorAll("[data-operator]");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnEquals = document.getElementById("equals");
const btnDot = document.getElementById("dot");
const lastOperationDisplay = document.getElementById("lastOperationDispaly");
const currentOperationDisplay = document.getElementById(
  "currentOperationDispaly"
);

btnDelete.onclick = () => deleteNumber();
btnClear.onclick = () => clear();

btnNumber.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);
function appendNumber(number) {
  // if (currentOperationDisplay.textContent === "0" || shouldResetScreen)
  //   resetScreen();
  currentOperationDisplay.textContent += number;
}

btnOperator.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function deleteNumber() {
  currentOperationDisplay.textContent = currentOperationDisplay.textContent
    .toString()
    .slice(0, -1);
}

function clear() {
  lastOperationDisplay.innerHTML = "";
  currentOperationDisplay.innerHTML = "";
}
