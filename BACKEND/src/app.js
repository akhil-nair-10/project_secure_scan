const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });


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
app.post('/scan', upload.single('file'), (req, res) => {
    console.log('Received file:', req.file);
    res.send('File received successfully');
});

module.exports = app;