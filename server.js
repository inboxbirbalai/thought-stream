const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp", // Targeting Flash 2.0/3.0 preview
  generationConfig: {
    responseMimeType: "application/json",
  }
});

app.post('/api/reason', async (req, res) => {
  const { prompt } = req.body;

  try {
    const systemPrompt = "You are a 'Chain of Thought' reasoning engine. When given a prompt, output exactly 5 reasoning steps followed by a final answer. Format as JSON: { \"steps\": [\"step 1...\", \"step 2...\", ...], \"answer\": \"final answer...\" }";
    
    const result = await model.generateContent(`${systemPrompt}\n\nUser Prompt: ${prompt}`);
    const responseText = result.response.text();
    
    res.json(JSON.parse(responseText));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connect to the Gemini brain." });
  }
});

const PORT = 3006;
app.listen(PORT, () => console.log(`Gemini Brain active on port ${PORT}`));
