import { useEffect, useMemo, useState } from "react";
import { round, head } from "lodash"
import dynamic from "next/dynamic";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import useExchangeRate from "../utils/use-exchange-rate"
import useWsStream from "../utils/use-ws-stream"
import PriceCard from "./price-card";

const TradeChart = dynamic(() => import("./trade-chart"), {
  loading: () => <p>Loading ...</p>,
  ssr: false
});

const TradeInfo = () => {
  const convertedINR = useExchangeRate("INR")
  const { prices, sandData } = useWsStream()
  const [sandSymData, setSandSymData] = useState([])
  const [name, setName] = useState("SANDUSDT")

  // On initial load, get last 24hours data by 5 mins chunks data
  // startTime=${Date.now() - (5000 * 60)}&endTime=${Date.now()} - To fetch every 5 minutes
  // TODO: Temporary hack until the data is stored in the DB
  // TODO: Error handling
  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/klines?symbol=SANDUSDT&interval=5m&limit=300&startTime=${Date.now() - (1000 * 60 * 60 * 24)}&endTime=${Date.now()}`).then(res => res.json()).then(data => {
      setSandSymData(prevData => [...prevData, ...data])
    }).catch(err => {
      console.error(err)
    })
  }, [])
  // TODO: Extarct to a component - try using AbortController
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     // Fetch data every minute
  //     fetch(`https://api.binance.com/api/v3/klines?symbol=SANDUSDT&interval=1m&limit=1`).then(res => res.json()).then(data => {
  //       setSandSymData(prevData => [...prevData, head(data)])
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }, 1000 * 62)

  //   return () => clearInterval(timer)
  // }, [])

  const convertedSandData = useMemo(() => sandSymData.map(data => ({ time: data[0], value: data[4] }))
    , [sandSymData])

  return (
    <>
    <Box sx={{flexGrow: 1}}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {prices.length > 0 && (
          prices.map(price => (
            <Grid key={price.symbol} item xs={12} md={6} lg={4}>
              < PriceCard data={price} inrPrice={convertedINR} />
            </Grid>
          )))
        }
      </Grid>
    </Box>
      {/* <TradeChart data={convertedSandData} name={name} /> */}
    </>
  )
}

export default TradeInfo