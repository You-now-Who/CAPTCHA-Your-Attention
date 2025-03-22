console.log("logging in from service worker");

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.scrollVids) {
      console.log("New scrollVids value:", changes.scrollVids.newValue);
    }
  });
