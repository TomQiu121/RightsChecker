document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Check if the tab URL is valid and accessible
        if (tab.url.startsWith('http') || tab.url.startsWith('https')) {
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => document.body.innerText
            });

            if (result && result.result) {
                const summary = await summarizeTerms(result.result);
                document.getElementById('checklist').innerText = summary;
            } else {
                document.getElementById('checklist').innerText = 'Unable to extract terms and conditions from this page.';
            }
        } else {
            document.getElementById('checklist').innerText = 'This page is restricted and cannot be summarized.';
        }
    } catch (error) {
        console.error('Error accessing the tab or summarizing:', error);
        document.getElementById('checklist').innerText = 'An error occurred while trying to summarize the terms and conditions.';
    }
});
