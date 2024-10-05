// backend.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = 'your_openai_api_key_here';

app.post('/summarize', async (req, res) => {
    try {
        const { text } = req.body;

        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4',
            prompt: `Summarize the following terms and conditions: ${text}`,
            max_tokens: 200,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        res.json({ summary: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error summarizing the terms');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
