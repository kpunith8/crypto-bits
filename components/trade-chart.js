import { useCallback, useEffect, useRef } from 'react';
import { round } from 'lodash'
import { createChart } from 'lightweight-charts';
import data from './data'

const toolTipTemplate = ({ dateStr, price }) => `<div style="font-size: 24px; margin: 4px 0px; color: #20262E">AEROSPACE</div><div style="font-size: 22px; margin: 4px 0px; color: #20262E">${price}</div><div>${dateStr}</div>`

const width = '800px'
const height = '500px'

const TradeChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const tooltipRef = useRef(document.createElement('div'))

  const setLastBarText = useCallback(() => {
    const { year, month, day } = data[data.length - 1].time
    const dateStr = `${year}-${month}-${day}`;
    tooltipRef.current.innerHTML = toolTipTemplate({ dateStr, price: data[data.length - 1].value })
  }, [data, tooltipRef])

  useEffect(() => {
    // Add the detached element to the parent
    chartContainerRef.current.appendChild(tooltipRef.current);

    // Styling tooltip
    tooltipRef.current.style.width = '96px'
    tooltipRef.current.style.height = '70px'
    tooltipRef.current.style.position = 'absolute'
    tooltipRef.current.style.padding = '8px'
    tooltipRef.current.style.fontSize = '12px'
    tooltipRef.current.style.color = '#20262E'
    tooltipRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.23)'
    tooltipRef.current.style.textAlign = 'left'
    tooltipRef.current.style.zIndex = 1000
    tooltipRef.current.style.pointerEvents = 'none'

    return () => {
      tooltipRef.current.remove();
    }
  }, [chartContainerRef, tooltipRef]);

  useEffect(() => {
    chartRef.current = createChart(chartContainerRef.current, {
      width: 800,
      height: 500,
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        horzLines: {
          color: '#eee',
          visible: false,
        },
        vertLines: {
          color: '#ffffff',
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: 'rgba(32, 38, 46, 0.1)',
          labelVisible: false,
        }
      },
    })

    var series = chartRef.current.addAreaSeries({
      topColor: 'rgba(19, 68, 193, 0.4)',
      bottomColor: 'rgba(0, 120, 255, 0.0)',
      lineColor: 'rgba(19, 40, 153, 1.0)',
      lineWidth: 3
    })

    series.setData(data);
    setLastBarText()

    chartRef.current.subscribeCrosshairMove(param => {
      if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        setLastBarText();
      } else {
        console.log(param)
        const { year, month, day } = param.time
        const dateStr = `${year}-${month}-${day}`;
        const price = param.seriesPrices.get(series);
        tooltipRef.current.innerHTML = toolTipTemplate({ dateStr, price: round((price * 100) / 100, 2) })
      }
    })
  }, [setLastBarText, chartContainerRef])

  return <div className="line-series-chart" ref={chartContainerRef} />
}


export default TradeChart