import axios from "axios";
const gemini=async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await axios.
      post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, { prompt });
      res.json({ response: response.data });
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      res.status(500).json({ error: 'Unable to get a response from the API' });
    }
  }

export {gemini}


