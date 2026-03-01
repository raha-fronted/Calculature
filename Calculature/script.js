const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;

const operators = ["+", "-", "*", "/"];

buttons.forEach(button => {
  button.addEventListener("click", () => handleInput(button.innerText));
});

document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || e.key === ".") handleInput(e.key);
  if (operators.includes(e.key)) handleInput(e.key);
  if (e.key === "Enter") handleInput("=");
  if (e.key === "Backspace") clear();
});

function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    appendNumber(value);
    return;
  }

  if (operators.includes(value)) {
    chooseOperator(value);
    return;
  }

  if (value === "=") {
    calculate();
    return;
  }

  if (value === "C") {
    clearAll();
  }
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentInput = "";
    shouldResetScreen = false;
  }

  if (number === "." && currentInput.includes(".")) return;

  currentInput += number;
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  shouldResetScreen = true;
}

function calculate() {
  if (!operator || currentInput === "") return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = "";
  shouldResetScreen = true;

  updateDisplay();
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay();
}

function clear() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput || "0";
}
