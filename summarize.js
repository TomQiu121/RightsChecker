async function summarizeTerms(text) {
    const response = await fetch('https://your-backend.com/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    const summary = await response.json();
    return summary;
}
