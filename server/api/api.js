const fsp = require('fs').promises;


module.exports = {

    get: function Get (path, callback) {
      fsp.readFile(path).then(data => {
        callback(JSON.parse(data))
      }).catch(error => {
        callback(error);
        console.log(error);
      })
    },

    post: function Post (path, callback) {

    },

    put: function Put (path, callback) {

    },

    delete: function Delete (path, callback) {

    }
}
