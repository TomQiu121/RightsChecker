chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showIcon") {
        chrome.action.setIcon({ path: "active-icon.png", tabId: sender.tab.id });
    }
});
