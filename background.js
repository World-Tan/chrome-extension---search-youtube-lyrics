chrome.runtime.onInstalled.addListener(function () {
    console.log("Background script is running.");
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "openTab") {
        (async () => {
            let tab = await chrome.tabs.create({ url: request.url, active: true })
            tab.focus()
            sendResponse(tab.id)
        })() 
        return true
    } else if (request.action === "closeTab") {
        chrome.tabs.remove(request.id)
    }
});