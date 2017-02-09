# Time Series


```js
var timeseries = require('timeseries')

var timeserie = timeseries(mongodbConn, pino);

// 2) put a key & value
timeserie.addPoint(new Date(), 'smog', 45);

timeserie.addPoint(new Date(), 'smog', 45);

var stream = timeserie.fetchSerie('smog', {
  from: aWeekAgo,
  to: new Date(),
});

...

```

<a name="api"></a>
## API

  * <a href="#ctor"><code><b>timeseries(mongodbConn, logger)</b></code></a>
  * <a href="#open"><code>timeserie.<b>addPoint(timestamp, type, value)</b></code></a>
  * <a href="#open"><code>timeserie.<b>fetchSerie(type, query = {})</b></code></a>
