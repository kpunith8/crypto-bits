import { useEffect, useMemo, useState } from "react";
import { round, head } from "lodash"
import useExchangeRate from "../utils/use-exchange-rate"
import useWsStream from "../utils/use-ws-stream"
import dynamic from "next/dynamic";

const TradeChart = dynamic(() => import("./trade-chart"), {
  loading: () => <p>Loading ...</p>,
  ssr: false
});

const TradeInfo = () => {
  const convertedINR = useExchangeRate("INR")
  const { prices, sandData } = useWsStream()
  const [sandSymData, setSandSymData] = useState([])
  const [name, setName] = useState("SANDUSDT")

  // On initial load, get last 30mins data
  // startTime=${Date.now() - (5000 * 60)}&endTime=${Date.now()} - To fetch every 5 minutes
  // TODO: Temporary hack until the data is stored in the DB
  // TODO: Error handling
  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/klines?symbol=SANDUSDT&interval=1m&limit=30&startTime=${Date.now() - (1000 * 60 * 30)}&endTime=${Date.now()}`).then(res => res.json()).then(data => {
      setSandSymData(prevData => [...prevData, ...data])
    }).catch(err => {
      console.error(err)
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      // Fetch data every minute
      fetch(`https://api.binance.com/api/v3/klines?symbol=SANDUSDT&interval=1m&limit=1`).then(res => res.json()).then(data => {
        setSandSymData(prevData => [...prevData, head(data)])
      }).catch(err => {
        console.error(err)
      })
    }, 1000 * 62)

    return () => clearInterval(timer)
  }, [])

  const convertedSandData = useMemo(() => sandSymData.map(data => ({ time: data[0], value: data[4] }))
    , [sandSymData])

  return (
    <>
      {prices.length > 0 && (
        prices.map(price => (
          <div key={price.symbol}>
            <span>{price.symbol}: {round(price.currentPrice, 4)} USD, Price: {round(convertedINR * price.currentPrice, 4)} INR</span>
          </div>
        ))
      )}
      <TradeChart data={convertedSandData} name={name} />
    </>
  )
}

export default TradeInfo