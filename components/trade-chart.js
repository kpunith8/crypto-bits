import { useCallback, useEffect, useRef } from 'react';
import { round } from 'lodash'
import { createChart, isBusinessDay } from 'lightweight-charts';

const toolTipTemplate = ({ dateStr, price, name }) => `<div style="font-size: 24px; margin: 4px 0px; color: #20262E">${name}</div>
<div style="font-size: 22px; margin: 4px 0px; color: #20262E">${price}</div>
<div>${dateStr}</div>`

const width = '600px'
const height = '400px'

const TradeChart = ({ data, name }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const tooltipRef = useRef(document.createElement('div'))
  const seriesRef = useRef(null)

  const setLastBarText = useCallback(() => {
    if (data.length) {
      const utcTime = data[data.length - 1].time
      const year = new Date(utcTime).getUTCFullYear()
      const month = new Date(utcTime).getUTCMonth() + 1
      const day = new Date(utcTime).getUTCDate()
      const min = new Date(utcTime).getUTCMinutes()
      const hour = new Date(utcTime).getUTCHours()
      const dateStr = `${year}-${month}-${day} ${hour}:${min}`;
      tooltipRef.current.innerHTML = toolTipTemplate({ dateStr, price: data[data.length - 1]?.value, name })
    }
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
      width: 600,
      height: 400,
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        rightOffset: 12,
        barSpacing: 3,
        // fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          return `${new Date(time).getUTCHours()}:${new Date(time).getUTCMinutes()}`;
        },
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

    seriesRef.current = chartRef.current.addAreaSeries({
      topColor: 'rgba(19, 68, 193, 0.4)',
      bottomColor: 'rgba(0, 120, 255, 0.0)',
      lineColor: 'rgba(19, 40, 153, 1.0)',
      lineWidth: 2,
    })
  }, [])

  useEffect(() => {
    seriesRef.current.setData(data);
    setLastBarText()

    chartRef.current.subscribeCrosshairMove(param => {
      if (param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
        setLastBarText();
      } else {
        const year = new Date(param.time).getUTCFullYear()
        const month = new Date(param.time).getUTCMonth() + 1
        const day = new Date(param.time).getUTCDate()
        const min = new Date(param.time).getUTCMinutes()
        const hour = new Date(param.time).getUTCHours()
        const dateStr = `${year}-${month}-${day} ${hour}:${min}`;
        const price = param.seriesPrices.get(seriesRef.current);
        tooltipRef.current.innerHTML = toolTipTemplate({ dateStr, price: round((price * 100) / 100, 2), name })
      }
    })
  }, [setLastBarText, data])

  return <div className="line-series-chart" ref={chartContainerRef} />
}


export default TradeChart