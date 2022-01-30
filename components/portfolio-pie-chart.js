import {map} from 'lodash'
import { Chart } from "react-google-charts";
import allSymbols from '../utils/static/symbols-data'; 

export const data = [
  ["Symbol", "Total Portfolio"],
  ...map(allSymbols, item => [item.symbol, item.totalCoins * item.avgBuyPrice])
];

const options = {
  is3D: true,
  legend: {
    alignment: "center",
  },
  titleTextStyle: {
    fontSize: 28,
  },
};

const PortfolioPieChart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default PortfolioPieChart;