
import { useEffect, useState, useRef } from "react"
import { toLower } from 'lodash'

const allTickers = ["axsusdt@miniTicker", "nearusdt@ticker", "sandusdt@ticker", "solusdt@ticker", "ftmusdt@ticker", "stxusdt@ticker", "cakeusdt@ticker", "lunausdt@ticker", "mcusdt@ticker", "adausdt@ticker", "maticusdt@ticker"]

const useWsStream = (symbol) => {
  const [latestPrices, setLatestPrices] = useState([])
  const [tickers, setTickers] = useState(allTickers)
  const [isPaused, setIsPaused] = useState(false)
  const ws = useRef(null)

  useEffect(() => {
    setTickers(prevTickers => [...prevTickers, `${toLower(symbol)}@miniTicker`])
  }, [symbol])


  useEffect(() => {
    ws.current = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${tickers.join("/")}`)

    const wsCurrent = ws.current
    return () => {
      wsCurrent.close();
    };
  }, [])

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      if (isPaused) return;
      const result = JSON.parse(e.data).data

      if (latestPrices.some(lp => lp.symbol === result.s)) {
        const foundSymbol = latestPrices.find(lp => lp.symbol === result.s)
        const updatedSymbol = { ...foundSymbol, currentPrice: result.c }
        const updatedLatestPrices = latestPrices.map(lp => lp.symbol === result.s ? updatedSymbol : lp)
        setLatestPrices(updatedLatestPrices)
      } else {
        setLatestPrices(data => [...data, { symbol: result.s, currentPrice: result.c, time: result.E }])
      }
    }
  }, [isPaused, setLatestPrices, latestPrices])

  return { prices: latestPrices }
}

export default useWsStream