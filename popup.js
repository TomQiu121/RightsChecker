async function summarizeTerms(text) {
    try {
        const response = await fetch('http://localhost:3000/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        const result = await response.json();
        return result.summary;
    } catch (error) {
        console.error('Error fetching the summary:', error);
        return 'Unable to summarize at this time.';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const response = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = response[0];
    const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => document.body.innerText
    });

    const summary = await summarizeTerms(result.result);
    document.getElementById('checklist').innerText = summary;
});
