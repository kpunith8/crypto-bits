import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import PortfolioPieChart from '../components/portfolio-pie-chart';
import TradeInfo from '../components/trade-info'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Crypto-Bits</title>
        <meta name="description" content="Crypto Portfolio Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{padding: '20px 0'}}>
        <PortfolioPieChart />
        <TradeInfo />
      </main>
    </Container>
  )
}
