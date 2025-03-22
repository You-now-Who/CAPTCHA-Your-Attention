function generateMathCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer;
  if (operator === "+") answer = num1 + num2;
  else if (operator === "-") answer = num1 - num2;
  else if (operator === "*") answer = num1 * num2;

  return { text: `${num1} ${operator} ${num2}`, answer: answer.toString() };
}

function displayCaptcha() {
  // Remove existing CAPTCHA if any
  const existingCaptcha = document.getElementById("custom-captcha-container");
  if (existingCaptcha) existingCaptcha.remove();

  // Generate new CAPTCHA
  const { text, answer } = generateMathCaptcha();

  // Create CAPTCHA container
  const captchaContainer = document.createElement("div");
  captchaContainer.id = "custom-captcha-container";
  captchaContainer.dataset.captchaAnswer = answer;

  // Create CAPTCHA display
  const captchaDisplay = document.createElement("span");
  captchaDisplay.textContent = `Solve: ${text}`;

  // Create input field
  const captchaInput = document.createElement("input");
  captchaInput.type = "number";
  captchaInput.placeholder = "Enter answer";

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Verify";

  submitButton.onclick = function () {
    if (captchaInput.value === captchaContainer.dataset.captchaAnswer) {
      alert("CAPTCHA Verified!");
      captchaContainer.remove();
    } else {
      alert("Incorrect answer. Try again!");
      captchaInput.value = "";
    }
  };

  // Append elements
  captchaContainer.appendChild(captchaDisplay);
  captchaContainer.appendChild(captchaInput);
  captchaContainer.appendChild(submitButton);

  // Inject into body
  document.body.prepend(captchaContainer);
}

// Load styles dynamically if needed
function loadCaptchaStyles() {
  if (!document.getElementById("captcha-style")) {
    const link = document.createElement("link");
    link.id = "captcha-style";
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("styles.css"); // Load from extension directory
    document.head.appendChild(link);
  }
}

// Call this function to inject CAPTCHA and ensure styles are loaded
function showCaptcha() {
  loadCaptchaStyles();
  displayCaptcha();
}


// showCaptcha()