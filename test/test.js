'use strict'

var tap = require('tap')

var MongoClient = require('mongodb').MongoClient
var pino = require('pino')
var map = require('async').map
var moment = require('moment')

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

tap.afterEach(function (done) {
  db.close(done)
})

tap.test('addPoint', function (t) {
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

      t.end()
    })
  })
})

tap.test('fetchSerie', function (t) {
  var logger = pino()
  var timeserie = timeseries(db, logger)
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

  map(points, function (item, next) {
    timeserie.addPoint(item.date, item.type, item.value, next)
  }, function (err) {
    t.error(err)
    var stream = timeserie.fetchSerie('smog', {
      from: moment().subtract(1, 'week').toDate(),
      to: new Date()
    })

    var docs = []

    stream.on('data', function (doc) {
      docs.push(doc)
    })

    stream.on('end', function () {
      t.equal(docs.length, 2)

      t.equal(docs[0].date.toISOString(), points[1].date.toISOString())
      t.equal(docs[0].type, points[1].type)
      t.equal(docs[0].value, points[1].value)

      t.equal(docs[1].date.toISOString(), points[2].date.toISOString())
      t.equal(docs[1].type, points[2].type)
      t.equal(docs[1].value, points[2].value)

      t.end()
    })
  })
})
