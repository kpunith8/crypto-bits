import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { round } from 'lodash'
import allSymbols from '../utils/static/symbols-data';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Custom styles
// const useStyles = makeStyles((theme) => ({
//   cardItem: {
//     padding: theme.spacing(2),
//   },
// }))

const findSymbol = (symbol) => allSymbols.find(item => item.symbol === symbol)

const PriceItem = ({ label, total, percentage }) => (
  <div style={{ display: 'flex', fontSize: 13 }}>
    <span>{`${label}:`}</span>
    <span style={{ color: total > 0 ? 'green' : 'red', marginLeft: 10 }}>
      <div style={{ display: 'flex' }}>
        <span style={{ marginTop: -2 }}>{total > 0 ? <ArrowDropUpIcon sx={{ color: 'green' }} /> : <ArrowDropDownIcon sx={{ color: 'red' }} />}</span>
        <span>{`${total > 0 ? `+${total}` : `${total}`} (${percentage}%)`}</span>
      </div>
    </span>
  </div>
)

const PriceCard = ({ data, inrPrice }) => {
  const symbol = useMemo(() => data.symbol.slice(0, -4), [data.symbol])
  const symbolData = useMemo(() => {
    const foundSymbol = findSymbol(symbol)
    return {
      name: foundSymbol.name,
      icon: foundSymbol.icon,
    }
  }, [symbol])

  const totalPortfolio = useMemo(() => {
    const symbolFound = findSymbol(symbol)
    const totalInvestment = symbolFound.totalCoins * symbolFound.avgBuyPrice
    const currentPrice = round(inrPrice * data.currentPrice * symbolFound.totalCoins, 2)
    const total = round(currentPrice - totalInvestment, 2)
    const percentage = round(total / totalInvestment * 100, 2)

    return {
      total,
      percentage
    }
  }, [symbol, data.currentPrice, inrPrice])

  const last24HrChange = useMemo(() => {
    const symbolFound = findSymbol(symbol)
    const { currentPrice, closePrice } = data
    const lastPrice = round(inrPrice * currentPrice * symbolFound.totalCoins, 2)
    const total = round(lastPrice - closePrice * inrPrice * symbolFound.totalCoins, 2)
    const percentage = round((currentPrice - closePrice) / currentPrice * 100, 2)

    return {
      total,
      percentage
    }
  }, [data, symbol, inrPrice])

  console.log({ last24HrChange })

  return (
    <Card raised>
      <CardHeader
        avatar={symbolData.icon && <Image src={symbolData.icon} height="35" width="35" alt={symbol} />}
        title={symbol}
        subheader={symbolData.name}
      />
      <CardContent style={{ paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              {`$${round(data.currentPrice, 2)}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`₹${round(inrPrice * data.currentPrice, 2)}`}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'space-between', flexDirection: 'column' }}>
            <PriceItem label="24Hr" total={last24HrChange.total} percentage={last24HrChange.percentage} />
            <PriceItem label="Total" total={totalPortfolio.total} percentage={totalPortfolio.percentage} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceCard