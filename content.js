document.addEventListener('DOMContentLoaded', function () {
    if (document.body.innerText.includes("Terms and Conditions")) {
        chrome.runtime.sendMessage({ action: "showIcon" });
    }
});
