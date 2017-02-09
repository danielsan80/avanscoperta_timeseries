'use strict'
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
    }
  }
}

module.exports = creator
