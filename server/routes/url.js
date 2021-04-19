const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const mongodb = require('mongodb');
const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});


// @route     GET /api/url/list
// @desc      REST API JSON Format
router.get('/list', async (req, res) => {
  const urls = await loadUrlsCollection();
  res.send(await urls.find({}).toArray());
});

async function loadUrlsCollection() {
  const client = await mongodb.MongoClient.connect(config.get('mongoURI'),
  { useNewUrlParser: true },
  { useUnifiedTopology: true });

  return client.db('url-shortener').collection('urls');
}

module.exports = router;