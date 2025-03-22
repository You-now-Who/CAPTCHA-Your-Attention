console.log("I've been injected into the page!");

let currVideoID = 0;
let vidsScrolled = 0; // Reset to 0 at the start of each session
let timeOnScoll = 0;
let captchaInterval = 10; // Default interval
let captchasSolved = 0;

// Load the saved interval from storage
chrome.storage.local.get(['captchaInterval', 'timeOnScoll', 'captchasSolved'], (data) => {
  if (data.captchaInterval) {
    captchaInterval = parseInt(data.captchaInterval, 10);
  }
  if (data.timeOnScoll) {
    timeOnScoll = data.timeOnScoll;
  }
  if (data.captchasSolved) {
    captchasSolved = data.captchasSolved;
  }
});

setInterval(() => {
  const ytRenderer = document.querySelector("ytd-reel-video-renderer");
  if (ytRenderer) {
    newVidID = ytRenderer.parentElement.id;
    if (currVideoID != newVidID) {
      currVideoID = newVidID;
      // console.log("Adding to scroll vids")
      addToScrollVids(1);
      vidsScrolled++;
      // console.log("Added to scroll vids")

      if (vidsScrolled % captchaInterval == 0) {
        videoPlayback = ytRenderer.querySelector("video");
        if (videoPlayback) {
          videoPlayback.pause();
        }
        showCaptcha(videoPlayback, vidsScrolled);
        captchasSolved++;
        chrome.storage.local.set({ captchasSolved: captchasSolved });
      }
    }
  }
  console.log(vidsScrolled);
}, 200);

setInterval(() => {
  timeOnScoll++;
  chrome.storage.local.set({ timeOnScoll: timeOnScoll });
  console.log(`Time spent watching shorts: ${timeOnScoll} seconds`);
}, 1000);
