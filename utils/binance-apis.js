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

// REST APIs
// https://developers.binance.com/docs/binance-api/spot-detail/rest-api#general-endpoints
// https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT
// https://api.binance.com/api/v3/depth?symbol=BTCUSDT
// https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT

// web socket stream API
// wss://stream.binance.com:9443