function generateMathCaptcha(difficulty) {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer;
  if (operator === "+") answer = num1 + num2;
  else if (operator === "-") answer = num1 - num2;
  else if (operator === "*") answer = num1 * num2;

  let text = `${num1} ${operator} ${num2}`;

  for (let i = 1; i < difficulty; i++) {
    const num = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    if (operator === "+") answer += num;
    else if (operator === "-") answer -= num;
    else if (operator === "*") answer *= num;
    text += ` ${operator} ${num}`;
  }

  return { text: text, answer: answer.toString() };
}

function showCapt2cha() {
  document.getElementById("custom-captcha-container")?.remove();

  const { text, answer } = generateMathCaptcha();

  const captchaContainer = document.createElement("div");
  captchaContainer.id = "custom-captcha-container";
  captchaContainer.dataset.captchaAnswer = answer;

  const heading = document.createElement("div");
  heading.className = "captcha-heading";
  heading.textContent = "Stop the Brainrot 🔥";

  // CAPTCHA display text
  const captchaText = document.createElement("div");
  captchaText.id = "captcha-text";
  captchaText.textContent = text;

  const captchaInput = document.createElement("input");
  captchaInput.type = "number";
  captchaInput.placeholder = "Enter answer";

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

  const refreshButton = document.createElement("button");
  refreshButton.id = "captcha-refresh";
  refreshButton.textContent = "Refresh";
  refreshButton.onclick = showCaptcha;

  captchaContainer.append(
    heading,
    captchaText,
    captchaInput,
    submitButton,
    refreshButton
  );
  document.body.prepend(captchaContainer);
}

function showCaptcha(videoElement, vidsScrolled) {
  // Remove existing CAPTCHA and overlay if any
  const existingCaptcha = document.getElementById("custom-captcha-container");
  const existingOverlay = document.getElementById("captcha-overlay");
  if (existingCaptcha) existingCaptcha.remove();
  if (existingOverlay) existingOverlay.remove();

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "captcha-overlay";
  overlay.style.display = "block";
  document.body.appendChild(overlay);

  chrome.storage.local.get(['difficultyInterval'], (data) => {
    const difficultyInterval = data.difficultyInterval || 3;
    const difficulty = Math.floor(vidsScrolled / difficultyInterval) + 1;
    const { text, answer } = generateMathCaptcha(difficulty);

    const captchaContainer = document.createElement("div");
    captchaContainer.id = "custom-captcha-container";
    captchaContainer.dataset.captchaAnswer = answer;

    const captchaHeading = document.createElement("div");
    captchaHeading.className = "captcha-heading";
    captchaHeading.textContent = "Stop the Brainrot 🔥";

    // CAPTCHA display text
    const captchaText = document.createElement("div");
    captchaText.id = "captcha-text";
    captchaText.textContent = text;

    const captchaInput = document.createElement("input");
    captchaInput.type = "number";
    captchaInput.placeholder = "Enter answer";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Verify";

    const refreshButton = document.createElement("button");
    refreshButton.id = "captcha-refresh";
    refreshButton.textContent = "Refresh";
    refreshButton.onclick = () => showCaptcha(videoElement, vidsScrolled);

    submitButton.onclick = function () {
      if (captchaInput.value === captchaContainer.dataset.captchaAnswer) {
        alert("CAPTCHA Verified!");
        if (videoElement) {
          videoElement.play();
        }
        captchaContainer.remove();
        overlay.remove();
      } else {
        alert("Incorrect answer. Try again!");
        captchaInput.value = "";
      }
    };

    captchaContainer.append(
      captchaHeading,
      captchaText,
      captchaInput,
      submitButton,
      refreshButton
    );
    document.body.prepend(captchaContainer);
  });
}

showCaptcha();
