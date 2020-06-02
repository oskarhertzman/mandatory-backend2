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

  put: function Put (path, data, callback, error) {
    fsp.readFile(path).then(fileData => {
      let parsed = JSON.parse(fileData).data;
      for (let [i,cards] of parsed.entries()) {
        if (data.referance === cards.uuid) {
          for (let [j,card] of cards.cards.entries()) {
            if (data.data.uuid === card.uuid) {
              parsed[i].cards[j] = data.data;
              break;
            }
          }
        }
      }
      fsp.writeFile(path, JSON.stringify({data: parsed})).then(data => {
        callback()
      }).catch(err => {
        error();
      })
    })
  },

  delete: function Delete (path, data, callback, error) {
    fsp.readFile(path).then(fileData => {
      let parsed = JSON.parse(fileData).data;
      for (let [index,item] of parsed.entries()) {
        if (data === item.uuid) {
          parsed.splice(index, 1);
          break;
        }
      }
      fsp.writeFile(path, JSON.stringify({data: parsed})).then(data => {
        callback()
      }).catch(err => {
        error();
      })
    })
  },
}
