const express = require("express");
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const urlencodedParser = bodyParser.urlencoded();
const port = 3000;

function hash(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

app.post("/", urlencodedParser, (req, res) => {
  const { text } = req.body;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id: hash(text) }));
});

app.listen(port, () => {
  console.log(`Mock query persistance server listening at http://localhost:${port}`)
})