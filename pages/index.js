import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import TradeInfo from '../components/trade-info'

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Crypto-Bits</title>
        <meta name="description" content="Crypto Portfolio Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h4" component="h1" gutterBottom>
          Trade Info
        </Typography>
        <TradeInfo />
      </main>
    </Container>
  )
}
