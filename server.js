const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/reason', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a 'Chain of Thought' reasoning engine. When given a prompt, output exactly 5 reasoning steps followed by a final answer. Format as JSON: { \"steps\": [\"step 1...\", \"step 2...\", ...], \"answer\": \"final answer...\" }" 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    res.json(JSON.parse(response.choices[0].message.content));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to the brain." });
  }
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Brain active on port ${PORT}`));
