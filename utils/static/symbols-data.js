
import { sortBy, reverse } from 'lodash'
import axsIcon from '../../public/axs-logo.svg'
import adaIcon from '../../public/ada-logo.svg'
import sandIcon from '../../public/sand-logo.svg'
import nearIcon from '../../public/near-logo.svg'
import maticIcon from '../../public/matic-logo.svg'
import solIcon from '../../public/sol-logo.svg'
import cakeIcon from '../../public/cake-logo.svg'
import lunaIcon from '../../public/luna-logo.svg'
import mcIcon from '../../public/mc-logo.svg'
import bswIcon from '../../public/bsw-logo.svg'

const allSymbols = [
  { symbol: "AXS", totalCoins: 11.6, avgBuyPrice: 8472, icon: axsIcon, name: "Axie Infinity" },
  { symbol: "ADA", totalCoins: 251, avgBuyPrice: 75.3, icon: adaIcon, name: "Cardano" },
  { symbol: "SAND", totalCoins: 99, avgBuyPrice: 480.4, icon: sandIcon, name: "The Sandbox" },
  { symbol: "NEAR", totalCoins: 23.8, avgBuyPrice: 852, icon: nearIcon, name: "Near Protocol" },
  { symbol: "MC", totalCoins: 43, avgBuyPrice: 536, icon: mcIcon, name: "Merit Circle" },
  { symbol: "MATIC", totalCoins: 51, avgBuyPrice: 191.1, icon: maticIcon, name: "Matic Network" },
  { symbol: "SOL", totalCoins: 4.09, avgBuyPrice: 10729, icon: solIcon, name: "Solana" },
  { symbol: "BSW", totalCoins: 300, avgBuyPrice: 68.7, icon: bswIcon, name: "Biswap" },
  { symbol: "CAKE", totalCoins: 23.9, avgBuyPrice: 867, icon: cakeIcon, name: "Cake Swap" },
  { symbol: "LUNA", totalCoins: 1.98, avgBuyPrice: 4840, icon: lunaIcon, name: "Terra" },
]

export default reverse(sortBy(allSymbols, ({totalCoins, avgBuyPrice}) => totalCoins * avgBuyPrice))