const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/test', (req, res) => {
    console.log('Received data:', req.body);
    res.send('Data received successfully');
});

module.exports = app;