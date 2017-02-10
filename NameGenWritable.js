'use strict'

const timeseries = require('./index')
const util = require('util')
const Writable = require('stream').Writable

function NameGenWritable(options) {
  this.timeserie = timeseries(options.db, options.logger)

  options.objectMode = true

  Writable.call(this, options)

  this._write = function _write(chunk, encoding, callback) {
    var date = chunk.date
    var type = chunk.type
    var value = chunk.value

    this.timeserie.addPoint(date, type, value, function (err) {
      callback(err)
    })
  }
}

util.inherits(NameGenWritable, Writable)
module.exports = NameGenWritable
