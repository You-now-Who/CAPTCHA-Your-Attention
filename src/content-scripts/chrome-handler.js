function getLocal(key, func) {
    chrome.storage.local.get(key)
        .then(object => func(object[key]))
        .catch(error => console.error(error));
}

function setLocal(object) {
    for (let key in object) {
        const newValue = object[key];
        getLocal(key, result => {
            const updatedValue = { ...result, ...{ [key]: newValue } };
            chrome.storage.local.set(updatedValue)
                .catch(error => console.error(error));
        });
    }
}

function addToScrollVids(value) {
    getLocal('scrollVids', currentValue => {
        const newValue = (currentValue || 0) + value;
        setLocal({ scrollVids: newValue });
    });
}

// Initializes the scrollVids here to 0 if undefined
// Prolly not the best practice to do this in the handler
getLocal('scrollVids', currentValue => {
    if (currentValue === undefined) {
        setLocal({ scrollVids: 0 });
    }
});