function getLocal (key, func) {
    chrome.storage.local.get(key)
        .then(object => func(object[key]))
        .catch(error => console.error(error))
}
    

function setLocal(object) {
    for (let key in object) {
        const values = object[key];
        getLocal(key, result => {
            chrome.storage.local.set({
                ...result,
                values
            });
        });
    }
}

function addToScrollVids(value) {
    getLocal('scrollVids', currentValue => {
        const newValue = (currentValue || 0 ) + value;
        setLocal({scrollVids: newValue})
    })
}

// Initializes the scrollVids here to 0 if undefined
// Prolly not the best practice to do this in the handler
getLocal('scrollVids', currentValue => currentValue === undefined && setLocal({ scrollVids: 0 }));