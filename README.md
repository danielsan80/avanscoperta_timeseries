Time Series
===========


```js
var timeseries = require('timeseries')

var timeserie = timeseries(mongodbConn, pino);

// 2) put a key & value
timeserie.addPoint(now(), 'smog', 45);

timeserie.addPoint(now(), 'smog', 45);

var promise = timeserie.fetchSerie('smog', aWeekAgo, now());

...

```

<a name="api"></a>
## API

  * <a href="#ctor"><code><b>timeseries(mongodbConn, logger)</b></code></a>
  * <a href="#open"><code>timeserie.<b>addPoint(timestamp, type, value)</b></code></a>
  * <a href="#open"><code>timeserie.<b>fetchSerie(type, from, to = undefined)</b></code></a>
