'use strict'

const Transform = require('stream').Transform



function creator (db, logger) {
  return {
    addPoint: function addPoint (date, type, value, callback) {
      var collection = db.collection('timeserie.' + type)
      var doc = {
        date: date,
        type: type,
        value: value
      }

      collection.insertOne(doc, function handlingInsertOne (err, r) {
        if (err) {
          return callback(err)
        }
        if (r.result.n !== 1) {
          return callback(new Error('Unable to inser point'))
        }
        callback()
      })
    },
    fetchSerie: function fetchSerie (type, query) {
      var collection = db.collection('timeserie.' + type)
      var cursor = collection.find({
        date: {
          $gte: query.from,
          $lte: query.to
        },
        type: type
      }).sort({date: 1})

      const t = new Transform({
        transform: function transform(chunk, encoding, callback) {
          this.push(data)
          callback()
        }
      })


      return cursor.pipe(t)
    }
  }
}

module.exports = creator
