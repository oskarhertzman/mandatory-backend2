const fsp = require('fs').promises;


module.exports = {

    get: function Get (path, callback, error) {
      fsp.readFile(path).then(data => {
        callback(JSON.parse(data))
      }).catch(err => {
          error();
      })
    },

    post: function Post (path, data, callback, error) {
      fsp.writeFile(path, JSON.stringify(data)).then(data => {
        callback()
      }).catch(err => {
        error();
      })
    },

    put: function Put (path, callback) {

    },

    delete: function Delete (path, callback) {

    }
}
