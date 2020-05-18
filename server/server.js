const http = require("http");
const express = require("express");
const cors = require('cors')
const server = require('./api/api.js');
const mw = require('./mw/mw.js');

const app = express();
const port = process.env.PORT || 8090;
const path = './db/lists.json';

app.use(cors())

// OBS! Not pre-made middlewares, see ./mw/mw.js
app.use(mw.json);
app.use(mw.log);



// app.use((req, res, next) => {
//   if (req.is('json')) {
//     let data = '';
//     req.on('data', chunk => {
//       data += chunk.toString();
//     });
//     req.on('end', () => {
//       return Promise.resolve()
//       .then(() => {
//         data = JSON.parse(data);
//         req.body = data;
//         next();
//       })
//       .catch(() => {
//         res.status(400).end();
//       })
//     });
//   }
//   else {
//     next();
//   }
// });


app.get('/api', (req, res) => {
  server.get(path, callback);
  function callback (data) {
    return res.send(data);
  }
});

app.post('/api', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/api', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/api', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});


app.listen(port, () =>
console.log(`Server listening on port ${port}`),
);
