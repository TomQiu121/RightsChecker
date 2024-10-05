document.addEventListener('DOMContentLoaded', async () => {
    const response = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = response[0];
    const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText
    });

    const summary = await summarizeTerms(result.result);
    document.getElementById('checklist').innerHTML = summary.checklist.map(item => `<li>${item}</li>`).join('');
});
