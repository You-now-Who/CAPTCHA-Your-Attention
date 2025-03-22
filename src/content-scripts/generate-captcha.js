function generateCaptchaText(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaText = "";
  for (let i = 0; i < length; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captchaText;
}

function createCaptchaElement() {
  // Remove any existing CAPTCHA
  const existingCaptcha = document.getElementById("custom-captcha-container");
  if (existingCaptcha) existingCaptcha.remove();

  // Create the container
  const captchaContainer = document.createElement("div");
  captchaContainer.id = "custom-captcha-container";
  captchaContainer.style.position = "fixed";
  captchaContainer.style.top = "0";
  captchaContainer.style.left = "0";
  captchaContainer.style.width = "100%";
  captchaContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  captchaContainer.style.color = "white";
  captchaContainer.style.padding = "10px";
  captchaContainer.style.textAlign = "center";
  captchaContainer.style.zIndex = "10000";
  captchaContainer.style.fontFamily = "Arial, sans-serif";
  captchaContainer.style.display = "flex";
  captchaContainer.style.justifyContent = "center";
  captchaContainer.style.alignItems = "center";
  captchaContainer.style.gap = "10px";

  // Generate CAPTCHA text
  const captchaText = generateCaptchaText();
  captchaContainer.dataset.captcha = captchaText;

  // Create CAPTCHA display
  const captchaDisplay = document.createElement("span");
  captchaDisplay.textContent = `Enter: ${captchaText}`;
  captchaDisplay.style.fontSize = "18px";
  captchaDisplay.style.fontWeight = "bold";

  // Create input field
  const captchaInput = document.createElement("input");
  captchaInput.type = "text";
  captchaInput.placeholder = "Enter CAPTCHA";
  captchaInput.style.padding = "5px";
  captchaInput.style.border = "1px solid #ccc";
  captchaInput.style.borderRadius = "5px";

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Verify";
  submitButton.style.padding = "5px 10px";
  submitButton.style.backgroundColor = "#28a745";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "5px";
  submitButton.style.cursor = "pointer";

  submitButton.onclick = function () {
    if (captchaInput.value === captchaContainer.dataset.captcha) {
      alert("CAPTCHA Verified!");
      captchaContainer.remove();
    } else {
      alert("Incorrect CAPTCHA. Try again!");
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

// Inject CAPTCHA immediately
createCaptchaElement();
