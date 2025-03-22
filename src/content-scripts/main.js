console.log("I've been injected into the page!");

let currVideoID = 0;
let vidsScrolled = 0;

setInterval(() => {
  const ytRenderer = document.querySelector("ytd-reel-video-renderer");
  if (ytRenderer) {
    newVidID = ytRenderer.parentElement.id;
    if (currVideoID != newVidID) {
        currVideoID = newVidID;
        vidsScrolled++;
    }
  }
  console.log(vidsScrolled);
}, 1000);
