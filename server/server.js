const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 8090;



app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


app.listen(port, () =>
  console.log(`Server listening on port ${port}`),
);
