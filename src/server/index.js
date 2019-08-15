require('dotenv').config();
const express = require('express');
const app = express();
const auth = require('./auth');
const upload = require('./upload');

const multer  = require('multer');
const dest = multer({ dest: 'uploads/' });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

app.get('/', (req, res) => {
  res.status(404).send('');
  res.end();
});

app.get('/api/auth', (req, res) => {
    auth.auth(req, res);
});

app.post('/api/upload', dest.single('sypht_document'), (req, res) => {
    upload.upload(req, res);
});