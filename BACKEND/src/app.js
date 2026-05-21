const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
})

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

//simply backend testing
app.get('/', (req, res) => {
  res.send('Backend is running');
});

//testing api.... This returns details of the current user thats it
app.get('/vt-test', async (req, res) => {
  try{
    const response = await axios.get(
      'https://www.virustotal.com/api/v3/users/current', 
      {
        headers: {
          'x-apikey': process.env.VT_API_KEY
        }
      }
    );
    res.json(response.data);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('VirusTotal API request failed');
  }
}); 

//for sending file to virus total and getting the response.data ONLY
app.post('/scan', upload.single('file'), async (req, res) => {
    try{
      const formData = new FormData();

      formData.append('file', req.file.buffer, req.file.originalname);

      const response = await axios.post(
        'https://www.virustotal.com/api/v3/files',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-apikey': process.env.VT_API_KEY  
          }
        }
      );
      res.json(response.data);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('VirusTotal API request failed');
    }
});

//to get the report of the file using its id
app.get('/result/:id', async (req, res) => {
  try{
    const analysisId = req.params.id;
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
      {
        headers: {
          'x-apikey': process.env.VT_API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Failed to fetch analysis results');
  }
});

app.post('/ai-summary', async (req, res) => {
  try {

    console.log("AI ROUTE HIT");
    console.log(req.body);

    const { reportData } = req.body;

    const prompt = `
You are a cybersecurity assistant.

Analyze this VirusTotal scan result:

Malicious: ${reportData.malicious}
Suspicious: ${reportData.suspicious}
Undetected: ${reportData.undetected}
And make sure to not use text in bold or itaclic. Just plain text.
Give:
1. Simple safety verdict (Safe / Suspicious / Dangerous)
2. Short explanation (120 words max)
3. Advice to user
`;

const result = await model.generateContent({ contents: [
  { 
    role: "user", 
    parts: [{ text: prompt }] 
  }
] 
});

const response = await result.response;
const text = response.text();

console.log("AI RESPONSE:", text);

res.json({ summary: text }); //sends summary to frontend

  } catch (err) {
    console.log("FULL AI ERROR");
    console.log(err);
    res.status(500).json({
    error: err.message
  });
  }
});

module.exports = app;