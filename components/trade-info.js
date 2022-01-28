import { round } from "lodash"
import useExchangeRate from "../utils/use-exchange-rate"
import useWsStream from "../utils/use-ws-stream"

const TradeInfo = () => {
  const convertedINR = useExchangeRate("INR")
  const { data } = useWsStream()

  return (
    <>
      {data.length > 0 && (
        data.map(d => (
          <div key={d.symbol}>
            <span>{d.symbol}: {round(d.currentPrice, 4)} USD, Price: {round(convertedINR * d.currentPrice, 4)} INR</span>
          </div>
        ))
      )}
    </>
  )
}

export default TradeInfo