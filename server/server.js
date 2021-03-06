const http = require("http");
const express = require("express");
const cors = require('cors')
const server = require('./api/api.js');
const mw = require('./mw/mw.js');
const index = require("./routes/index");

const app = express();
const port = process.env.PORT || 8090;
const path = './db/lists.json';

// OBS! Not pre-made or imported middlewares, see ./mw/mw.js for referance.
///////////////
app.use(mw.log);
app.use(mw.json);
///////////////

app.use(index)
app.use(cors())


app.get('/api', (req, res) => {
  server.get(path, callback, error);
  function callback (data) {
    return res.status(200).send(data);
  }
  function error () {
    return res.status(500).end();
  }
});

app.post('/api', (req, res) => {
  let data = req.body
  server.post(path, data, callback, error);
  function callback () {
    return res.status(201).end();
  }
  function error () {
    return res.status(500).end();
  }
});

app.put('/api', (req, res) => {
  let data = req.body;
  server.put(path, data, callback, error);
  function callback () {
      return res.status(201).end();
  }
  function error () {
    return res.status(500).end();
  }
});

app.delete('/api/:id', (req, res) => {
  let data = req.params.id.replace(/:/g,'')
  server.delete(path, data, callback, error);
  function callback () {
      res.status(202).end();
  }
  function error () {
    return res.status(500).end();
  }
});


app.listen(port, () =>
console.log(`Server listening on port ${port}`),
);
