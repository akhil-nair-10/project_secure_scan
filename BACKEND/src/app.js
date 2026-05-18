const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

//simply backend testing
app.get('/', (req, res) => {
  res.send('Backend is running');
});

//testing api 
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

module.exports = app;