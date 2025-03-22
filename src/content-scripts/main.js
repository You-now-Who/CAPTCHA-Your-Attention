console.log("I've been injected into the page!");

setInterval(() => {
    const ytRenderer = document.querySelector("ytd-reel-video-renderer");
    if (ytRenderer) {
        console.log("Found a video!");
        const video = ytRenderer.querySelector("video");
        if (video) {
            console.log("Found a video element!");
            video.playbackRate = 10;
        }
    }
}, 200);

