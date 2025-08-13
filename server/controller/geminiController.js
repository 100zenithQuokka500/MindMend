import axios from "axios";

const gemini = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract the generated text from Gemini's response
    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      return res.status(500).json({ error: 'No response generated from Gemini API' });
    }

    // Remove markdown formatting like ** from the response
    const cleanText = generatedText.replace(/\*\*/g, '');

    res.json({ 
      success: true,
      response: cleanText 
    });

  } catch (error) {
    console.error('Error fetching from Gemini API:', error.response?.data || error.message);
    
    // Provide more specific error messages
    if (error.response?.status === 400) {
      res.status(400).json({ error: 'Invalid request to Gemini API' });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key for Gemini' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded for Gemini API' });
    } else {
      res.status(500).json({ 
        error: 'Unable to get a response from Gemini API',
        details: error.response?.data || error.message
      });
    }
  }
};

export { gemini };


