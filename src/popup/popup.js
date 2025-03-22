document.getElementById('save-settings').addEventListener('click', () => {
    const interval = document.getElementById('captcha-interval').value;
    const difficultyInterval = document.getElementById('difficulty-interval').value;
    chrome.storage.local.set({ captchaInterval: interval, difficultyInterval: difficultyInterval }, () => {
        alert('Settings saved!');
    });
});

// Load saved interval and statistics on popup open
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['captchaInterval', 'difficultyInterval', 'vidsScrolled', 'timeOnScoll', 'captchasSolved'], (data) => {
        if (data.captchaInterval) {
            document.getElementById('captcha-interval').value = data.captchaInterval;
            updateSliderValue(data.captchaInterval, 'slider-value', 'shorts');
        }
        if (data.difficultyInterval) {
            document.getElementById('difficulty-interval').value = data.difficultyInterval;
            updateSliderValue(data.difficultyInterval, 'difficulty-slider-value', 'shorts');
        }
        if (data.vidsScrolled) {
            animateCountUp('total-shorts-scrolled', data.vidsScrolled);
            updateScrollDistance(data.vidsScrolled);
        }
        if (data.timeOnScoll) {
            animateCountUp('time-spent', data.timeOnScoll);
        }
        if (data.captchasSolved) {
            animateCountUp('captchas-solved', data.captchasSolved);
            updateCaptchaProgress(data.captchasSolved);
        }
    });

    document.getElementById('captcha-interval').addEventListener('input', (event) => {
        updateSliderValue(event.target.value, 'slider-value', 'shorts');
    });

    document.getElementById('difficulty-interval').addEventListener('input', (event) => {
        updateSliderValue(event.target.value, 'difficulty-slider-value', 'shorts');
    });
});

function animateCountUp(elementId, endValue) {
    const element = document.getElementById(elementId);
    let startValue = 0;
    const duration = 800; // Faster effect
    const increment = endValue / (duration / 50);

    const counter = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
            element.textContent = endValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(startValue);
        }
        element.classList.add('change'); 
        setTimeout(() => element.classList.remove('change'), 150);
    }, 50);
}

// Update the slider text dynamically
function updateSliderValue(value, elementId, unit) {
    const secondsPerShort = 23;
    const totalSeconds = value * secondsPerShort;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const timeText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
    document.getElementById(elementId).innerText = `${value} ${unit} (every ~${timeText})`;
}

// Convert scrolled shorts into meters
function updateScrollDistance(vidsScrolled) {
    const pixelsPerShort = 200;  // Approximate height of a short scroll
    const pixelsPerMeter = 3779; // 1 meter ≈ 3779px
    const metersScrolled = ((vidsScrolled * pixelsPerShort) / pixelsPerMeter).toFixed(2);
    document.getElementById('scroll-distance').textContent = metersScrolled;
}