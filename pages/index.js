import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import dynamic from "next/dynamic";
import TradeInfo from '../components/trade-info'

const TradeChart = dynamic(() => import("../components/trade-chart"), {
  loading: () => <p>Loading ...</p>,
  ssr: false
});

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
        <TradeChart />
      </main>
    </Container>
  )
}
