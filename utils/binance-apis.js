// Binance REST API
  // useEffect(() => {
  //   const tickerInterval = setInterval(() => {
  //     fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT').then(res => res.json()).then(data => {
  //       setTradeInfo(data)
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }, 5000)

  //   return () => {
  //     clearInterval(tickerInterval)
  //   }
  // }, [])


// @miniTracker DS
/*
E: 1643287082448
c: "3.47710000" // Last price 
e: "24hrMiniTicker"
h: "3.50990000"
l: "2.96160000"
o: "3.21970000"
q: "272981574.75930000"
s: "SANDUSDT"
v: "85068418.00000000"
*/

// Kline data - REST API
// https://api.binance.com/api/v3/klines?symbol=SANDUSDT&interval=5m&startTime=1643441142000&endTime=1643444742000
/*
[
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
*/

// REST APIs
// https://developers.binance.com/docs/binance-api/spot-detail/rest-api#general-endpoints
// https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
// https://api.binance.com/api/v3/depth?symbol=BTCUSDT
// https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT

// web socket stream API
// wss://stream.binance.com:9443

// Time conversion to Unix timestamp
// import getUnixTime from 'date-fns/getUnixTime';
// const result = getUnixTime(new Date('2018-04-04T03:24:00.000Z'));
// const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))