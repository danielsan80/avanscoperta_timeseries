'use strict'

var tap = require('tap')

var MongoClient = require('mongodb').MongoClient
var pino = require('pino')
var map = require('async').map
var moment = require('moment')
var streamify = require('stream-array')

var NameGenWritable = require('../NameGenWritable')
var url = 'mongodb://localhost:27017/test'
var db

var points = [{
  date: moment().subtract(1, 'months').toDate(),
  type: 'smog',
  value: Math.random() * 100
}, {
  date: moment().subtract(3, 'days').toDate(),
  type: 'smog',
  value: Math.random() * 100
}, {
  date: new Date(),
  type: 'smog',
  value: Math.random() * 100
}, {
  date: new Date(),
  type: 'temp',
  value: Math.random() * 100
}]

tap.beforeEach(function (done) {
  MongoClient.connect(url, function (err, _db) {
    if (err) return done(err)
    db = _db
    db.dropDatabase(done)
  })
})

tap.afterEach(function (done) {
  db.close(done)
})

tap.test('writing', function (t) {
  var date = new Date()
  var type = 'smog'
  var value = 42

  var logger = pino()

  var nameGenWritable = new NameGenWritable({db: db, logger:logger})

  var source = streamify(points)

  var dest = source.pipe(nameGenWritable)

  dest.on('finish', function() {
    var cursor = db.collection('timeserie.' + type).find({})
    cursor.toArray(function (err, docs) {
      t.error(err)
      t.equal(docs.length, 3)

      t.equal(docs[0].date.toISOString(), points[0].date.toISOString())
      t.equal(docs[0].type, points[0].type)
      t.equal(docs[0].value, points[0].value)

      t.equal(docs[1].date.toISOString(), points[1].date.toISOString())
      t.equal(docs[1].type, points[1].type)
      t.equal(docs[1].value, points[1].value)

      t.equal(docs[2].date.toISOString(), points[2].date.toISOString())
      t.equal(docs[2].type, points[2].type)
      t.equal(docs[2].value, points[2].value)

      t.end()
    })
  })
})
