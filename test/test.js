'use strict'

var tap = require('tap')

var MongoClient = require('mongodb').MongoClient
var pino = require('pino')

var timeseries = require('../index')
var url = 'mongodb://localhost:27017/test'
var db

tap.beforeEach(function (done) {
  MongoClient.connect(url, function (err, _db) {
    if (err) return done(err)
    db = _db
    db.dropDatabase(done)
  })
})

tap.test('ok', function (t) {
  var date = new Date()
  var type = 'smog'
  var value = 42

  var logger = pino()
  var timeserie = timeseries(db, logger)
  timeserie.addPoint(date, type, value, function (err) {
    t.same(err, null)
    var cursor = db.collection('timeserie.' + type).find({})
    cursor.toArray(function (err, docs) {
      t.same(err, null)
      t.equal(docs.length, 1)
      t.equal(docs[0].date.toISOString(), date.toISOString())
      t.equal(docs[0].type, type)
      t.equal(docs[0].value, value)

      db.close()
      t.end()
    })
  })
})
