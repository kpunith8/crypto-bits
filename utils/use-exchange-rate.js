import { useEffect, useState } from 'react'

// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP

// Restricted base is only supported for premium users
// http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}&symbols=${currency}
const useExchangeRate = (currency) => {
  const [exchangeRate, setExchangeRate] = useState('')
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/pair/USD/${currency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
      .catch(err => {
        console.error(err)
      })

  }, [currency])

  return exchangeRate
}

export default useExchangeRate