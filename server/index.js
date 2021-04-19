const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})