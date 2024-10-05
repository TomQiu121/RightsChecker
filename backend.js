const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;

        // Run the Python script and pass input to it
        const python = spawn('python3', ['llama_summarizer.py']);
        python.stdin.write(JSON.stringify({ text }));
        python.stdin.end();

        let output = '';
        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).send('Error summarizing the terms');
            }
            const summary = JSON.parse(output).summary;
            res.json({ summary });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error summarizing the terms');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
