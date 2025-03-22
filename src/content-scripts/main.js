console.log("I've been injected into the page!");

let currVideoID = 0;
let vidsScrolled = 0;

let timeOnScoll = 0;

setInterval(() => {
  const ytRenderer = document.querySelector("ytd-reel-video-renderer");
  if (ytRenderer) {
    newVidID = ytRenderer.parentElement.id;
    if (currVideoID != newVidID) {
        currVideoID = newVidID;
        // console.log("Adding to scroll vids")
        // addToScrollVids(1);
        vidsScrolled++;
        // console.log("Added to scroll vids")
        showCaptcha()
    }
  }
  console.log(vidsScrolled);
}, 200);

setInterval(() => {
    timeOnScoll++;
    console.log(`Time spent watching shorts: ${timeOnScoll} seconds`);
}, 1000)

