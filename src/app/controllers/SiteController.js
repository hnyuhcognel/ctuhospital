const Address = require('../models/Address')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { Schema } = require('mongoose')

class SiteController {
  index (req, res, next) {
    Address.find({})
    .then(addresses => {
      res.render('index', {
        addresses: multipleMongooseToObject(addresses)
      })
    })
    .catch(next)
  }
}

module.exports = new SiteController