const mongo = require('mongoose')

const antiinv = new mongo.Schema({
  guild: {
    type: String,
    defualt: 'null'
  }
})
module.exports = mongo.model('anti-invite', antiinv);
