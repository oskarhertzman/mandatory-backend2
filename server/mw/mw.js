

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
    const { hostname, method, path } = req;
    const { statusCode } = res;
    req.on("end", () => {
      console.log({
        timestamp: Date.now(),
        responseTime: Date.now() - reqStart + "ms",
        hostname,
        path,
        method,
        response: {
          statusCode,
        }
      }
    );
  })
  next();
  },
}
