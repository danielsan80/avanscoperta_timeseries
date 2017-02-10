# Time Series


  * <a href="#basic">Basic Usage</a>
  * <a href="#api">API</a>

<a name="basic"></a>
Basic usage
-----------

```js
var timeseries = require('timeseries')

var timeserie = timeseries(mongodbConn, pino);

// 2) put a key & value
timeserie.addPoint(new Date(), 'smog', 45, callback);

timeserie.addPoint(new Date(), 'smog', 45, callback);

var stream = timeserie.fetchSerie('smog', {
  from: aWeekAgo,
  to: new Date(),
});

...

```

<a name="api"></a>
## API

  * <a href="#creator"><code><b>timeseries(mongodbConn, logger)</b></code></a>
  * <a href="#addPoint"><code>timeserie.<b>addPoint(date, type, value, callback)</b></code></a>
  * <a href="#fetchSerie"><code>timeserie.<b>fetchSerie(type, query = {})</b></code></a>

--------------------------------------------------------
<a name="creator"></a>
### timeseries(mongodbConn, logger)
<code>timeseries()</code> is the main entry point for creating a new timeserie instance.


--------------------------------------------------------
<a name="addPoint"></a>
### timeserie.addPoint(date, type, value, callback)
<code>timeserie.addPoint()</code> method will add a new point for a specified `type` at the specified `date`. `value` should be a number.

```js
timeserie.addPoint(new Date(), 'smog', 42, function (err) {
  if (err) throw err
})
```

--------------------------------------------------------
<a name="fetchSerie"></a>
### timeserie.fetchSerie(type, query)
<code>timeserie.fetchSerie()</code> method will fetch the point collection for a given `type` matching a given `query`.
This will return a stream of points.

```js
var stream = timeserie.fetchSerie('smog', {
  from: aWeekAgoDate,
  to: new Date()
})
```
#### `Query`

* `from` the lower bound date interval.
* `to` the upper bound date interval
