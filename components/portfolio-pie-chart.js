import { map } from 'lodash'
import { Chart } from "react-google-charts";
import allSymbols from '../utils/static/symbols-data';

export const data = [
  ["Symbol", "Total Value"],
  ...map(allSymbols, ({ symbol, totalCoins, avgBuyPrice }) => [symbol, totalCoins * avgBuyPrice])
];

// For pieChart
// const options = {
//   is3D: true,
//   legend: {
//     alignment: "center",
//   },
//   titleTextStyle: {
//     fontSize: 28,
//   },
// };

const options = {
  chart: {
    title: "Cyrpto Portfolio",
    subtitle: "Symbol, Coins, Total",
  },
}

const PortfolioPieChart = () => {
  return (
    <Chart
      chartType="Bar"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default PortfolioPieChart;