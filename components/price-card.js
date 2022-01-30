import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { round } from 'lodash'
import allSymbols from '../utils/static/symbols-data';
import Divider from '@mui/material/Divider';
import Image from 'next/image';

const PriceCard = ({ data, inrPrice }) => {
  const symbol = useMemo(() => data.symbol.slice(0, -4), [data.symbol])
  const symbolIcon = useMemo(() => allSymbols.find(item => item.symbol === symbol).icon, [symbol])
  const symbolName = useMemo(() => allSymbols.find(item => item.symbol === symbol).name, [symbol])
  const totalPortfolio = useMemo(() => {
    const symbolFound = allSymbols.find(item => item.symbol === symbol)
    const totalInvestment = symbolFound.totalCoins * symbolFound.avgBuyPrice
    const currentPrice = round(inrPrice * data.currentPrice * symbolFound.totalCoins, 4)

    return round(currentPrice - totalInvestment, 2)
  }, [symbol, data.currentPrice, inrPrice])

  const percentageMove = useMemo(() => round((data.currentPrice - data.closePrice) / data.currentPrice * 100, 2), [data.currentPrice, data.closePrice])

  return (
    <Card sx={{ minWidth: 200, maxWidth: 250 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {symbolIcon && <Image src={symbolIcon} />}
          </Avatar>
        }
        title={symbol}
        subheader={symbolName}
      />
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              {`$${round(data.currentPrice, 4)}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`₹${round(inrPrice * data.currentPrice, 4)}`}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'space-between', flexDirection: 'column' }}>
            <div style={{ fontSize: 13, marginBottom: 5 }}>
              <span>24H:</span>
              <span style={{ color: percentageMove > 0 ? 'green' : 'red', marginLeft: 10 }}>
                {`${percentageMove > 0 ? `+${percentageMove}` : `${percentageMove}`}%`}
              </span>
            </div>
            <div style={{ fontSize: 13 }}>
              <span>Total:</span>
              <span style={{ color: totalPortfolio > 0 ? 'green' : 'red', marginLeft: 10 }}>
                {`${totalPortfolio > 0 ? `+${totalPortfolio}` : `${totalPortfolio}`}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceCard