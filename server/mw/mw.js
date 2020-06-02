

module.exports = {

  json: (req, res, next) => {
    if (req.is('json')) {
      let data = '';
      req.on('data', chunk => {
        data += chunk.toString();
      });
      req.on('end', () => {
        return Promise.resolve()
        .then(() => {
          data = JSON.parse(data);
          req.body = data;
          next();
        })
        .catch(() => {
          res.status(400).end();
        })
      });
    }
    else {
      next();
    }
  },

  log: (req, res, next) => {

    const reqStart = Date.now();
    req.headers['if-none-match'] = 'no-match-for-this';
    res.on('close', onResponse, console.log("close"));
    res.on('finnish', onResponse, console.log("finnish"));

    function onResponse () {
      res.removeListener('close', onResponse);
      res.removeListener('finnish', onResponse);

      const { hostname, method, path } = req;
      const { statusCode } = res;

      console.log({
        hostname,
        method,
        path,
        responseTime: Date.now() - reqStart + "ms",
        timestamp: Date.now(),
        response: statusCode,
      }
    );
  }
  next();
},
}
