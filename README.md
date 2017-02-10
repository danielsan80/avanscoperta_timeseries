# Time Series


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
  * <a href="#addPoint"><code>timeserie.<b>addPoint(timestamp, type, value, callback)</b></code></a>
  * <a href="#fetchSerie"><code>timeserie.<b>fetchSerie(type, query = {})</b></code></a>
